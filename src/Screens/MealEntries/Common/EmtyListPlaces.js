import {Dimensions, Linking, View} from 'react-native';
import {FAB, makeStyles, Text} from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';
import {spacing} from '../../../theme/styles';
import LottieView from 'lottie-react-native';
import NoResultsText from './NoResultsText';

export const EmptyListPlaces = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles(dimensions);
  if (props.value > 0) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.infoBox}>
          <Text h1 h1Style={styles.infoTextHeadline}>
            {t('Entries.empty.places.title')}
          </Text>
          <Text style={styles.infoText}>
            {t('Entries.empty.places.description')}
          </Text>
        </View>

        <LottieView
          style={styles.animation}
          source={require('../../../assets/animations/restaurant.json')}
          autoPlay
          loop
        />

        <FAB
          title={'Quiz'}
          placement={'left'}
          onPress={() =>
            Linking.openURL('https://quiz.heymeala.com?sh=meala_app&lng=de')
          }
        />
      </View>
    );
  } else {
    return (
      <NoResultsText text={t('Entries.noSearchResultPlaces')} value={props.value} />
    );
  }
};

const useStyles = makeStyles((theme, dimensions) => ({
  image: {width: dimensions.width, height: 950},
  animation: {width: dimensions.width, alignSelf: 'center'},

  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
  },
  infoBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginTop: 12,
  },
  infoText: {
    color: theme.colors.white,
    marginHorizontal: 16,
    marginVertical: 12,
    fontSize: 18,
    lineHeight: 24,
  },
  infoTextHeadline: {
    color: theme.colors.white,
    marginHorizontal: 16,
    marginTop: 8,
  },
  container: {
    padding: spacing.XS,
    margin: 'auto',
    flex: 1,
    alignItems: 'center',
  },
  imagePlaceholder: {backgroundColor: theme.colors.white},
  text: {paddingBottom: spacing.M},
}));
