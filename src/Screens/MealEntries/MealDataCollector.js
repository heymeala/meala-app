import React, { useEffect, useState } from 'react';
import MealDetailsComponent from './DetailSite/MealDetailPage';
import { database } from '../../Common/database_realm';
import { useProfile } from '../../hooks/useProfile';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { useUserSettings } from '../../hooks/useUserSettings';
import { loadSugarData } from './loadHealthData';
import { useRoute } from '@react-navigation/core';
import { getAPIInfo } from '../Settings/fitbit/fitbitApi';

const MealDataCollector = props => {
  const [insulin, setInsulin] = useState([]);
  const [carbs, setCarbs] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [treatments, setTreatments] = useState(null);
  const [selectedFood, setSelectedFood] = useState(undefined);
  const [insulinCoordinates, setInsulinCoordinates] = useState(null);
  const [carbCoordinates, setCarbCoordinates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stepsPerDay, setStepsPerDay] = useState(null);
  const [sleepAnalysis, setSleepAnalysis] = useState(null);
  const route = useRoute();
  const { userMealId } = route.params;
  const [restaurantName, setRestaurantName] = useState(null);
  const { settings } = useProfile();
  const { userSettings } = useUserSettings();
  const [heartRate, setHeartRate] = useState();
  const [fitbitSteps, setFitbitSteps] = useState();
  useEffect(() => {
    let isMounted = true;
    if (userMealId) {
      if (isMounted) {
        loadData();
      }
    }
    return () => {
      isMounted = false;
    };
  }, [userMealId, settings, userSettings]);

  function loadData() {
    database.fetchMealbyId(userMealId).then(mealData => {
      database.getRestaurantName(mealData.restaurantId).then(name => setRestaurantName(name));
      setSelectedFood(prevState => mealData);
      loadSugarData(
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
          setFitbitSteps
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
          carbs={carbs}
          insulin={insulin}
          coordinates={coordinates}
          restaurantName={restaurantName}
          loading={loading}
          stepsPerDay={stepsPerDay}
          reloadData={loadData}
          sleepAnalysis={sleepAnalysis}
          heartRate={heartRate}
          fitbitSteps={fitbitSteps}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MealDataCollector;
