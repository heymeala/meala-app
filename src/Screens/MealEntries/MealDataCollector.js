import React, {useEffect, useState} from 'react';
import MealDetailsComponent from './DetailSite/MealDetailPage';
import {database} from '../../Common/database_realm';
import {useProfile} from '../../hooks/useProfile';
import LoadingSpinner from '../../Common/LoadingSpinner';
import {useUserSettings} from '../../hooks/useUserSettings';
import {loadSugarData} from './loadHealthData';

const MealDataCollector = props => {
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
  const [stepsPerDay, setStepsPerDay] = useState(null);

  const [restaurantName, setRestaurantName] = useState(null);
  const {settings} = useProfile();
  const {route} = props;
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
      loadSugarData(
        mealData,
        userSettings,
        settings,
        setCoordinates,
        setDateStrings,
        setDates,
        setSugar,
        setCarbs,
        setInsulin,
        setTreatments,
        setCarbCoordinates,
        setInsulinCoordinates,
        setLoading,
        setStepsPerDay,
      ); //TODO:: CLEANUP
    });
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
          stepsPerDay={stepsPerDay}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MealDataCollector;
