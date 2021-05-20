import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import openLink from '../InAppBrowser';
import { Image, makeStyles } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const PoweredByFatSecret = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <Text>{t('Entries.informationFrom')} </Text>
      <TouchableOpacity
        accessibilityLabel={t('Accessibility.EnterMeal.fatsecret')}
        style={{ padding: 12 }}
        onPress={() => openLink('https://fatsecret.com')}>
        <Image
          style={{ width: 120, height: 17 }}
          source={{
            uri: 'https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PoweredByFatSecret;
const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: 8,
    paddingTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));
