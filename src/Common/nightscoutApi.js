import React from 'react';
import moment from 'moment';
import {database} from './database_realm';
import {calculateCarbs} from './calculateCarbs';
import {updateUserCarbsOnline} from "./updateUserCarbsOnline";

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

Date.prototype.subHours = function (h) {
  this.setHours(this.getHours() - h);
  return this;
};

Date.prototype.subMinutes = function (m) {
  this.setMinutes(this.getMinutes() - m);
  return this;
};
Date.prototype.addMinutes = function (m) {
  this.setMinutes(this.getMinutes() + m);
  return this;
};

let newDate = new Date();
let waitDate = newDate.subHours(3);

export async function nightscoutCall(date, id) {
  const fromDateInput = date;
  const tillDateInput = date;
  const getCGMDate = date;

  //todo: generalize cgm and nutrition data to use all data sources like dexcom, healthkit tidepool, libre etc.
  return database
    .getCgmData(moment(getCGMDate).toISOString(), id)
    .then((cgm) => {
      if (cgm === 'null' || cgm === null) {
        return database
          .getSettings()
          .then((settings) => {
            // newer Nightscout Version use moment and have a different datestring
            if (settings.nightscoutVersion >= 0.12) {
              const tillDate = moment(tillDateInput)
                .add(3, 'hours')
                .toISOString();
              const fromDate = moment(fromDateInput)
                .subtract(35, 'minutes')
                .toISOString();
              const url = `${settings.nightscoutUrl}/api/v1/entries/sgv.json?count=80&find[dateString][$gte]=${fromDate}&find[dateString][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
              console.log(url);
              return url;
            } else {
              const tillDate = moment(tillDateInput).add(3, 'hours').format();
              const fromDate = moment(fromDateInput)
                .subtract(35, 'minutes')
                .format();
              const url = `${settings.nightscoutUrl}/api/v1/entries/sgv.json?count=80&find[dateString][$gte]=${fromDate}&find[dateString][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
              console.log(url);
              return url;
            }
          })
          .then((url) => fetch(url))
          .then((response) => response.json())
          .then((data) => {
            // add data from nightscout  to offline realm database after 3hours
            if (waitDate.getTime() >= date.getTime()) {
              database.editMealCgmData(date, data, id);
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

export function nichtscoutTreatmens(date, userMealId) {
  const saveDate = date;
  const fromDateInput = date;
  const tillDateInput = date;

  return database.getTreatmentsData(date, userMealId).then((treatments) => {
    const tillDate = moment(tillDateInput).add(2, 'hours').toISOString();
    const fromDate = moment(fromDateInput)
      .subtract(35, 'minutes')
      .toISOString();

    if (treatments === null) {
      return database
        .getSettings()
        .then((settings) => {
          const url = `${settings.nightscoutUrl}/api/v1/treatments?find[created_at][$gte]=${fromDate}&find[created_at][$lte]=${tillDate}&token=${settings.nightscoutToken}`;
          console.log(url);
          return url;
        })
        .then((url) => fetch(url))
        .then((response) => response.json())
        .then((treatmentsData) => {
          //  add treatments data from nightscout  to offline realm database after 3hours
          if (waitDate.getTime() >= saveDate.getTime()) {
            const carbSum = calculateCarbs(treatmentsData);
            updateUserCarbsOnline(carbSum,userMealId)
            database.editMealTreatments(
              date,
              treatmentsData,
              carbSum,
              userMealId,
            );
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
