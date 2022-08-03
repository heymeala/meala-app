import React, { useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';

import {Button, LinearProgress, makeStyles, SocialIcon, Text} from 'react-native-elements';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';
import Feedback from '../../Common/Feedback';
import ExportDatabase from './ExportDatabase';
import Icon from 'react-native-vector-icons/Ionicons';
import { donate } from '../../utils/donate';

const SettingsFooter = () => {
  const screenReaderEnabled = useScreenReader();
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [upload, setUpload] = useState('false');
  const [progress, setProgress] = useState(0);
  return (
    <View style={{ padding: 20 }}>
      {upload === 'success' ? (
        <View style={styles.donate}>
          <Text style={styles.title}>{t('Settings.donate_thanks')}</Text>
          <Icon name={'heart-outline'} type={'ionicon'} size={40} />
        </View>
      ) : (
        <View style={styles.donate}>
          <Text h2 style={styles.title}>
            {t('Settings.donate_title')}
          </Text>
          <Text style={styles.h2}>{t('Settings.donate_explain')}</Text>
          {progress === 0 ? (
            <Button
              title={t('Settings.donate')}
              loading={upload !== 'false'}
              onPress={() => donate(setUpload, 'true', setProgress)}
            />
          ) : (
            <LinearProgress variant={'determinate'} value={progress} color="secondary" />
          )}
        </View>
      )}

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
  donate: { marginVertical: theme.spacing.L, paddingBottom: theme.spacing.L },
  mail: { marginVertical: theme.spacing.M },
}));
