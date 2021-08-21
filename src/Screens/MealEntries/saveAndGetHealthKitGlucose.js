import moment from 'moment';
import Healthkit, { HKQuantityTypeIdentifier, HKUnit } from '@kingstinct/react-native-healthkit/src/index';
import { SEA_MINUTES } from './DetailSite/Chart/chartConstant';
import { hoursAgo } from '../../utils/hoursAgo';
import { database } from '../../Common/database_realm';
import uuid from 'react-native-uuid';
import { filterSVGDataByTime } from './convertCGMData';

export async function saveAndGetHealthKitGlucose(foodDate, settings, id) {
  const tillDate = moment(foodDate).add(3, 'hours').toISOString();
  const fromDate = moment(foodDate).subtract(SEA_MINUTES, 'minutes').toISOString();

  const options = {
    ascending: true,
    from: moment(foodDate).subtract(SEA_MINUTES, 'minutes'),
    to: moment(foodDate).add(3, 'hours'),
  };
  const cgmData = await database.getCgmData(id);
  console.log(cgmData);
  const mealTime = foodDate.getTime();
  const threeHoursAgo = hoursAgo(3);
  if (cgmData === 'null' || cgmData === null) {
    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.bloodGlucose, {
      ...options,
      unit: settings.unit === 1 ? HKUnit.GlucoseMgPerDl : HKUnit.GlucoseMmolPerL,
    }).then(results => {
      const glucoseCoordinates = results.map(coordinates => {
        return {
          x: new Date(moment(coordinates.startDate).toISOString()),
          y: coordinates.quantity,
        };
      });

      if (threeHoursAgo > mealTime) {
        const data = results.map(data => {
          return {
            _id: uuid.v4(),
            device: 'healthkit-Import',
            date: data.startDate.getTime(),
            dateString: data.startDate.toISOString(),
            sgv: data.quantity,
            type: 'sgv',
          };
        });
        database.editMealCgmData(data, id);
      }
      return glucoseCoordinates;
    });
  } else {
    const parsedCgm = JSON.parse(cgmData);
    return filterSVGDataByTime(parsedCgm, fromDate, tillDate, settings);
  }
}
