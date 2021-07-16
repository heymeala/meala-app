import React from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import { makeStyles, SocialIcon, Text } from 'react-native-elements';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';
import Feedback from '../../Common/Feedback';

const SettingsFooter = () => {
  const screenReaderEnabled = useScreenReader();
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={{ padding: 20 }}>
      <Feedback />
      <View style={styles.mail}>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:mail@heymeala.com')}>
          <Text>{t('Settings.feedback')}</Text>
        </TouchableOpacity>
      </View>
      {!screenReaderEnabled && (
        <>
          <Text h2 h2Style={styles.h2}>
            {t('Settings.socialMedia')}
          </Text>

          <View style={styles.container}>
            <SocialIcon
              light
              onPress={() =>
                Linking.openURL('instagram://user?username=heymeala').catch(() => {
                  Linking.openURL('https://www.instagram.com/heymeala');
                })
              }
              type="instagram"
            />
            <SocialIcon
              light
              onPress={() => Linking.openURL('https://www.facebook.com/heymeala')}
              type="facebook"
            />
            <SocialIcon
              light
              onPress={() =>
                Linking.openURL('twitter://user?screen_name=heymeala').catch(() => {
                  Linking.openURL('https://www.twitter.com/heymeala');
                })
              }
              type="twitter"
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SettingsFooter;
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 20,
  },
  h2: { marginVertical: theme.spacing.M },
  mail: { marginVertical: theme.spacing.M },
}));
