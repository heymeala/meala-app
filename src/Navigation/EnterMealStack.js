import React from 'react';
import EnterMeal from '../Screens/EnterMeal/EnterMeal';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LocalizationContext from '../../LanguageContext';
import {Platform} from 'react-native';
import OpenFoodFactsInfos from '../Screens/EnterMeal/EnterMealComponents/Scanner/OpenFoodFactsInfos';

function EnterMealStack() {
  const {t} = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EnterMeal"
        component={EnterMeal}
        options={({navigation, route}) => ({
          title: t('AddMeal.AddMealTitle'),
          headerTitleStyle: {
            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
          headerTitleContainerStyle: {
            left: 0,
          },
          headerLargeTitle: true,
          headerTranslucent: false,
          headerStyle: {backgroundColor: 'white'},
        })}
      />
      <Stack.Screen
        name={'FoodFacts'}
        component={OpenFoodFactsInfos}
        options={({navigation, route}) => ({
          title: 'Open Food Facts',
          headerTitleStyle: {
            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
          headerTitleContainerStyle: {
            left: 0,
          },
          headerLargeTitle: true,
          headerStyle: {backgroundColor: 'white'},
        })}
      />
    </Stack.Navigator>
  );
}

export default EnterMealStack;
