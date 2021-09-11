import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { registerCustomIconType, ThemeProvider } from 'react-native-elements';
import * as RNLocalize from 'react-native-localize';
import * as i18n from './i18n';
import LocalizationContext from './LanguageContext';
import analytics from '@react-native-firebase/analytics';
import { database } from './src/Common/database_realm';
import { enableScreens } from 'react-native-screens';
import { navigationRef } from './src/Navigation/RootNavigation';
import { ProfileProvider } from './src/hooks/useProfile';
import { ScreenReaderProvider, useScreenReader } from './src/hooks/useScreenReaderEnabled';
import { theme } from './src/theme/theme';
import Icon from './src/CustomMealaFont';
import { UserSettingsProvider } from './src/hooks/useUserSettings';
import { EnterMealTypeProvider } from './src/hooks/useEnterMealState';
import { KnowledgeProvider } from './src/hooks/useKnowledge';
import TopStack from './src/Navigation/TopStack';
import PushNotifications from './src/hooks/PushNotifications';

enableScreens();

const App = props => {
  const routeNameRef = React.useRef();
  const [locale, setLocale] = React.useState(i18n.DEFAULT_LANGUAGE);
  const [onboarding, setOnboarding] = useState(undefined);
  const screenReaderEnabled = useScreenReader();
  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale],
  );

  const handleLocalizationChange = useCallback(
    newLocale => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  PushNotifications();

  useEffect(() => {
    registerCustomIconType('meala', Icon);

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
        onboardingState > showOnboardingFirst && onboardingState !== showOnboardingLast
          ? setOnboarding(false)
          : setOnboarding(true),
      );
  }, []);

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
        onReady={() => {
          console.log('nabigator route', navigationRef.current.getCurrentRoute());
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          // Save the current route name for later comparison
          routeNameRef.current = currentRouteName;
        }}>
        <ThemeProvider theme={theme}>
          <ProfileProvider>
            <UserSettingsProvider>
              <ScreenReaderProvider>
                <EnterMealTypeProvider>
                  <KnowledgeProvider>
                    <View style={{ flex: 1 }}>
                      <TopStack onboardin={onboarding} />
                    </View>
                  </KnowledgeProvider>
                </EnterMealTypeProvider>
              </ScreenReaderProvider>
            </UserSettingsProvider>
          </ProfileProvider>
        </ThemeProvider>
      </NavigationContainer>
    </LocalizationContext.Provider>
  );
};

export default App;
