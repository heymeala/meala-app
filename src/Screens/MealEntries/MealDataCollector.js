import React, {useEffect, useState} from 'react';
import {nightscoutCall, nightscoutTreatmens} from '../../Common/nightscoutApi';
import MealDetailsComponent from './DetailSite/MealDetailPage';
import {database} from '../../Common/database_realm';
import {useProfile} from '../../hooks/useProfile';
import AppleHealthKit from 'react-native-health';
import moment from 'moment';
import LoadingSpinner from '../../Common/LoadingSpinner';
import {useUserSettings} from '../../hooks/useUserSettings';
import {HEALTHKIT, NIGHTSCOUT} from '../Settings/glucoseSourceConstants';
import {SEA_MINUTES} from './DetailSite/chartConstant';
import {filterCoordinates, mapUnit} from './DetailSite/filterCoordinates';

const MealDataCollector = ({navigation, route}, props) => {
  const [sugar, setSugar] = useState([]);
  const [dates, setDates] = useState([]);
  const [insulin, setInsulin] = useState([]);
  const [carbs, setCarbs] = useState([]);
  const [dateStrings, setDateStrings] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [treatments, setTreatments] = useState(null);
  const [selectedFood, setSelectedFood] = useState(undefined);
  const [insulinCoordinates, setInsulinCoordinates] = useState(null);
  const [carbCoordinates, setCarbCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [restaurantName, setRestaurantName] = useState(null);
  const {settings} = useProfile();

  const {userSettings} = useUserSettings();
  useEffect(() => {
    let isMounted = true;
    if (route.params?.mealId) {
      if (isMounted) {
        loadData();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [route.params?.mealId, settings, userSettings]);

  function loadData() {
    const mealId = route.params?.mealId ?? undefined;
    database.fetchMealbyId(mealId).then(mealData => {
      database
        .getRestaurantName(mealData.restaurantId)
        .then(name => setRestaurantName(name));
      setSelectedFood(prevState => mealData);
      loadSugarData(mealData); //TODO:: CLEANUP
    });
  }

  async function loadSugarData(mealData) {
    const foodDate = new Date(mealData.date);
    const id = mealData.userMealId;

    if (userSettings && userSettings.glucoseSource === NIGHTSCOUT) {
      const nsSugarData = await nightscoutCall(foodDate, id);
      const nsSugarSGV = nsSugarData.map(sugar => sugar.sgv);
      const nsSugarDates = nsSugarData.map(data => data.date);
      const foodDataString = nsSugarData.map(data => data.dateString);
      const glucoseCoordinates = nsSugarData.map(data => {
        const glucoseValueDate = new Date(data.date);
        return {
          x: glucoseValueDate,
          y: data.sgv / settings.unit,
        };
      });
      setCoordinates(glucoseCoordinates);
      setDateStrings(foodDataString);
      setDates(nsSugarDates);
      setSugar(nsSugarSGV);

      const nsTreatmentData = await nightscoutTreatmens(
        foodDate,
        mealData.userMealId,
      );

      const calcCarbs = nsTreatmentData
        .filter(data => (data.carbs > 0 ? parseFloat(data.carbs) : null))
        .map(data => data.carbs);

      const calcInsulin = nsTreatmentData
        .filter(data => (data.isSMB ? data.isSMB === false : data))
        .map(insulin => insulin.insulin);
      const getCarbCoordinates = filterCoordinates(
        nsTreatmentData,
        'carbs',
        settings,
      );
      const getInsulinCoordinates = filterCoordinates(
        nsTreatmentData,
        'insulin',
        settings,
      );
      setCarbs(calcCarbs);
      setInsulin(calcInsulin);
      setTreatments(nsTreatmentData);
      setCarbCoordinates(getCarbCoordinates);
      setInsulinCoordinates(getInsulinCoordinates);
      setLoading(false);
    } else if (userSettings && userSettings.glucoseSource === HEALTHKIT) {
      setTreatments(null);
      setInsulinCoordinates(null);

      const permissions = {
        permissions: {
          read: [
            AppleHealthKit.Constants.Permissions.BloodGlucose,
            AppleHealthKit.Constants.Permissions.Carbohydrates,
            AppleHealthKit.Constants.Permissions.HeartRate,
          ],
          write: [AppleHealthKit.Constants.Permissions.Steps],
        },
      };
      let fromDate, tillDate;
      console.log(selectedFood);
      tillDate = moment(foodDate).add(3, 'hours').toISOString();
      fromDate = moment(foodDate)
        .subtract(SEA_MINUTES, 'minutes')
        .toISOString();

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
        AppleHealthKit.getBloodGlucoseSamples(
          options,
          (callbackError, results) => {
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
          },
        );

        AppleHealthKit.getCarbohydratesSamples(
          options,
          (callbackError, results) => {
            /* Samples are now collected from HealthKit */
            if (callbackError) {
              console.log(callbackError);
              return;
            }
            setCarbs(results.map(data => data.value));
            setCarbCoordinates(
              results.map(coordinates => {
                const kitCarbs = mapUnit(coordinates.value);
                return {
                  x: new Date(moment(coordinates.startDate).toISOString()),
                  y: kitCarbs,
                };
              }),
            );
          },
        );
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }

  return (
    <>
      {selectedFood ? (
        <MealDetailsComponent
          treatments={treatments}
          carbCoordinates={carbCoordinates}
          selectedFood={selectedFood}
          insulinCoordinates={insulinCoordinates}
          sugar={sugar}
          dates={dates}
          carbs={carbs}
          insulin={insulin}
          dateStrings={dateStrings}
          coordinates={coordinates}
          restaurantName={restaurantName}
          loading={loading}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MealDataCollector;
