import { HEALTHKIT, LIBRETWOAPP, NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatmens } from '../../Common/nightscoutApi';
import { filterCoordinates, mapUnit } from './DetailSite/filterCoordinates';
import moment from 'moment';
import { SEA_MINUTES } from './DetailSite/Chart/chartConstant';
import { Platform } from 'react-native';
import { database } from '../../Common/database_realm';
import Healthkit, { HKQuantityTypeIdentifier, HKUnit } from '@kingstinct/react-native-healthkit';
import { add } from '../../utils/reducer';

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
) {
  const foodDate = new Date(mealData.date);
  const id = mealData.userMealId;

  const tillDate = moment(foodDate).add(3, 'hours').toISOString();
  const fromDate = moment(foodDate).subtract(SEA_MINUTES, 'minutes').toISOString();

  function filterSVGDataByTime(glucoseData) {
    return glucoseData
      .filter(data => {
        const start = new Date(fromDate).getTime();
        const end = new Date(tillDate).getTime();
        return data.date > start && data.date < end;
      })
      .map(data => {
        const glucoseValueDate = new Date(data.date);
        return {
          x: glucoseValueDate,
          y: data.sgv / settings.unit,
        };
      });
  }

  if (userSettings && userSettings.glucoseSource === NIGHTSCOUT) {
    const nsSugarData = await nightscoutCall(foodDate, id);

    const glucoseCoordinates = filterSVGDataByTime(nsSugarData);
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

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.bloodGlucose, {
      ...options,
      unit: settings.unit === 1 ? HKUnit.GlucoseMgPerDl : HKUnit.GlucoseMmolPerL,
    }).then(results => {
      setCoordinates(
        results.map(coordinates => {
          console.log(coordinates.quantity);
          return {
            x: new Date(moment(coordinates.startDate).toISOString()),
            y: coordinates.quantity,
          };
        }),
      );
    });

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.insulinDelivery, options).then(results => {
      const calcInsulin = results.map(result => result.quantity); //
      const treatments = results.map(result => {
        return { insulin: result.quantity };
      });
      setTreatments(treatments);
      const getInsulinCoordinates = results.map(result => {
        return {
          x: new Date(moment(result.startDate).toISOString()),
          y: result.quantity,
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
    if (majorVersionIOS >= 13) {
      // todo: test on ios 10
      Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, options).then(results => {
        const stepQuantity = results.map(data => {
          return data.quantity;
        });
        const totalStep = stepQuantity.reduce(add);
        setStepsPerDay(totalStep);
      });
    }
    setLoading(false);
  } else if (userSettings && userSettings.glucoseSource === LIBRETWOAPP) {
    const localCGMData = await database.getCgmData(id);
    if (localCGMData && localCGMData.length > 0) {
      const jsonLocalCGMData = JSON.parse(localCGMData);
      const glucoseCoordinates = filterSVGDataByTime(jsonLocalCGMData);
      setCoordinates(glucoseCoordinates);
    }
    setLoading(false);
  } else {
    setLoading(false);
  }
}
