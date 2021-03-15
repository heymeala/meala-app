import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalizationContext from '../../LanguageContext';
import {useScreenReader} from '../hooks/useScreenReaderEnabled';

const enSlides = [
  {
    key: 'somethun',
    title: 'Find Meal',
    text:
      "Find meals based on your location and learn from your own and others' experiences. \n\n",
    image: require('../assets/onboarding/1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun-dos',
    title: 'Time in Range',
    text:
      'Check if your BE factors are correct. Your sugar should be back in the target range within three hours after your meal. \n',
    image: require('../assets/onboarding/2.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun1',
    title: 'Fast carbohydrates',
    text:
      'Meala detects carbohydrates that cause blood sugar to rise rapidly and shows you how to deal with them. Bon Appétit',
    image: require('../assets/onboarding/3.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'Regulatory',
    title: 'Disclaimer',
    text:
      'meala must not be used to make medical decisions. It is a research tool only and is provided as is without warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose. The entire risk as to the quality and performance of the program is with you. Schuld the program prove defective, you assume the cost of all necessary servicing, repair or correction.',
    backgroundColor: '#ff605a',
  },
];

const deSlides = [
  {
    key: 'somethun',
    title: 'Mahlzeiten finden',
    text:
      'Finde Mahlzeiten basierend auf Deinem Standort und lerne von Deinen eigenen und den Erfahrungen anderer.\n\n',
    image: require('../assets/onboarding/1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun-dos',
    title: 'Zeit im Zielbereich',
    text:
      'Überprüfe ob Deine BE-Faktoren stimmen. Dein Zucker sollte spätestens drei Stunden nach der Mahlzeit wieder im Zielbereich sein.\n ',
    image: require('../assets/onboarding/2.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'somethun1',
    title: 'Schnelle Kohlenhydrate',
    text:
      'Meala erkennt Kohlenhydrate, die den Blutzucker schnell ansteigen lassen und zeigt Dir wie Du damit umgehen kannst. Bon Appétit',
    image: require('../assets/onboarding/3.png'),
    backgroundColor: '#fff',
  },
  {
    key: 'Regulatory',
    title: 'Disclaimer',
    text:
      'meala darf nicht für medizinische Entscheidungen verwendet werden. ' +
      'Es ist ein reines Recherchetool und wird in der vorliegenden Form ohne ' +
      'jegliche ausdrückliche oder stillschweigende Garantie bereitgestellt,' +
      ' einschließlich, aber nicht beschränkt auf die implizite Gewährleistung der ' +
      'Marktgängigkeit und Eignung für einen bestimmten Zweck. Das gesamte Risiko hinsichtlich' +
      ' der Qualität und Leistung des Programms liegt bei Ihnen. Sollte sich das Programm als' +
      ' fehlerhaft erweisen, übernehmen Sie die Kosten für alle notwendigen Wartungs-, Reparatur- oder Korrekturarbeiten.',
    backgroundColor: '#ff605a',
  },
];

const OnboardingScreen = ({navigation}, props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();

  const _renderItem = ({item}) => {
    return (
      <SafeAreaView>
        <View
          accessible={true}
          style={{
            backgroundColor: item.backgroundColor,
            justifyContent: 'space-around',
            alignItems: 'stretch',
            height: Dimensions.get('window').height,
          }}>
          <View
            style={{
              paddingBottom: 40,
              justifyContent: 'space-around',
              height: Dimensions.get('window').height - 80,
            }}>
            <Text style={styles.title}>{item.title}</Text>
            {item.image ? (
              <Image source={item.image} style={styles.image} />
            ) : null}
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  const _onDone = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };
  const _renderNextButton = () => {
    return (
      <View
        style={styles.buttonCircle}
        accessible={true}
        accessibilityLabel={t('Accessibility.Onboarding.next')}
        accessibilityRole="button">
        <Icon
          name="ios-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };

  const skipButton = () => {
    return (
      <View
        style={styles.skip}
        accessible={true}
        accessibilityLabel={t('Accessibility.Onboarding.skip')}
        accessibilityRole="button">
        <Icon
          name="ios-arrow-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };

  let localeSlides = locale === 'de' ? deSlides : enSlides;

  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={localeSlides}
      nextLabel={t('Onboarding.next')}
      dotClickEnabled={!screenReaderEnabled}
      activeDotStyle={{backgroundColor: 'rgba(255, 217, 0, .9)'}}
      renderNextButton={_renderNextButton}
      showNextButton={!screenReaderEnabled}
      onDone={_onDone}
      doneLabel={t('General.Accept')}
      showSkipButton={screenReaderEnabled}
      skipLabel={t('Accessibility.Onboarding.skip')}
      renderSkipButton={skipButton}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: null,
    height: 320,
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
  },
  skip: {
    width: 300,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
