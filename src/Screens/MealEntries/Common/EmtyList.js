import {Dimensions, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Image, makeStyles} from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';
import SaveButton from '../../../Common/SaveButton';
import {spacing} from '../../../theme/styles';

export const EmptyListComponent = ({navigation}) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles(dimensions);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('General.welcome')}</Text>
      <TouchableOpacity
        accessible={true}
        accessibilityLabel={t('Accessibility.Home.nodata')}
        accessibilityRole="button"
        onPress={() => navigation.navigate('EnterMealStack')}>
        {locale === 'en' ? (
          <>
            <SaveButton
              title={t('Entries.carbQuiz')}
              onPress={() =>
                Linking.openURL('https://quiz.heymeala.com?sh=meala_app&lng=de')
              }
            />
            <Image
              source={require('../../../assets/empty_en.png')}
              placeholderStyle={styles.imagePlaceholder}
              style={styles.image}
            />
          </>
        ) : (
          <>
            <SaveButton
              title={t('Entries.carbQuiz')}
              onPress={() =>
                Linking.openURL('https://quiz.heymeala.com?sh=meala_app&lng=en')
              }
            />
            <Image
              source={require('../../../assets/empty_de.png')}
              placeholderStyle={styles.imagePlaceholder}
              style={styles.image}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme, dimensions) => ({
  image: {width: dimensions.width, height: 950},
  container: {
    padding: spacing.XS,
    margin: 'auto',
    flex: 1,
    alignItems: 'center',
  },
  imagePlaceholder: {backgroundColor: theme.colors.white},
  text: {paddingBottom: spacing.M},
}));
