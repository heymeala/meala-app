import React from 'react';
import SettingsOverview from '../Screens/Settings/SettingsOverview';
import NightscoutSettingsScreen from '../Screens/Settings/NightscoutSettingsScreen';
import HealthKitScreen from '../Screens/Settings/HealthKit/HealthKitScreen';
import AboutScreen from '../Screens/Settings/AboutScreen';
import GlyxSearchScreen from '../Screens/Settings/GlyxSearchScreen';
import StatisticScreen from '../Screens/Settings/StatisticScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import LocalizationContext from '../../LanguageContext';
import ProfilSettings from '../Screens/Settings/ProfilSettings';
import { Platform } from 'react-native';
import FatSecretSettings from '../Screens/Settings/FatSecretSettings';
import Dexcom from '../Screens/Settings/Dexcom';
import Libre from '../Screens/Settings/Libre';
import TidePool from '../Screens/Settings/TidePool';
import MealQuiz from '../Screens/Quiz/MealQuiz';
import Knowledge from '../Screens/Settings/Knowledge/Knowledge';
import KnowledgeDetails from '../Screens/Settings/Knowledge/KnowledgeDetails';
import Licenses from "../Screens/Settings/License/Licenses";

function SettingsStack() {
  const { t } = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="SettingsOverview" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="SettingsOverview"
        component={SettingsOverview}
        options={{
          headerLargeTitle: true,
          headerTranslucent: Platform.OS !== 'android' && Platform.Version >= 13,
          headerStyle:
            Platform.OS !== 'android' && Platform.Version >= 13
              ? {
                backgroundColor: 'transparent',
                blurEffect: 'light',
              }
              : { backgroundColor: 'white' },

          title: t('Settings.SettingsTitle'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',

            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
        }}
      />
      <Stack.Screen
        name="DataSourceScreen"
        component={NightscoutSettingsScreen}
        initialParams={{}}
        options={{
          title: t('Settings.datasource'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="HealthKitScreen"
        component={HealthKitScreen}
        initialParams={{}}
        options={{
          title: t('Settings.healthKit.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="FatSecretSettings"
        component={FatSecretSettings}
        options={{
          title: 'FatSecret',
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Tidepool"
        component={TidePool}
        initialParams={{}}
        options={{
          title: 'Tidepool',
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Dexcom"
        component={Dexcom}
        initialParams={{}}
        options={{
          title: t('Settings.Dexcom.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Libre"
        component={Libre}
        options={{
          title: t('Settings.Libre.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={MealQuiz}
        options={{
          title: t('MealQuiz.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Knowledge"
        component={Knowledge}
        options={{
          title: t('Knowledge.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="KnowledgeDetails"
        initialParams={{ itemId: null }}
        component={KnowledgeDetails}
        options={{
          title: t('Knowledge.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />

      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        initialParams={{}}
        options={{
          title: t('About.DrawNavigatorTitle'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="SearchGiScreen"
        component={GlyxSearchScreen}
        initialParams={{}}
        options={{
          title: t('GI.NavigationBarTitle'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="StatisticScreen"
        component={StatisticScreen}
        initialParams={{}}
        options={{
          title: t('Settings.statistics'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="ProfilSettings"
        component={ProfilSettings}
        initialParams={{}}
        options={{
          title: 'Profil',
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Licenses"
        component={Licenses}
        options={{
          title: 'Licenses',
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default SettingsStack;
