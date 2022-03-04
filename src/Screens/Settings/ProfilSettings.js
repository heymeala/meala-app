import React, { useEffect, useState } from 'react';
import { Linking, Platform, TouchableOpacity, View } from 'react-native';
import { CheckBox, makeStyles, Text } from 'react-native-elements';
import { useProfile } from '../../hooks/useProfile';
import LocalizationContext from '../../../LanguageContext';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { useNavigation } from '@react-navigation/core';
import { spacing } from '../../theme/styles';
import { MMOLPERL } from '../../Common/Constants/units';
import { useRealm } from '../../hooks/RealmProvider';

const ProfilSettings = () => {
  const { settings, saveProfile } = useProfile();
  const [checked, setChecked] = useState(settings.unit === 1);
  const [notification, setNotification] = useState(true);
  const { t, locale } = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const styles = useStyles();
  const { createTask, saveProfileRealm } = useRealm();

  function switchToMmol(unit) {
    setChecked((prevState) => false);
   // saveProfileRealm(unit).then(() => saveProfile(unit));
    createTask('My First Task');
  }

  function switchToMgdL(unit) {
    setChecked((prevState) => true);
   // saveProfileRealm(unit).then(() => saveProfile(unit));
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.checkPermissions(({ alert, badge, sound }) => {
        if (!alert || !badge || !sound) {
          setNotification(false);
        }
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text h2 style={styles.text}>
        {t('Settings.profile.title')}
      </Text>

      <CheckBox
        center
        iconRight
        title="mg/dL"
        containerStyle={styles.checkBoxContainer}
        textStyle={styles.checkBoxText}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={() => switchToMgdL(1)}
      />
      <CheckBox
        center
        iconRight
        containerStyle={styles.checkBoxContainer}
        textStyle={styles.checkBoxText}
        title="mmol/L"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={!checked}
        onPress={() => switchToMmol(MMOLPERL)}
      />
      <Text h3 style={{ textAlign: 'center', ...styles.text }}>
        {t('Settings.profile.example')} {Math.round(100 / settings.unit)}{' '}
        {settings.unit === 1 ? 'mg/dL' : 'mmol/L'}
      </Text>
      {!notification && Platform.OS === 'ios' && (
        <View style={styles.notificationContainer}>
          <Text h2> {t('Settings.profile.reminder')}</Text>
          <TouchableOpacity onPress={() => Linking.openSettings()}>
            <Text style={{ color: 'red', ...styles.text }} h3>
              {t('Settings.profile.notifications')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default ProfilSettings;
const useStyles = makeStyles((theme) => ({
  container: { flex: 1, padding: 24 },
  headline: {},
  checkBoxText: { flex: 1, flexGrow: 1 },
  text: { paddingVertical: spacing.M },
  notificationContainer: { marginVertical: 60 },
  checkBoxContainer: { borderRadius: 30 },
}));
