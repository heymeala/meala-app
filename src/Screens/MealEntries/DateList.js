import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { database } from '../../Common/realm/database';
import moment from 'moment';
import * as Keychain from 'react-native-keychain';
import { getFoodByDateFromUser } from '../../Common/fatsecret/fatsecretApi';
import FatSecretDateData from './FatSecretDateData';
import { EmptyListDate } from './Common/EmtyListDate';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { useNavigation } from '@react-navigation/core';
import { MealItemsList } from '../../Components/MealItemList';
import DateListHeader from './DateListHeader';

const DateList = props => {
  const navigation = useNavigation();

  const [meals, setMeals] = useState(undefined);
  const today = moment();
  const [fatSecretData, setFatSecretData] = useState();
  const [chosenDateStart, setChosenDateStart] = useState(today);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadMeals(chosenDateStart.startOf('day').toDate(), chosenDateStart.endOf('day').toDate());
    return () => {
      // cleanup code codes here
    };
  }, [chosenDateStart]);

  function loadMeals(startDate, endDate) {
    database.fetchMealsWithDateTime(startDate, endDate).then(meals => {
      setMeals(meals);
      setLoading(false);
    });
  }

  const keyExtractor = (item, index) => item.id;
  const renderItem = ({ item }) => <MealItemsList item={item} navigation={props.navigation} />;

  useEffect(
    function () {
      let isMounted = true;

      Keychain.hasInternetCredentials('https://www.fatsecret.com/oauth/authorize').then(result => {
        if (result !== false) {
          // get Date from DatePicker and Calculate days since epoch
          var myEpoch = Math.trunc(chosenDateStart.valueOf() / 1000.0 / 60 / 60 / 24);
          getFoodByDateFromUser(myEpoch, null).then(data => {
            if (isMounted) {
              if (data.food_entries) {
                if (data.food_entries.food_entry.length >= 0) {
                  const checkedData = data.food_entries.food_entry.map(data => {
                    return { ...data };
                  });
                  setFatSecretData(checkedData);
                } else if (data.food_entries.food_entry) {
                  setFatSecretData([{ ...data.food_entries.food_entry }]);
                }
              } else {
                setFatSecretData();
                console.log('no data');
              }
            }
          });
        }
      });

      loadMeals(chosenDateStart.startOf('day').toDate(), chosenDateStart.endOf('day').toDate());
      return () => {
        isMounted = false;
      };
    },

    [chosenDateStart],
  );

  return loading ? (
    <LoadingSpinner />
  ) : (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      extraData={chosenDateStart}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <DateListHeader
          controlBar={props.controlBar}
          chosenDateStart={chosenDateStart}
          setChosenDateStart={setChosenDateStart}
        />
      }
      ListFooterComponentStyle={{ height: '100%' }}
      ListFooterComponent={fatSecretData && <FatSecretDateData fatSecretData={fatSecretData} />}
      data={meals}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={!fatSecretData && <EmptyListDate navigation={navigation} />}
    />
  );
};

export default DateList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
