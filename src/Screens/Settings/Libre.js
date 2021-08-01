import React, { useState } from 'react';
import { View } from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import { Button, makeStyles, Text } from 'react-native-elements';
import { spacing } from '../../theme/styles';
import { useUserSettings } from '../../hooks/useUserSettings';
import analytics from '@react-native-firebase/analytics';
import { DEFAULT, LIBRETWOAPP } from './glucoseSourceConstants';

const Libre = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [chartImage, setChartImage] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userSettings, saveUserSettings } = useUserSettings();
  const styles = useStyles();

  const saveState = () => {
    analytics().logEvent('glucose_source', {
      name: LIBRETWOAPP,
    });
    saveUserSettings({ ...userSettings, glucoseSource: LIBRETWOAPP });
  };

  const removeGlucoseSource = () => {
    analytics().logEvent('glucose_source', {
      name: DEFAULT,
    });
    saveUserSettings({ ...userSettings, glucoseSource: DEFAULT });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text h2>{t('Settings.Libre.text')}</Text>
        {userSettings.glucoseSource === LIBRETWOAPP ? null : (
          <Text h3>{t('Settings.Libre.description')}</Text>
        )}
        <Text h4 h4Style={styles.h4}>
          {t('Settings.Libre.instructions')}
        </Text>
        {userSettings.glucoseSource === LIBRETWOAPP ? (
          <Text h2>{t('Settings.Libre.instructionsActive')}</Text>
        ) : null}
      </View>
      <View style={styles.button}>
        <Button
          title={userSettings.glucoseSource === LIBRETWOAPP ? t('General.deactivate') : t('General.activate')}
          onPress={() => (userSettings.glucoseSource === LIBRETWOAPP ? removeGlucoseSource() : saveState())}
        />
      </View>
    </View>
  );
};

export default Libre;

const useStyles = makeStyles(theme => ({
  container: {
    flexGrow: 1,
    padding: spacing.L,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  padding: {
    padding: 12,
    fontSize: 18,
    alignItems: 'center',
  },
  button: { marginVertical: theme.spacing.L },
  h4: { marginVertical: theme.spacing.L, color: theme.colors.error },
}));
