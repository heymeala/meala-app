import moment from 'moment';
import Healthkit, { HKQuantityTypeIdentifier, HKUnit } from '@kingstinct/react-native-healthkit/src/index';
import { SEA_MINUTES } from './DetailSite/Chart/chartConstant';
import { hoursAgo } from '../../utils/hoursAgo';
import { database } from '../../Common/database_realm';
import uuid from 'react-native-uuid';
import { filterSVGDataByTime } from './convertCGMData';
import { calculateCarbs } from '../../Common/calculateCarbs';
import { updateUserCarbsOnline } from '../../Common/updateUserCarbsOnline';
import { Platform } from 'react-native';

export async function saveAndGetHealthKitGlucose(foodDate, settings, id) {
  const tillDate = moment(foodDate).add(3, 'hours').toISOString();
  const fromDate = moment(foodDate).subtract(SEA_MINUTES, 'minutes').toISOString();

  const options = {
    ascending: true,
    from: moment(foodDate).subtract(SEA_MINUTES, 'minutes'),
    to: moment(foodDate).add(3, 'hours'),
  };

  const cgmData = await database.getCgmData(id);
  const mealTime = foodDate.getTime();
  const sixHoursAgo = hoursAgo(6); // dexcom saves glucose data 3h later

  if (!cgmData) {
    return Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.bloodGlucose, {
      ...options,
      unit: settings.unit === 1 ? HKUnit.GlucoseMgPerDl : HKUnit.GlucoseMmolPerL,
    }).then(results => {
      const glucoseCoordinates = results.map(coordinates => {
        return {
          x: new Date(moment(coordinates.startDate).toISOString()),
          y: coordinates.quantity,
        };
      });

      if (sixHoursAgo > mealTime) {
        const formatGlucoseData = results.map(data => {
          return {
            _id: uuid.v4(),
            device: 'healthkit-Import',
            date: data.startDate.getTime(),
            dateString: data.startDate.toISOString(),
            sgv: data.quantity,
            type: 'sgv',
          };
        });
        database.editMealCgmData(formatGlucoseData, id);
      }
      return glucoseCoordinates;
    });
  } else {
    const parsedCgm = JSON.parse(cgmData);
    return filterSVGDataByTime(parsedCgm, fromDate, tillDate, settings);
  }
}

export async function saveAndGetHealthKitTreatments(foodDate, settings, id) {
  const options = {
    ascending: true,
    from: moment(foodDate).subtract(SEA_MINUTES, 'minutes'),
    to: moment(foodDate).add(3, 'hours'),
  };

  const databaseTreatments = await database.getTreatmentsData(foodDate, id);

  if (!databaseTreatments) {
    const majorVersionIOS = parseInt(Platform.Version, 10);

    const insulinData =
      majorVersionIOS >= 13 &&
      (await Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.insulinDelivery, options));
    const formattedInsulinData =
      insulinData &&
      insulinData
        .filter(result => result.metadata.HKInsulinDeliveryReason === 2)
        .map(result => {
          return {
            _id: result.uuid,
            eventType: 'insulinDelivery - HealthKit Source - ' + result.sourceRevision.source.name,
            insulin: result.quantity,
            carbs: null,
            created_at: result.startDate,
            date: result.startDate.getTime(),
          };
        });

    const carbohydrates = await Healthkit.queryQuantitySamples(
      HKQuantityTypeIdentifier.dietaryCarbohydrates,
      options,
    );
    const formattedCarbohydrates = carbohydrates.map(result => {
      return {
        _id: result.uuid,
        eventType: 'dietaryCarbohydrates - HealthKit Source: ' + result.sourceRevision.source.name,
        insulin: null,
        carbs: result.quantity,
        created_at: result.startDate.toISOString(),
        date: result.startDate.getTime(),
      };
    });

    const mergedLists = [...(formattedCarbohydrates || []), ...(formattedInsulinData || [])];
    const threeHoursAgo = hoursAgo(6);

    if (threeHoursAgo >= foodDate.getTime()) {
      const carbSum = calculateCarbs(mergedLists);
      updateUserCarbsOnline(carbSum, id);
      await database.editMealTreatments(foodDate, mergedLists, carbSum, id);
    }

    return mergedLists;
  } else {
    return JSON.parse(databaseTreatments);
  }
}
