import { HEALTHKIT, LIBRETWOAPP, NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatmens } from '../../Common/nightscoutApi';
import { filterCoordinates, mapUnit } from './DetailSite/filterCoordinates';
import moment from 'moment';
import { SEA_MINUTES } from './DetailSite/Chart/chartConstant';
import { Platform } from 'react-native';
import { database } from '../../Common/database_realm';
import Healthkit, { HKQuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';
import { add } from '../../utils/reducer';
import { HKCategoryTypeIdentifier } from '@kingstinct/react-native-healthkit/src/native-types';
import { saveAndGetHealthKitGlucose } from './saveAndGetHealthKitGlucose';
import { filterSVGDataByTime } from './convertCGMData';

export async function loadSugarData(
  mealData,
  userSettings,
  settings,
  setCoordinates,
  setCarbs,
  setInsulin,
  setTreatments,
  setCarbCoordinates,
  setInsulinCoordinates,
  setLoading,
  setStepsPerDay,
  setSleepAnalysis,
) {
  const foodDate = new Date(mealData.date);
  const id = mealData.userMealId;

  const tillDate = moment(foodDate).add(3, 'hours').toISOString();
  const fromDate = moment(foodDate).subtract(SEA_MINUTES, 'minutes').toISOString();

  if (userSettings && userSettings.glucoseSource === NIGHTSCOUT) {
    const nsSugarData = await nightscoutCall(foodDate, id);

    const glucoseCoordinates = filterSVGDataByTime(nsSugarData, fromDate, tillDate, settings);
    setCoordinates(glucoseCoordinates);

    const nsTreatmentData = await nightscoutTreatmens(foodDate, mealData.userMealId);
    const calcCarbs = nsTreatmentData
      .filter(data => (data.carbs > 0 ? parseFloat(data.carbs) : null))
      .map(data => data.carbs);

    const calcInsulin = nsTreatmentData
      .filter(data => (data.isSMB ? data.isSMB === false : data))
      .map(insulin => insulin.insulin);
    const getCarbCoordinates = filterCoordinates(nsTreatmentData, 'carbs', settings);
    const getInsulinCoordinates = filterCoordinates(nsTreatmentData, 'insulin', settings);
    setCarbs(calcCarbs);
    setInsulin(calcInsulin);
    setTreatments(nsTreatmentData);
    setCarbCoordinates(getCarbCoordinates);
    setInsulinCoordinates(getInsulinCoordinates);
    setLoading(false);
  } else if (userSettings && userSettings.glucoseSource === HEALTHKIT) {
    setTreatments(null);
    setInsulinCoordinates(null);

    const options = {
      ascending: true,
      from: moment(foodDate).subtract(SEA_MINUTES, 'minutes'),
      to: moment(foodDate).add(3, 'hours'),
    };

    saveAndGetHealthKitGlucose(foodDate, settings, id, settings).then(data => {
      console.log('coordinates', data);
      setCoordinates(data);
    });

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.insulinDelivery, options).then(results => {
      const calcInsulin = results.map(result => result.quantity); //
      const treatments = results.map(result => {
        return { insulin: result.quantity };
      });
      setTreatments(treatments);
      const getInsulinCoordinates = results.map(result => {
        const mapInsulinToChart = mapUnit(result.quantity, settings);

        return {
          x: new Date(moment(result.startDate).toISOString()),
          y: mapInsulinToChart,
        };
      });
      setInsulin(calcInsulin);
      setInsulinCoordinates(getInsulinCoordinates);
      console.log('getInsulinCoordinates', getInsulinCoordinates);
    });

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.dietaryCarbohydrates, options).then(results => {
      setCarbs(results.map(data => data.quantity));
      setCarbCoordinates(
        results.map(coordinates => {
          const kitCarbs = mapUnit(coordinates.quantity, settings);
          return {
            x: new Date(moment(coordinates.startDate).toISOString()),
            y: kitCarbs,
          };
        }),
      );
      console.log(results);
    });

    const majorVersionIOS = parseInt(Platform.Version, 10);
    // if (majorVersionIOS >= 13) { //
    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, options).then(results => {
      const stepQuantity = results.map(data => {
        return data.quantity;
      });
      const totalStep = stepQuantity.length > 0 ? stepQuantity.reduce(add) : null;
      setStepsPerDay(totalStep);
    });
    //  }

    Healthkit.queryCategorySamples(HKCategoryTypeIdentifier.sleepAnalysis, {
      ascending: true,
      from: moment(foodDate).subtract(1, 'day'),
      to: moment(foodDate).add(3, 'hours'),
    }).then(result => {
      const hours = result
        .filter(data => data.value === 1)
        .map(data => {
          return moment(data.endDate).diff(moment(data.startDate), 'hours');
        });
      const sum = hours.length > 0 && hours.reduce(add);
      setSleepAnalysis(sum);
    });

    setLoading(false);
  } else if (userSettings && userSettings.glucoseSource === LIBRETWOAPP) {
    const localCGMData = await database.getCgmData(id);
    if (localCGMData && localCGMData.length > 0) {
      const jsonLocalCGMData = JSON.parse(localCGMData);
      const glucoseCoordinates = filterSVGDataByTime(jsonLocalCGMData, fromDate, tillDate, settings);
      setCoordinates(glucoseCoordinates);
    }
    setLoading(false);
  } else {
    setLoading(false);
  }
}
