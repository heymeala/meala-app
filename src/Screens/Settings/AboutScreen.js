import React from 'react';
import { Linking, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const AboutScreen = props => {
  const { t, locale } = React.useContext(LocalizationContext);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 18 }}>
          <Text style={{ fontWeight: 'bold', paddingTop: 10 }}>{t('About.title')}</Text>

          <Text>{t('About.p1')}</Text>
          <Text style={{ fontWeight: 'bold', paddingTop: 10 }}>Disclaimer</Text>

          <Text>{t('About.p2')}</Text>
          <TouchableOpacity
            style={{ paddingTop: 20 }}
            title="Click me"
            onPress={() => {
              Linking.openURL('https://www.meal-advisor.com/policies/meala_agb.pdf');
            }}>
            <Text style={{ textDecorationLine: 'underline' }}>AGB</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingTop: 20 }}
            title="Click me"
            onPress={() => {
              Linking.openURL('https://www.meal-advisor.com/policies/meala_datenschutz.pdf');
            }}>
            <Text style={{ textDecorationLine: 'underline' }}>Datenschutz</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
