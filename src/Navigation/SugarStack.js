import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LocalizationContext from '../../LanguageContext';

import SearchRestaurants from '../Screens/MealEntries/SearchRestaurants';
import MealListView from '../Screens/MealEntries/MealListView';
import MealDataCollector from '../Screens/MealEntries/MealDataCollector';

import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, View} from 'react-native';
import EnterMeal from '../Screens/EnterMeal/EnterMeal';

function SugarStack({navigation}) {
  const {t} = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="meala">
      <Stack.Screen
        name="meala"
        component={SearchRestaurants}
        options={{
          title: 'meala',
          headerLargeTitle: true,
          headerTranslucent: false,
          /*     Platform.OS !== 'android' && Platform.Version >= 13,
                   headerStyle:
                       Platform.OS !== 'android' && Platform.Version >= 13
                         ? {
                             backgroundColor: 'transparent',
                             blurEffect: 'light',
                           }
                         : {backgroundColor: 'white'},*/

          headerLargeTitleStyle: {
            fontSize: 40,
            fontFamily: 'Pacifico-Regular',
          },
          headerTitleStyle: {
            fontSize: Platform.OS !== 'android' ? 27 : 40,
            fontFamily: 'Pacifico-Regular',
          },
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <Icon
                accessible={true}
                accessibilityLabel={t('Accessibility.Home.newEntry')}
                onPress={() =>
                  navigation.navigate('EnterMealStack', {
                    screen: 'EnterMeal',
                    params: {scan: false},
                  })
                }
                name="ios-add-circle-outline"
                style={{paddingRight: 15}}
                type="ionicon"
                size={25}
              />
              <Icon
                accessible={true}
                accessibilityLabel={t('Accessibility.Home.foodScan')}
                onPress={() =>
                  navigation.navigate('EnterMealStack', {
                    screen: 'EnterMeal',
                    params: {scan: true},
                  })
                }
                name="ios-barcode"
                style={{paddingRight: 10}}
                type="ionicon"
                size={25}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MealListView"
        component={MealListView}
        initialParams={{}}
        options={{
          title: t('Entries.Meals'),
          headerTintColor: '#154d80',
          headerTitleStyle: {color: 'black'},
          headerStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
      <Stack.Screen
        name="MealDataCollector"
        component={MealDataCollector}
        initialParams={{}}
        options={{
          title: t('Entries.MealDetails'),
          headerTintColor: '#154d80',
          headerTitleStyle: {color: 'black'},
          headerStyle: {
            backgroundColor: '#ffffff',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SugarStack;
