import React from 'react';
import { View } from 'react-native';
import SugarStack from './SugarStack';
import { Icon, useTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocalizationContext from '../../LanguageContext';
import { COPY_MODE, EDIT_MODE, useEnterMealType } from '../hooks/useEnterMealState';
import SettingsStack from './SettingsStack';
import QuizStack from './QuizStack';
import EnterMealStack from './EnterMealStack';
import Maps from '../Screens/Maps/Maps';
import { useScreenReader } from '../hooks/useScreenReaderEnabled';
import {useAuth} from "../hooks/AuthProvider";

const AppBottomNavigationStack = () => {
  const Tab = createBottomTabNavigator();
  const { t } = React.useContext(LocalizationContext);
  const { theme } = useTheme();
  const { type } = useEnterMealType();
  const screenReaderEnabled = useScreenReader();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.grey2, // inactive icon color
        tabBarVisible: true,
        style: {
          backgroundColor: '#f2f5fb', // TabBar background
        },

      }}>
      <Tab.Screen
        name="meal"
        component={SugarStack}
        options={({ navigation }) => {
          return {
            tabBarLabel: navigation.isFocused() ? t('BottomNavBar.entries') : '',
            tabBarAccessibilityLabel: t('BottomNavBar.entries'),

            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0, // space from bottombar
                }}>
                <Icon name="bars" size={navigation.isFocused() ? 28 : 22} type={'antdesign'} color={color} />
              </View>
            ),
          };
        }}
      />
      {!screenReaderEnabled ? (
        <Tab.Screen
          name="Maps"
          component={Maps}
          options={({ navigation }) => {
            return {
              tabBarLabel: navigation.isFocused() ? t('BottomNavBar.map') : '',
              tabBarAccessibilityLabel: t('BottomNavBar.map'),

              tabBarIcon: ({ focused, color, size }) => (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0, // space from bottombar
                  }}>
                  <Icon name="map" size={navigation.isFocused() ? 28 : 22} color={color} type={'ionicon'} />
                </View>
              ),
            };
          }}
        />
      ) : null}

      <Tab.Screen
        name="EnterMealStack"
        initialParams={{ params: { type: 'default' } }}
        options={({ route, navigation }) => {
          return {
            tabBarVisible: type.mode !== EDIT_MODE && type.mode !== COPY_MODE,
            tabBarLabel: '',
            tabBarAccessibilityLabel: t('BottomNavBar.addMeal'),
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0, // space from bottombar
                  height: 55,
                  width: 55,
                  backgroundColor: theme.colors.white,
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
                <Icon name="pluscircleo" type="antdesign" size={28} color={color} />
              </View>
            ),
          };
        }}
        component={EnterMealStack}
      />

      <Tab.Screen
        name="QuizStack"
        component={QuizStack}
        options={({ route, navigation }) => ({
          tabBarLabel: navigation.isFocused() ? t('BottomNavBar.knowledge') : '',
          tabBarAccessibilityLabel: t('BottomNavBar.knowledge'),
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 0, // space from bottombar
              }}>
              <Icon name="einstein" type="meala" size={navigation.isFocused() ? 28 : 22} color={color} />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({ route, navigation }) => ({
          tabBarLabel: navigation.isFocused() ? t('BottomNavBar.more') : '',
          tabBarAccessibilityLabel: t('Accessibility.tab.settings'),
          tabBarIcon: ({ focused, color, size }) => (
            <View
              style={{
                position: 'absolute',
                bottom: 0, // space from bottombar
              }}>
              <Icon name="setting" type="antdesign" size={navigation.isFocused() ? 28 : 22} color={color} />
            </View>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppBottomNavigationStack;
