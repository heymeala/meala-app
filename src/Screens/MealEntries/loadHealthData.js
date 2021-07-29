import { HEALTHKIT, LIBRETWOAPP, NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatmens } from '../../Common/nightscoutApi';
import { filterCoordinates, mapUnit } from './DetailSite/filterCoordinates';
import AppleHealthKit from 'react-native-health';
import moment from 'moment';
import { SEA_MINUTES } from './DetailSite/Chart/chartConstant';
import { permissions } from './DetailSite/HealthKitPermissions';
import { Platform } from 'react-native';
import { database } from '../../Common/database_realm';

export async function loadSugarData(
  mealData,
  userSettings,
  settings,
  setCoordinates,
  //setDateStrings,
  //setDates,
  //setSugar,
  setCarbs,
  setInsulin,
  setTreatments,
  setCarbCoordinates,
  setInsulinCoordinates,
  setLoading,
  setStepsPerDay,
) {
  const foodDate = new Date(mealData.date);
  const id = mealData.userMealId;

  if (userSettings && userSettings.glucoseSource === NIGHTSCOUT) {
    const nsSugarData = await nightscoutCall(foodDate, id);
    // const nsSugarSGV = nsSugarData.map(sugar => sugar.sgv);
    //  const nsSugarDates = nsSugarData.map(data => data.date);
    // const foodDataString = nsSugarData.map(data => data.dateString);
    const glucoseCoordinates = nsSugarData.map(data => {
      const glucoseValueDate = new Date(data.date);
      return {
        x: glucoseValueDate,
        y: data.sgv / settings.unit,
      };
    });
    setCoordinates(glucoseCoordinates);
    //setDateStrings(foodDataString);
    // setDates(nsSugarDates);
    // setSugar(nsSugarSGV);

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
    const tillDate = moment(foodDate).add(3, 'hours').toISOString();
    const fromDate = moment(foodDate).subtract(SEA_MINUTES, 'minutes').toISOString();

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */
      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }
      /* Can now read or write to HealthKit */
      //   unit: settings.unit === 1 ? 'mgPerdL' : 'mmolPerL', // optional; default 'mmolPerL'
      let options = {
        startDate: fromDate, // required
        endDate: tillDate, // optional; default now
      };
      AppleHealthKit.getBloodGlucoseSamples(options, (callbackError, results) => {
        /* Samples are now collected from HealthKit */
        if (callbackError) {
          console.log(callbackError);
          return;
        }
        setCoordinates(
          results.map(coordinates => {
            return {
              x: new Date(moment(coordinates.startDate).toISOString()),
              y: coordinates.value / settings.unit,
            };
          }),
        );
      });

      AppleHealthKit.getCarbohydratesSamples(options, (callbackError, results) => {
        /* Samples are now collected from HealthKit */
        if (callbackError) {
          console.log(callbackError);
          return;
        }
        setCarbs(results.map(data => data.value));
        setCarbCoordinates(
          results.map(coordinates => {
            const kitCarbs = mapUnit(coordinates.value, settings);
            return {
              x: new Date(moment(coordinates.startDate).toISOString()),
              y: kitCarbs,
            };
          }),
        );
      });

      const majorVersionIOS = parseInt(Platform.Version, 10);
      if (majorVersionIOS >= 13) {
        console.log('ios >= 13');

        let optionsSteps = {
          date: new Date(foodDate).toISOString(), // optional; default now
          includeManuallyAdded: true, // optional: default true
        };
        AppleHealthKit.getStepCount(optionsSteps, (err, results) => {
          if (err) {
            console.log('err', err);
            return;
          }
          results ? setStepsPerDay(results.value) : setStepsPerDay(null);
        });
      }
    });
    setLoading(false);
  } else if (userSettings && userSettings.glucoseSource === LIBRETWOAPP) {
    const localCGMData = await database.getCgmData(id);
    if (localCGMData.length > 0) {
      const jsonLocalCGMData = JSON.parse(localCGMData);
      const glucoseCoordinates = jsonLocalCGMData.map(data => {
        const glucoseValueDate = new Date(data.date);
        return {
          x: glucoseValueDate,
          y: data.sgv / settings.unit,
        };
      });
      setCoordinates(glucoseCoordinates);
    }
    setLoading(false);
  } else {
    setLoading(false);
  }
}
