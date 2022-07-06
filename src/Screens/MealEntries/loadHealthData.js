import { HEALTHKIT, LIBRETWOAPP, NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatmens } from '../../Common/nightscoutApi';
import { filterCoordinates } from './DetailSite/filterCoordinates';
import moment from 'moment';
import { SEA_MINUTES } from './DetailSite/Chart/chartConstant';
import { database } from '../../Common/database_realm';
import Healthkit, { HKQuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';
import { add } from '../../utils/reducer';
import { HKCategoryTypeIdentifier } from '@kingstinct/react-native-healthkit/src/native-types';
import { saveAndGetHealthKitGlucose, saveAndGetHealthKitTreatments } from './saveAndGetHealthKitData';
import { filterSVGDataByTime } from './convertCGMData';
import { Platform } from 'react-native';
import { useEffect } from 'react';
import { getAPIInfo } from '../Settings/fitbit/fitbitApi';

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
  setHeartRate,
  setFitbitSteps,
) {
  const foodDate = new Date(mealData.date);
  const id = mealData.userMealId;

  const tillDate = moment(foodDate).add(3, 'hours').toISOString();
  const fromDate = moment(foodDate).subtract(SEA_MINUTES, 'minutes').toISOString();

  getAPIInfo(
    `https://api.fitbit.com/1/user/-/activities/heart/date/2022-07-05/1d/1min/time/${moment.utc(fromDate).format('HH:mm')}/${moment.utc(tillDate).format('HH:mm')}.json`,
  ).then(response => {
    setHeartRate(response);
  });
  getAPIInfo(
      `https://api.fitbit.com/1/user/-/activities/steps/date/2022-07-05/1d/1min/time/${moment.utc(fromDate).format('HH:mm')}/${moment.utc(tillDate).format('HH:mm')}.json`,
  ).then(response => {
    setFitbitSteps(response);
  });

  if (Platform.OS === 'ios') {
    const options = {
      ascending: true,
      from: moment(foodDate).subtract(SEA_MINUTES, 'minutes'),
      to: moment(foodDate).add(3, 'hours'),
    };
    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, options).then(results => {
      const stepQuantity = results.map(data => {
        return data.quantity;
      });
      const totalStep = stepQuantity.length > 0 ? stepQuantity.reduce(add) : null;
      setStepsPerDay(totalStep);
    });

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
  }

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

    saveAndGetHealthKitGlucose(foodDate, settings, id, settings).then(data => {
      setCoordinates(data);
    });

    saveAndGetHealthKitTreatments(foodDate, settings, id).then(results => {
      if (results) {
        const calcCarbs = results
          .filter(data => (data.carbs > 0 ? parseFloat(data.carbs) : null))
          .map(data => data.carbs);

        const calcInsulin = results
          .filter(data => (data.isSMB ? data.isSMB === false : data))
          .map(insulin => insulin.insulin);
        const getCarbCoordinates = filterCoordinates(results, 'carbs', settings);
        const getInsulinCoordinates = filterCoordinates(results, 'insulin', settings);

        setCarbs(calcCarbs);
        setInsulin(calcInsulin);
        setTreatments(results);
        setCarbCoordinates(getCarbCoordinates);
        setInsulinCoordinates(getInsulinCoordinates);
      }
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
