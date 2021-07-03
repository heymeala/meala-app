import React from 'react';
import { Platform, View } from 'react-native';
import SugarStack from './SugarStack';
import { Icon, useTheme } from 'react-native-elements';
import EnterMealStack from './EnterMealStack';
import SettingsStack from './SettingsStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocalizationContext from '../../LanguageContext';
import { COPY_MODE, EDIT_MODE, useEnterMealType } from '../hooks/useEnterMealState';
import QuizStack from './QuizStack';

const AppBottomNavigationStack = () => {
  const Tab = createBottomTabNavigator();
  const { t } = React.useContext(LocalizationContext);
  const { theme } = useTheme();
  const { type } = useEnterMealType();
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.grey4, // inactive icon color
        tabBarVisible: true,
        style: {
          backgroundColor: theme.colors.white, // TabBar background
        },
      }}>
      <Tab.Screen
        name="Home"
        component={SugarStack}
        options={({ navigation }) => {
          return {
            tabBarLabel: navigation.isFocused() ? t('Accessibility.tab.home') : '',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name="bars" size={28} type={'antdesign'} color={color} />
            ),
          };
        }}
      />

      <Tab.Screen
        name="Maps"
        component={SugarStack}
        options={({ navigation }) => {
          return {
            tabBarLabel: navigation.isFocused() ? 'Karte' : '',
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

      <Tab.Screen
        name="EnterMealStack"
        initialParams={{ params: { type: 'default' } }}
        options={({ route }) => {
          return {
            tabBarVisible: type.mode !== EDIT_MODE && type.mode !== COPY_MODE,
            tabBarLabel: '',
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  position: 'absolute',
                  bottom: Platform.OS === 'ios' ? 0 : 10, // space from bottombar
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
          tabBarLabel: navigation.isFocused() ? 'Wissen' : '',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="einstein" type="meala" size={28} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({ route, navigation }) => ({
          tabBarLabel: navigation.isFocused() ? t('Accessibility.tab.settings') : '',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="settings" type="octicon" size={28} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default AppBottomNavigationStack;
