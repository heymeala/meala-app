import React from 'react';
import SettingsOverview from '../Screens/Settings/SettingsOverview';
import NightscoutSettingsScreen from '../Screens/Settings/NightscoutSettingsScreen';
import HealthKitScreen from '../Screens/Settings/HealthKit/HealthKitScreen';
import AboutScreen from '../Screens/Settings/AboutScreen';
import SearchGiScreen from '../Screens/Settings/SearchGiScreen';
import StatisticScreen from '../Screens/Settings/StatisticScreen';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import LocalizationContext from '../../LanguageContext';
import ProfilSettings from '../Screens/Settings/ProfilSettings';
import {Platform} from 'react-native';
import FatSecretSettings from '../Screens/Settings/FatSecretSettings';
import Dexcom from '../Screens/Settings/Dexcom';
import Libre from '../Screens/Settings/Libre';
import TidePool from '../Screens/Settings/TidePool';

function SettingsStack() {
  const {t} = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SettingsOverview"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        name="SettingsOverview"
        component={SettingsOverview}
        options={{
          headerLargeTitle: true,
          headerTranslucent:
            Platform.OS !== 'android' && Platform.Version >= 13,
          headerStyle:
            Platform.OS !== 'android' && Platform.Version >= 13
              ? {
                  backgroundColor: 'transparent',
                  blurEffect: 'light',
                }
              : {backgroundColor: 'white'},

          title: t('Settings.SettingsTitle'),
          headerTitleStyle: {
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
        }}
      />
      <Stack.Screen
        name="HealthKitScreen"
        component={HealthKitScreen}
        initialParams={{}}
        options={{title: 'HealthKitScreen'}}
      />
      <Stack.Screen
        name="FatSecretSettings"
        component={FatSecretSettings}
        options={{title: 'FatSecret'}}
      />
        <Stack.Screen
            name="Tidepool"
            component={TidePool}
            initialParams={{}}
            options={{
                title: 'Tidepool',
            }}
        />
      <Stack.Screen
        name="Dexcom"
        component={Dexcom}
        initialParams={{}}
        options={{
          title: 'Dexcom',
        }}
      />
      <Stack.Screen
        name="Libre"
        component={Libre}
        options={{
          title: 'Libre',
        }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        initialParams={{}}
        options={{
          title: t('About.DrawNavigatorTitle'),
        }}
      />
      <Stack.Screen
        name="SearchGiScreen"
        component={SearchGiScreen}
        initialParams={{}}
        options={{title: t('GI.NavigationBarTitle')}}
      />
      <Stack.Screen
        name="StatisticScreen"
        component={StatisticScreen}
        initialParams={{}}
        options={{title: t('Settings.statistics')}}
      />
      <Stack.Screen
        name="ProfilSettings"
        component={ProfilSettings}
        initialParams={{}}
        options={{title: 'Profil'}}
      />
    </Stack.Navigator>
  );
}

export default SettingsStack;
