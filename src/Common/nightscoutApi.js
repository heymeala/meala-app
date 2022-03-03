import React from 'react';
import moment from 'moment';
import { database } from './database_realm';
import { calculateCarbs } from './calculateCarbs';
import { updateUserCarbsOnline } from './updateUserCarbsOnline';
import { SEA_MINUTES } from '../Screens/MealEntries/DetailSite/Chart/chartConstant';
import { hoursAgo } from "../utils/hoursAgo";



export async function nightscoutCall(date, id,getCgmData,getSettings,editMealCgmData,getTreatmentsData,editMealTreatments) {
  //todo: generalize cgm and nutrition data to use all data sources like dexcom, healthkit tidepool, libre etc.
  return getCgmData(id).then(cgm => {
    if (cgm === 'null' || cgm === null) {
      return getSettings()
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
          // add data from nightscout  to offline realm database after 3hours
          //  const threeHoursAgo = new Date().getTime() - 1000 * 60 * 60 * 3;
          const threeHoursAgo = hoursAgo(3)
          if (threeHoursAgo >= date.getTime()) {
            editMealCgmData(data, id);
          }

          return data.reverse();
        });
    } else {
      // use data from realm database (Offline usage)
      const jsonCgm = JSON.parse(cgm);
      return jsonCgm;
    }
  });
}

export function nightscoutTreatmens(date, userMealId,  getSettings,  getTreatmentsData,
                                    editMealTreatments) {
  const saveDate = date;
  const fromDateInput = date;
  const tillDateInput = date;

  return getTreatmentsData(date, userMealId).then(treatments => {
    const tillDate = moment(tillDateInput).add(2, 'hours').toISOString();
    const fromDate = moment(fromDateInput).subtract(SEA_MINUTES, 'minutes').toISOString();

    if (treatments === null) {
      return getSettings()
        .then(settings => {
          const url = `${settings.nightscoutUrl}/api/v1/treatments?find[created_at][$gte]=${fromDate}&find[created_at][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
          console.log(url);
          return url;
        })
        .then(url => fetch(url))
        .then(response => response.json())
        .then(treatmentsData => {
          //  add treatments data from nightscout  to offline realm database after 3hours
          const threeHoursAgo = hoursAgo(3)

          if (threeHoursAgo >= saveDate.getTime()) {
            const carbSum = calculateCarbs(treatmentsData);
            updateUserCarbsOnline(carbSum, userMealId);
            database.editMealTreatments(date, treatmentsData, carbSum, userMealId);
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
