import React, {useState} from 'react';
import {Platform} from 'react-native';
import {database} from '../../Common/database_realm';
import {SearchBar} from 'react-native-elements';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import {useFocusEffect} from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import PushNotification from 'react-native-push-notification';
import LoadingSpinner from '../../Common/LoadingSpinner';
import {WAITING_TIME} from '../../Common/Constants/waitingTime';
import {mealsWithoutCgmData} from './mealsWithoutCgmData';

const MealList = props => {
  const {t} = React.useContext(LocalizationContext);

  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

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
    PushNotification.cancelLocalNotifications({id: id});
    database.deleteMealSoft(id);
    mealData(search);
  }

  async function mealData(foodName) {
    const meals = await database.fetchMealWithName(foodName);
    const filteredMeals = meals.filter(data => data.isDeleted === false);
    setRestaurants(filteredMeals);
    setLoading(false);

    const quew = mealsWithoutCgmData(filteredMeals);
    console.log(quew);
  }

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
          />
        </>
      }
    />
  );
};

export default MealList;
