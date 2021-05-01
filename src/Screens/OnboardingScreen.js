import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import LocalizationContext from '../../LanguageContext';
import {useScreenReader} from '../hooks/useScreenReaderEnabled';
import RenderItem from './Onboarding/RenderItem';
import NextButton from './Onboarding/NextButton';
import SkipButton from './Onboarding/SkipButton';
import {deSlides, enSlides} from './Onboarding/SlidesData';

const OnboardingScreen = ({navigation}, props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();

  const _onDone = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  let localeSlides = locale === 'de' ? deSlides : enSlides;

  return (
    <AppIntroSlider
      renderItem={info => <RenderItem info={info} item={info.item} />}
      data={localeSlides}
      nextLabel={t('Onboarding.next')}
      dotClickEnabled={!screenReaderEnabled}
      activeDotStyle={{backgroundColor: 'rgba(255, 217, 0, .9)'}}
      renderNextButton={() => <NextButton />}
      showNextButton={!screenReaderEnabled}
      onDone={_onDone}
      doneLabel={t('General.Accept')}
      showSkipButton={screenReaderEnabled}
      skipLabel={t('Accessibility.Onboarding.skip')}
      renderSkipButton={() => <SkipButton />}
    />
  );
};

export default OnboardingScreen;
