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
      nightscoutCall(foodDate, id).then(data => {
        const bloodGlucoseValues = data.map(sugar => sugar.sgv);
        const foodDates = data.map(food => food.date);
        const foodDataString = data.map(food => food.dateString);
        const getCoordinates = data.map(sugar => {
          const fullTime = new Date(sugar.date);
          return {
            x: fullTime,
            y: sugar.sgv / settings.unit,
          };
        });

        setCoordinates(getCoordinates);
        setDateStrings(foodDataString);
        setDates(foodDates);
        setSugar(bloodGlucoseValues);
      });
      nightscoutTreatmens(foodDate, mealData.userMealId).then(treatmentData => {
        const calcCarbs = treatmentData
          .filter(data => (data.carbs > 0 ? parseFloat(data.carbs) : null))
          .map(data => data.carbs);
        const calcInsulin = treatmentData
          .filter(data => (data.isSMB ? data.isSMB === false : data))
          .map(insulin => insulin.insulin);

        const getCarbCoordiantes = treatmentData
          .map(data => {
            const fullTime =
              data.timestamp || data.date || data.created_at
                ? new Date(
                    data.timestamp
                      ? data.timestamp
                      : data.date
                      ? data.date
                      : data.created_at,
                  )
                : null;
            if (data.carbs >= 0 && data.carbs && fullTime) {
              const carbs =
                settings.unit === 1
                  ? data.carbs + 50
                  : data.carbs / (300 / settings.unit) + 50 / settings.unit;
              return {
                x: fullTime,
                y: carbs,
              };
            }
          })
          .filter(coordinate => coordinate);
        const getInsulinCoordinates = treatmentData
          .map(insulin => {
            const fullTime =
              insulin.timestamp || insulin.date || insulin.created_at
                ? new Date(
                    insulin.timestamp
                      ? insulin.timestamp
                      : insulin.date
                      ? insulin.date
                      : insulin.created_at,
                  )
                : null;
            if (insulin.insulin >= 0 && insulin.insulin && fullTime) {
              return {
                x: fullTime,
                y: insulin.insulin + 80 / settings.unit,
              };
            }
          })
          .filter(coordinate => coordinate);

        setCarbs(calcCarbs);
        setInsulin(calcInsulin);
        setTreatments(treatmentData);
        setCarbCoordinates(getCarbCoordiantes);
        setInsulinCoordinates(getInsulinCoordinates);
        setLoading(false);
      });
    } else if (userSettings.glucoseSource === HEALTHKIT) {
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
      fromDate = moment(foodDate).subtract(35, 'minutes').toISOString();

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
                const kitCarbs =
                  settings.unit === 1
                    ? coordinates.value + 50
                    : coordinates.value / (300 / settings.unit) +
                      50 / settings.unit;

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
