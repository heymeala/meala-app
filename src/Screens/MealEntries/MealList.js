import React, { useState } from 'react';
import { Platform } from 'react-native';
import { database } from '../../Common/realm/database';
import { SearchBar } from 'react-native-elements';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import { useFocusEffect } from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import PushNotification from 'react-native-push-notification';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { mealsWithoutCgmData } from './mealsWithoutCgmData';
import { HEALTHKIT, NIGHTSCOUT } from '../Settings/glucoseSourceConstants';
import { nightscoutCall, nightscoutTreatments } from '../../Common/nightscoutApi';
import { deleteImageFile } from '../../utils/deleteImageFile';
import { saveAndGetHealthKitGlucose } from './saveAndGetHealthKitData';
import { useProfile } from '../../hooks/useProfile';

const MealList = props => {
  const { t } = React.useContext(LocalizationContext);
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useProfile();

  const searchOnFocus = React.useCallback(() => {
    mealData(search);
  }, [search]);

  useFocusEffect(searchOnFocus);

  function deleteMeal(id) {
    //todo: cancel Notification on ios
    Platform.OS !== 'ios' ? PushNotification.cancelLocalNotifications({ mealId: id }) : null;
    database.deleteMealSoft(id);
    deleteImageFile(id);
    mealData(search);
  }

  async function mealData(foodName) {
    const mealsByName = await database.fetchMealWithName(foodName);
    const filteredMeals = mealsByName.filter(data => data.isDeleted === false);
    setMeals(filteredMeals);
    setLoading(false);
    database.getGlucoseSource().then(source => {
      if (source === NIGHTSCOUT) {
        const notLoadedEntries = mealsWithoutCgmData(filteredMeals);
        const slicedMeals = notLoadedEntries.slice(0, 2);

        if (slicedMeals && slicedMeals.length > 0) {
          slicedMeals.map(data => {
            const nsSugarData = async () => {
              await nightscoutCall(data.date, data._id);
              await nightscoutTreatments(data.date, data._id);
              const updatedMeals = await database.fetchMealWithName(foodName);
              const updatedFilteredMeals = updatedMeals.filter(data => data.isDeleted === false);
              setMeals(updatedFilteredMeals);
            };
            nsSugarData();
          });
        }
      } else if (source === HEALTHKIT) {
        const notLoadedEntries = mealsWithoutCgmData(filteredMeals);
        const slicedMeals = notLoadedEntries.slice(0, 2);
        if (slicedMeals && slicedMeals.length > 0) {
          slicedMeals.map(data => {
            const healthkitData = async () => {
              await saveAndGetHealthKitGlucose(data.date, settings, data._id);
              const updatedMeals = await database.fetchMealWithName(foodName);
              const updatedFilteredMeals = updatedMeals.filter(data => data.isDeleted === false);
              setMeals(updatedFilteredMeals);
            };
            healthkitData();
          });
        }
      }
    });
  }

  return loading ? (
    <LoadingSpinner />
  ) : (
    <MealsListSwipeDelete
      mealDataSoftDelete={meals}
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
