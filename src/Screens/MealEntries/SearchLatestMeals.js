import React, {useState} from 'react';
import {Platform} from 'react-native';
import {database} from '../../Common/database_realm';
import {SearchBar} from 'react-native-elements';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import {useFocusEffect} from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import PushNotification from 'react-native-push-notification';
import LoadingSpinner from '../../Common/LoadingSpinner';

const SearchLatestMeals = ({navigation, controlBar}, props) => {
  const {t} = React.useContext(LocalizationContext);

  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        mealData(search);
      }
      return () => {
        isMounted = false;
      };
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
    await database.fetchMealWithName(foodName).then(meals => {
      const filteredMeals = meals.filter(data => data.isDeleted === false);
      setRestaurants(filteredMeals);
      setLoading(false);
    });
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
          {controlBar}
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

export default SearchLatestMeals;
