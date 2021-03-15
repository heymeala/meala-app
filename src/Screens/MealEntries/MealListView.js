import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {database} from '../../Common/database_realm';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import {useNavigation, useRoute} from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';

const MealListView = (props) => {
  const [mealDataSoftDelete, setMealDataSoftDelete] = useState([]);
  const {t, locale} = React.useContext(LocalizationContext);

  const navigation = useNavigation();
  const route = useRoute();

  function loadData(value) {
    const mealdata = route.params?.restaurant;
    const mealDataSoftDelete = mealdata.food.filter(
      (data) => data.isDeleted === false,
    );
    setMealDataSoftDelete(mealDataSoftDelete);
  }

  useEffect(() => {
    loadData();
  }, []);

  function deleteMeal(id) {
    database.deleteMealSoft(id);
    navigation.goBack();
  }

  return (
    <>
      {mealDataSoftDelete.length > 0 ? (
        <>
          <MealsListSwipeDelete
            navigation={navigation}
            mealDataSoftDelete={mealDataSoftDelete}
            update={deleteMeal}
            mealData={loadData}
          />

          <Button
            containerStyle={{paddingTop: 20, paddingLeft: 10, paddingRight: 10}}
            titleStyle={{color: '#000000'}}
            buttonStyle={{
              borderRadius: 5,
              marginBottom: 10,
              backgroundColor: '#f9de1c',
            }}
            style={{padding: 5}}
            onPress={() =>
              navigation.navigate('EnterMealStack', {
                screen: 'EnterMeal',
                params: {
                  id: route.params?.restaurant.id,
                },
              })
            }
            title={t('Entries.anotherEntry')}
          />
        </>
      ) : (
        <View>
          <Text>{t('Entries.noData')}</Text>
          <Button
            containerStyle={{paddingTop: 20}}
            titleStyle={{color: 'white'}}
            buttonStyle={{borderRadius: 5, backgroundColor: '#ff605a'}}
            style={{padding: 5}}
            onPress={() =>
              deleteRestaurant(navigation, route.params?.restaurant.id)
            }
            title={t('Entries.deleteRestaurant')}
          />
        </View>
      )}
    </>
  );
};

export default MealListView;
export function deleteRestaurant(navigation, id) {
  database.deleteRestaurantSoft(id);
  navigation.goBack();
}

const styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#fff',

    justifyContent: 'center',
    borderRadius: 0,
    borderWidth: 0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: '#ac000a',
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
