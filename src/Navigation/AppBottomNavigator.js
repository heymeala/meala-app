import SugarStack from './SugarStack';
import {Icon} from 'react-native-elements';
import EnterMealStack from './EnterMealStack';
import SettingsStack from './SettingsStack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocalizationContext from '../../LanguageContext';

const AppBottomNavigationStack = () => {
  const Tab = createBottomTabNavigator();
  const {t} = React.useContext(LocalizationContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#1569ae',
        inactiveTintColor: '#81817a', // inactive icon color
        showLabel: false,
        tabBarVisible: false,
        style: {
          backgroundColor: '#fff', // TabBar background
        },
      }}>
      <Tab.Screen
        name="Home"
        component={SugarStack}
        options={{
          tabBarLabel: t('Accessibility.tab.home'),
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="bars" size={28} type={'antdesign'} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="EnterMealStack"
        component={EnterMealStack}
        options={({route}) => ({
          tabBarLabel: t('Accessibility.tab.add'),
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="pluscircleo" type="antdesign" size={28} color={color} />
          ),
          //  tabBarVisible: getHeaderTitle(route)
        })}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({route}) => ({
          tabBarLabel: t('Accessibility.tab.settings'),
          tabBarIcon: ({focused, color, size}) => (
            <Icon name="settings" type="octicon" size={28} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppBottomNavigationStack;
