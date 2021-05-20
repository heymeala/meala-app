import React, { useState } from 'react';
import { Platform } from 'react-native';
import { database } from '../../Common/database_realm';
import { SearchBar } from 'react-native-elements';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import { useFocusEffect } from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import PushNotification from 'react-native-push-notification';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { mealsWithoutCgmData } from './mealsWithoutCgmData';
import { useUserSettings } from '../../hooks/useUserSettings';
import { NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatmens } from '../../Common/nightscoutApi';
import SearchRecipes from '../Recipes/SearchRecipes';

const MealList = props => {
  const { t } = React.useContext(LocalizationContext);

  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blur, setBlur] = useState(false);
  const { userSettings } = useUserSettings();
  useFocusEffect(
    React.useCallback(() => {
      mealData(search);
    }, []),
  );

  const updateSearch = text => {
    setSearch(text);
    mealData(text);
  };

  function deleteMeal(id) {
    PushNotification.cancelLocalNotifications({ id: id });
    database.deleteMealSoft(id);
    mealData(search);
  }

  async function mealData(foodName) {
    const meals = await database.fetchMealWithName(foodName);
    const filteredMeals = meals.filter(data => data.isDeleted === false);
    setRestaurants(filteredMeals);
    setLoading(false);

    if (userSettings.glucoseSource === NIGHTSCOUT) {
      const notLoadedEntries = mealsWithoutCgmData(filteredMeals);
      const slicedMeals = notLoadedEntries.slice(0, 2);
      console.log('notLoadedEntries', notLoadedEntries);
      console.log('slicedMeals', slicedMeals);
      if (slicedMeals && slicedMeals.length > 0) {
        console.log('2', slicedMeals);

        slicedMeals.map(data => {
          const nsSugarData = async () => {
            console.log(data);
            await nightscoutCall(data.date, data.userMealId);
            await nightscoutTreatmens(data.date, data.userMealId);
            const updatedMeals = await database.fetchMealWithName(foodName);
            const updatedFilteredMeals = updatedMeals.filter(data => data.isDeleted === false);
            setRestaurants(updatedFilteredMeals);
          };
          nsSugarData();
        });
      }
    }
  }
  const handleBlur = () => {
    if (search.length > 3) {
      setBlur(true);
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <MealsListSwipeDelete
      mealDataSoftDelete={restaurants}
      update={deleteMeal}
      mealData={mealData}
      value={search}
      searchComponent={
        <>
          {props.controlBar}
          <SearchBar
            platform={Platform.OS}
            placeholder={t('Entries.SearchMeals')}
            onChangeText={updateSearch}
            value={search}
            onBlur={handleBlur}
          />
        </>
      }
    />
  );
};

export default MealList;
