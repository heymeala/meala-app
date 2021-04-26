import React from 'react';
import {View} from 'react-native';
import SugarStack from './SugarStack';
import {Icon} from 'react-native-elements';
import EnterMealStack from './EnterMealStack';
import SettingsStack from './SettingsStack';
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
        options={{
          tabBarLabel: t('Accessibility.tab.add'),
          tabBarIcon: ({color, focused}) => (
            <View
              style={{
                position: 'absolute',
                bottom: 0, // space from bottombar
                height: 60,
                width: 60,
                backgroundColor: focused ? '#1569ae' : 'white',
                borderRadius: 60,
                shadowColor: '#c0c0c0',
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
