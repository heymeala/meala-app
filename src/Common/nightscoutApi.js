import moment from 'moment';
import { database } from './realm/database';
import { calculateCarbs } from './calculateCarbs';
import { updateUserCarbsOnline } from './updateUserCarbsOnline';
import { SEA_MINUTES } from '../Screens/MealEntries/DetailSite/Chart/chartConstant';
import { hoursAgo } from '../utils/hoursAgo';

// ToDo: HD rework
export async function nightscoutCall(date, id) {
  //todo: generalize cgm and nutrition data to use all data sources like dexcom, healthkit tidepool, libre etc.
  return database.getCgmData(id).then(cgm => {
    if (cgm === 'null' || cgm === null) {
      return database
        .getSettings()
        .then(settings => {
          // newer Nightscout Version use moment and have a different datestring
          if (settings.nightscoutVersion >= 0.12) {
            const tillDate = moment(date).add(3, 'hours').toISOString();
            const fromDate = moment(date).subtract(SEA_MINUTES, 'minutes').toISOString();
            const url = `${settings.nightscoutUrl}/api/v1/entries/sgv.json?count=80&find[dateString][$gte]=${fromDate}&find[dateString][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
            console.log(url);
            return url;
          } else {
            const tillDate = moment(date).add(3, 'hours').format();
            const fromDate = moment(date).subtract(SEA_MINUTES, 'minutes').format();
            const url = `${settings.nightscoutUrl}/api/v1/entries/sgv.json?count=80&find[dateString][$gte]=${fromDate}&find[dateString][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
            console.log(url);
            return url;
          }
        })
        .then(url => fetch(url))
        .then(response => response.json())
        .then(data => {
          // add data from nightscout to offline realm database after 3hours
          const threeHoursAgo = hoursAgo(3);
          if (threeHoursAgo >= date.getTime()) {
            database.editMealCgmData(data);
          }

          return data.reverse();
        });
    } else {
      // use data from realm database (Offline usage)
      return cgm;
    }
  });
}

export function nightscoutTreatments(date, mealId) {
  const saveDate = date;
  const fromDateInput = date;
  const tillDateInput = date;

  return database.getTreatmentsData(date, mealId).then(treatments => {
    const tillDate = moment(tillDateInput).add(2, 'hours').toISOString();
    const fromDate = moment(fromDateInput).subtract(SEA_MINUTES, 'minutes').toISOString();

    if (treatments === null) {
      return database
        .getSettings()
        .then(settings => {
          const url = `${settings.nightscoutUrl}/api/v1/treatments?find[created_at][$gte]=${fromDate}&find[created_at][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
          console.log(url);
          return url;
        })
        .then(url => fetch(url))
        .then(response => response.json())
        .then(treatmentsData => {
          //  add treatments data from nightscout  to offline realm database after 3hours
          const threeHoursAgo = hoursAgo(3);

          if (threeHoursAgo >= saveDate.getTime()) {
            const carbSum = calculateCarbs(treatmentsData);
            updateUserCarbsOnline(carbSum, mealId);
            database.editMealTreatments(date, treatmentsData, carbSum, mealId);
          }
          return treatmentsData.reverse();
        });
    } else {
      //  get data from database and return
      const jsonTreatments = JSON.parse(treatments);
      return jsonTreatments;
    }
  });
}
