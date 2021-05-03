import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import {Button} from 'react-native-elements';
import { spacing } from "../../theme/styles";

const Libre = () => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <Text style={styles.padding}>{t('Settings.Libre.text')}</Text>
      <Button
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
    padding:spacing.M,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  padding: {
    padding: 12,
    fontSize: 18,
    alignItems: 'center',
  },
});
