import React, {useEffect, useState} from 'react';
import {nightscoutTreatmens, nightscoutCall} from '../../Common/nightscoutApi';
import MealDetailsComponent from './MealDetailPage';
import {database} from '../../Common/database_realm';
import {ActivityIndicator, View} from 'react-native';
import {useProfile} from '../../hooks/useProfile';

const MealDataCollector = ({navigation, route}, props) => {
  const [sugar, setSugar] = useState([]);
  const [dates, setDates] = useState([]);
  const [insulin, setInsulin] = useState([]);
  const [carbs, setCarbs] = useState([]);
  const [dateStrings, setDateStrings] = useState([]);
  const [coordiantes, setCoordiantes] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [selectedFood, setSelectedFood] = useState(undefined);
  const [insulinCoordinates, setInsulinCoordinates] = useState([]);
  const [carbCoordinates, setCarbCoordinates] = useState([]);
  const [checkSettings, setCheckSettings] = useState('');
  const [loading, setLoading] = useState(true);

  const [restaurantName, setRestaurantName] = useState(null);
  const {settings} = useProfile();

  useEffect(() => {
    if (route.params?.mealId) {
      loadData();
    }
  }, [route.params?.mealId, settings]);

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
    const getSettings = await database.getSettings();
    const getGlucoseSource = await database.getGlucoseSource();

    if (getSettings && getGlucoseSource === '2') {
      setCheckSettings('Nightscout');

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

        setCoordiantes(getCoordinates);
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
    } else if (getGlucoseSource === '1') {
      setCheckSettings('Healthkit');
    } else {
      setCheckSettings('Error');
    }
  }

  return (
    <>
      {selectedFood ? (
        <View>
          <MealDetailsComponent
            treatments={treatments}
            carbCoordinates={carbCoordinates}
            checkSettings={checkSettings}
            selectedFood={selectedFood}
            insulinCoordinates={insulinCoordinates}
            sugar={sugar}
            dates={dates}
            carbs={carbs}
            insulin={insulin}
            dateStrings={dateStrings}
            coordiantes={coordiantes}
            restaurantName={restaurantName}
            loading={loading}
          />
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};

export default MealDataCollector;
