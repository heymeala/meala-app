import { Dimensions, View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';
import { spacing } from '../../../theme/styles';
import LottieView from 'lottie-react-native';
import SearchRecipes from '../../Recipes/SearchRecipes';
import { useNavigation } from '@react-navigation/core';

export const EmptyListHome = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles(dimensions);
  const navigation = useNavigation();

  if (props.value.length > 0) {
    return (
      <>
        {/*  <NoResultsText text={t('Entries.noSearchResult')} value={props.value} />*/}
        <SearchRecipes search={props.value} />
      </>
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <View style={styles.infoBox}>
          <Text h1 h1Style={styles.infoTextHeadline}>
            {t('Entries.empty.home.title')}
          </Text>
          <Text style={styles.infoText}>{t('Entries.empty.home.description')}</Text>
        </View>

        <LottieView
          style={styles.animation}
          source={require('../../../assets/animations/cooking.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
};

const useStyles = makeStyles((theme, dimensions) => ({
  image: { width: dimensions.width, height: 950 },
  animation: {
    width: dimensions.width,
    alignSelf: 'center',
    marginBottom: 75,
  },

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
  imagePlaceholder: { backgroundColor: theme.colors.white },
  text: { paddingBottom: spacing.M },
}));
