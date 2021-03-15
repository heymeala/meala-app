import {Dimensions, Linking, Text, TouchableOpacity, View} from 'react-native';
import {Image} from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';
import SaveButton from '../../../Common/SaveButton';
import openLink from '../../../Common/InAppBrowser';

export const EmptyListComponent = ({navigation}) => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <View style={{padding: 5, margin: 'auto', flex: 1, alignItems: 'center'}}>
      <Text style={{paddingBottom: 20}}>{t('General.welcome')}</Text>
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
              placeholderStyle={{backgroundColor: '#fff'}}
              style={{width: Dimensions.get('window').width, height: 950}}
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
              placeholderStyle={{backgroundColor: '#fff'}}
              style={{width: Dimensions.get('window').width, height: 950}}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};
