import React, {useEffect, useState} from 'react';
import LocalizationContext from '../../../../LanguageContext';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit from 'react-native-health';
import {database} from '../../../Common/database_realm';
import PermissionListItem from './PermissionListItem';
import {Text, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {spacing} from '../../../theme/styles';
import {useUserSettings} from '../../../hooks/useUserSettings';

export default function HealthKitScreen() {
  const {t, locale} = React.useContext(LocalizationContext);

  const [glucoseSource, setGlucoseSource] = useState(undefined);
  const [authStatus, setAuthStatus] = useState();
  const {userSettings, saveUserSettings} = useUserSettings();

  /* Permission options */
  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.BloodGlucose,
        AppleHealthKit.Constants.Permissions.Carbohydrates,
        AppleHealthKit.Constants.Permissions.HeartRate,
      ],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  };

  useEffect(() => {
    database
      .getGlucoseSource()
      .then(glucoseSource =>
        glucoseSource ? setGlucoseSource(glucoseSource) : undefined,
      );
  }, [glucoseSource]);

  const saveState = value => {
    saveUserSettings({...userSettings, glucoseSource: 1});
    setGlucoseSource('1');
    // navigation.goBack();
  };
  const getPermission = () => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }
      getAuthAccess();
      saveState(1);
    });
  };

  const getAuthAccess = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(result);
      console.log(result);
    });
  };
  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }
      getAuthAccess();
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {glucoseSource === '1' ? (
              <Icon
                style={styles.center}
                name="ios-heart"
                color={'#cf2c3c'}
                size={70}
              />
            ) : (
              <Icon
                style={styles.center}
                name="heart-dislike-sharp"
                color={'#cf2c3c'}
                size={70}
              />
            )}
            <View style={styles.sectionContainer}>
              {authStatus && authStatus.permissions.read[0] !== 1 ? (
                <>
                  <Text style={styles.sectionTitle}>
                    {t('Settings.healthKit.title')}
                  </Text>
                  <Button
                    style={styles.button}
                    onPress={getPermission}
                    title={t('Settings.healthKit.accessButton')}
                  />
                </>
              ) : (
                <Text h2>{t('Settings.healthKit.titleAccess')}</Text>
              )}
              <View>
                <Text style={styles.spacing}>
                  {t('Settings.healthKit.canRead')}
                </Text>
                <PermissionListItem
                  title={'Glucose'}
                  permission={
                    authStatus && authStatus.permissions.read[0] === 1
                  }
                />
                <PermissionListItem
                  title={'Carbohydrates'}
                  permission={
                    authStatus && authStatus.permissions.read[1] === 1
                  }
                />
                <PermissionListItem
                  title={'HeartRate'}
                  permission={
                    authStatus && authStatus.permissions.read[2] === 1
                  }
                />
              </View>
            </View>
            {glucoseSource === '1' ? (
              <>
                <Text h4 style={styles.center}>
                  {t('Settings.healthKit.healthKitActivated')}
                </Text>
              </>
            ) : (
              authStatus &&
              authStatus.permissions.read[0] === 1 && (
                <Button
                  title={t('Settings.healthKit.activateHealthKit')}
                  onPress={() => {
                    saveState(1);
                  }}
                />
              )
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  button: {marginVertical: spacing.M},
  scrollView: {},
  spacing: {marginVertical: spacing.M},
  sectionContainer: {
    marginVertical: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  center: {paddingVertical: 20, alignSelf: 'center'},
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});
