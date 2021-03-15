import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import SaveButton from '../../Common/SaveButton';
import LocalizationContext from '../../../LanguageContext';

const Libre = () => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <Text style={styles.padding}>{t('Settings.Libre.text')}</Text>
      <SaveButton
        title={t('Settings.Libre.button')}
        onPress={() => Linking.openURL(t('Settings.Libre.link'))}
      />
    </View>
  );
};

export default Libre;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  padding: {
    padding: 12,
    fontSize: 18,
    alignItems: 'center',
  },
});
