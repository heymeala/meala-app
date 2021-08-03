import React, { useEffect, useState } from 'react';
import MealDetailsComponent from './DetailSite/MealDetailPage';
import { database } from '../../Common/database_realm';
import { useProfile } from '../../hooks/useProfile';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { useUserSettings } from '../../hooks/useUserSettings';
import { loadSugarData } from './loadHealthData';
import { useRoute } from '@react-navigation/core';
import { locale } from "moment";
import LocalizationContext from "../../../LanguageContext";

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
  const route = useRoute();
  const { userMealId } = route.params;
  const [restaurantName, setRestaurantName] = useState(null);
  const { settings } = useProfile();
  const { userSettings } = useUserSettings();

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
       // setDateStrings,
        //setDates,
       // setSugar,
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
          //   sugar={sugar}
          //   dates={dates}
          carbs={carbs}
          insulin={insulin}
         // dateStrings={dateStrings}
          coordinates={coordinates}
          restaurantName={restaurantName}
          loading={loading}
          stepsPerDay={stepsPerDay}
          reloadData={loadData}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MealDataCollector;
