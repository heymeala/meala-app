import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FAB, useTheme} from 'react-native-elements';
import {database} from '../../Common/database_realm';
import MealsListSwipeDelete from './Common/MealsListSwipeDelete';
import {useNavigation, useRoute} from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import PushNotification from 'react-native-push-notification';

const MealListView = props => {
  const [mealDataSoftDelete, setMealDataSoftDelete] = useState([]);
  const {t, locale} = React.useContext(LocalizationContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const {theme} = useTheme();

  function loadData(value) {
    const mealdata = route.params?.restaurant;
    const mealDataSoftDeleteData = mealdata.food.filter(
      data => data.isDeleted === false,
    );
    setMealDataSoftDelete(mealDataSoftDeleteData);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function deleteMeal(id) {
    PushNotification.cancelLocalNotifications({id: id});
    database.deleteMealSoft(id);
    navigation.goBack();
  }

  if (loading) {
    return (
      <SafeAreaView>
        <View style={{flex: 1}}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
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
              onPress={() =>
                deleteRestaurant(navigation, route.params?.restaurant.id)
              }
              title={t('Entries.deleteRestaurant')}
            />
          </View>
        )}
      </>
    );
  }
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
  noDataContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
