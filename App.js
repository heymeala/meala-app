import React, {useCallback, useEffect, useState} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {ActivityIndicator, StatusBar, View, useColorScheme} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';
import * as i18n from './i18n';
import LocalizationContext from './LanguageContext';
import AppBottomNavigationStack from './src/Navigation/AppBottomNavigator';
import analytics from '@react-native-firebase/analytics';
import OnboardingScreen from './src/Screens/OnboardingScreen';
import {database} from './src/Common/database_realm';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import {enableScreens} from 'react-native-screens';
import {navigationRef} from './src/Navigation/RootNavigation';
import {ProfileProvider} from './src/hooks/useProfile';
import {
  ScreenReaderProvider,
  useScreenReader,
} from './src/hooks/useScreenReaderEnabled';

enableScreens();

const App = props => {
  const routeNameRef = React.useRef();
  const [locale, setLocale] = React.useState(i18n.DEFAULT_LANGUAGE);
  const [onboarding, setOnboarding] = useState(undefined);
  const screenReaderEnabled = useScreenReader();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );
  const colorScheme = useColorScheme();
  const theme = {
    colors: {
      primary: '#264F9F',
      secondary: '#FFCD00',
      white: '#f7f7f7',
      black: '#1a1a1a',
      background: '#fff',
    },
    FAB: {
      titleStyle: {},
    },
    Button: {
      titleStyle: {
        color: 'secondary',
      },
    },
  };

  const handleLocalizationChange = useCallback(
    newLocale => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  useEffect(() => {
    handleLocalizationChange();

    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);
  const showOnboardingFirst = screenReaderEnabled ? 1 : 2;
  const showOnboardingLast = screenReaderEnabled ? 1 : 8;

  useEffect(() => {
    database
      .saveOnbording()
      .then(onboardingState =>
        onboardingState > showOnboardingFirst &&
        onboardingState !== showOnboardingLast
          ? setOnboarding(false)
          : setOnboarding(true),
      );
  }, []);

  const Stack = createNativeStackNavigator();
  if (onboarding === undefined) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <LocalizationContext.Provider value={localizationContext}>
      <NavigationContainer
        // theme={colorScheme === 'dark' ? DarkTheme : theme}
        ref={navigationRef}
        onReady={() =>
          (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
        }
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName;
        }}>
        <ThemeProvider theme={theme} useDark={colorScheme === 'dark'}>
          <ProfileProvider>
            <ScreenReaderProvider>
              <View style={{flex: 1}}>
                <StatusBar barStyle={'dark-content'} />
                <Stack.Navigator
                  screenOptions={{
                    headerShown: false,
                  }}>
                  {onboarding ? (
                    <Stack.Screen
                      name="Onboarding"
                      component={OnboardingScreen}
                    />
                  ) : null}
                  <Stack.Screen
                    name="Home"
                    component={AppBottomNavigationStack}
                  />
                </Stack.Navigator>
              </View>
            </ScreenReaderProvider>
          </ProfileProvider>
        </ThemeProvider>
      </NavigationContainer>
    </LocalizationContext.Provider>
  );
};

export default App;
