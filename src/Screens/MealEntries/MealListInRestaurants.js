import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { FAB, useTheme } from 'react-native-elements';
import { database } from '../../Common/database_realm';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import PushNotification from 'react-native-push-notification';
import LoadingSpinner from '../../Common/LoadingSpinner';

const MealListInRestaurants = props => {
  const [mealDataSoftDelete, setMealDataSoftDelete] = useState([]);
  const route = useRoute();
  const { restaurant_id } = route.params;

  const { t, locale } = React.useContext(LocalizationContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { theme } = useTheme();

  async function loadData(value) {
    const meals = await database.getRestaurantById(restaurant_id);
    const filteredMeals = meals.food.filter(data => data.isDeleted === false);
    setMealDataSoftDelete(filteredMeals);
    setLoading(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, []),
  );

  function deleteMeal(id) {
    PushNotification.cancelLocalNotifications({ id: id });
    database.deleteMealSoft(id);
    navigation.goBack();
  }

  if (loading) {
    return <LoadingSpinner />;
  } else {
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

            <FAB
              placement={'right'}
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
          <View style={styles.noDataContainer}>
            <Text>{t('Entries.noData')}</Text>
            <FAB
              color={theme.colors.error}
              onPress={() => deleteRestaurant(navigation, restaurant_id)}
              title={t('Entries.deleteRestaurant')}
            />
          </View>
        )}
      </>
    );
  }
};

export default MealListInRestaurants;

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
  noDataContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
