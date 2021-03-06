import React from 'react';
import EnterMeal from '../Screens/EnterMeal/EnterMeal';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import LocalizationContext from '../../LanguageContext';
import OpenFoodFactsInfos from '../Screens/EnterMeal/BarCodeScanner/Scanner/OpenFoodFactsInfos';

function EnterMealStack() {
  const { t } = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnterMeal"
        initialParams={{ mealid: null, type: null }}
        component={EnterMeal}
        options={({ navigation, route }) => ({
          title: t('AddMeal.AddMealTitle'),
          headerTitleStyle: {
            textAlign: 'left',
            fontFamily: 'SecularOne-Regular',
            flexGrow: 1,
            fontSize: 30,
          },
          headerTitleContainerStyle: {
            left: 0,
          },
          headerLargeTitle: true,
          headerTranslucent: false,
          headerStyle: { backgroundColor: 'white' },
        })}
      />
      <Stack.Screen
        name={'FoodFacts'}
        component={OpenFoodFactsInfos}
        options={({ navigation, route }) => ({
          title: 'Open Food Facts',
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',

            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
          headerTitleContainerStyle: {
            left: 0,
          },
          headerLargeTitle: true,
          headerStyle: { backgroundColor: 'white' },
        })}
      />
    </Stack.Navigator>
  );
}

export default EnterMealStack;
