import React from 'react';
import {Platform, View} from 'react-native';
import SugarStack from './SugarStack';
import {Icon, useTheme} from 'react-native-elements';
import EnterMealStack from './EnterMealStack';
import SettingsStack from './SettingsStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocalizationContext from '../../LanguageContext';

const AppBottomNavigationStack = () => {
  const Tab = createBottomTabNavigator();
  const {t} = React.useContext(LocalizationContext);
  const {theme} = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.grey2, // inactive icon color
        showLabel: false,
        tabBarVisible: false,
        style: {
          backgroundColor: theme.colors.white, // TabBar background
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
        options={{
          tabBarLabel: t('Accessibility.tab.add'),
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'absolute',
                bottom: Platform.OS === 'ios' ? 0 : 10, // space from bottombar
                height: 55,
                width: 55,
                backgroundColor: focused
                  ? theme.colors.primary
                  : theme.colors.white,
                borderRadius: 55,
                shadowColor: theme.colors.grey2,
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
                elevation: 6,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="pluscircleo"
                type="antdesign"
                size={28}
                color={focused ? 'white' : 'grey'}
              />
            </View>
          ),
        }}
        component={EnterMealStack}
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
