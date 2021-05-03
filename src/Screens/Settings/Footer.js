import React from 'react';
import {Linking, Text, TouchableOpacity, View} from 'react-native';

import {makeStyles, SocialIcon} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const SettingsFooter = () => {
  const screenReaderEnabled = useScreenReader();
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={{padding: 20}}>
      <TouchableOpacity
        onPress={() => Linking.openURL('mailto:mail@heymeala.com')}>
        <Text>{t('Settings.feedback')}</Text>
      </TouchableOpacity>
      {!screenReaderEnabled && (
        <View style={styles.container}>
          <SocialIcon
            light
            onPress={() =>
              Linking.openURL('instagram://user?username=heymeala').catch(
                () => {
                  Linking.openURL('https://www.instagram.com/heymeala');
                },
              )
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
              Linking.openURL('twitter://user?screen_name=heymeala').catch(
                () => {
                  Linking.openURL('https://www.twitter.com/heymeala');
                },
              )
            }
            type="twitter"
          />
        </View>
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
}));
