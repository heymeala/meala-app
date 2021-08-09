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
import { NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatmens } from '../../Common/nightscoutApi';

const MealList = props => {
  const { t } = React.useContext(LocalizationContext);
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      mealData(search);
    }, [search]),
  );

  function deleteMeal(id) {
    //todo: cancel Notification on ios
    Platform.OS !== 'ios' ? PushNotification.cancelLocalNotifications({ userMealId: id }) : null; //
    database.deleteMealSoft(id);
    mealData(search);
  }

  async function mealData(foodName) {
    const meals = await database.fetchMealWithName(foodName);
    const filteredMeals = meals.filter(data => data.isDeleted === false);
    setRestaurants(filteredMeals);
    setLoading(false);
    database.getGlucoseSource().then(data => {
      if (data === NIGHTSCOUT) {
        const notLoadedEntries = mealsWithoutCgmData(filteredMeals);
        const slicedMeals = notLoadedEntries.slice(0, 2);
        // console.log('notLoadedEntries', notLoadedEntries);
        //  console.log('slicedMeals', slicedMeals);
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
    });
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <MealsListSwipeDelete
      mealDataSoftDelete={restaurants}
      deleteMeal={deleteMeal}
      mealData={mealData}
      value={search}
      searchComponent={
        <>
          {props.controlBar}
          <SearchBar
            platform={Platform.OS}
            placeholder={t('Entries.SearchMeals')}
            onChangeText={text => setSearch(text)}
            value={search}
          />
        </>
      }
    />
  );
};

export default MealList;
