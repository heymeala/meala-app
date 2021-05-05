import React from 'react';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LocalizationContext from '../../LanguageContext';

import MealSearchController from '../Screens/MealEntries/MealSearchController';
import MealListInRestaurants from '../Screens/MealEntries/MealListInRestaurants';
import MealDataCollector from '../Screens/MealEntries/MealDataCollector';

import Icon from 'react-native-vector-icons/Ionicons';
import {Platform, View} from 'react-native';
import EnterMeal from '../Screens/EnterMeal/EnterMeal';
import {useTheme} from 'react-native-elements';

function SugarStack({navigation}) {
  const {t} = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();
  const {theme} = useTheme();
  return (
    <Stack.Navigator initialRouteName="meala">
      <Stack.Screen
        name="meala"
        component={MealSearchController}
        options={{
          title: 'meala',
          headerLargeTitle: true,
          headerTranslucent: false,
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
        component={MealListInRestaurants}
        initialParams={{}}
        options={{
          title: t('Entries.Meals'),
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.black,
          },
          headerStyle: {
            backgroundColor: theme.colors.white,
          },
        }}
      />
      <Stack.Screen
        name="MealDataCollector"
        component={MealDataCollector}
        options={{
          headerHideShadow: true,
          //headerTranslucent: true,

          title: 'Details',
          headerTintColor: theme.colors.primary,
          headerTitleStyle: {
            color: theme.colors.black,
            headerTitleStyle: {
              fontFamily: 'SecularOne-Regular',
            },
          },
          headerStyle: {
            backgroundColor: theme.colors.white,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SugarStack;
