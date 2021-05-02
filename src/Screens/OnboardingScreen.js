import React, {useEffect, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import LocalizationContext from '../../LanguageContext';
import {useScreenReader} from '../hooks/useScreenReaderEnabled';
import RenderItem from './Onboarding/RenderItem';
import NextButton from './Onboarding/NextButton';
import SkipButton from './Onboarding/SkipButton';
import {deSlides, enSlides} from './Onboarding/SlidesData';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const OnboardingScreen = ({navigation}, props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();
  const [index, setIndex] = useState();
  const _onDone = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  function getPermission() {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(({alert, badge, sound}) => {
        if (!alert || !badge || !sound) {
          setTimeout(() => {
            PushNotificationIOS.requestPermissions().then(r =>
              console.log('r', r),
            );
          }, 1200);
        }
      });
    }
  }

  useEffect(() => {
    if (index === 2) {
      getPermission();
    }
  }, [index]);

  let localeSlides = locale === 'de' ? deSlides : enSlides;
  return (
    <AppIntroSlider
      renderItem={info => (
        <RenderItem info={info} item={info.item} index={index} />
      )}
      data={localeSlides}
      nextLabel={t('Onboarding.next')}
      onSlideChange={(a, b) => setIndex(a)}
      dotClickEnabled={!screenReaderEnabled}
      activeDotStyle={{backgroundColor: 'rgba(255, 217, 0, .9)'}}
      renderNextButton={() => <NextButton />}
      showNextButton={!screenReaderEnabled}
      onDone={_onDone}
      doneLabel={t('General.Accept')}
      showSkipButton={screenReaderEnabled}
      skipLabel={t('Accessibility.Onboarding.skip')}
      contentContainerStyle={{}}
      renderSkipButton={() => <SkipButton />}
    />
  );
};

export default OnboardingScreen;
