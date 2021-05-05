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
import PermissionListItem from './PermissionListItem';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {spacing} from '../../../theme/styles';
import {useUserSettings} from '../../../hooks/useUserSettings';
import {HEALTHKIT} from '../glucoseSourceConstants';
import moment from 'moment';

export default function HealthKitScreen() {
  const {t, locale} = React.useContext(LocalizationContext);
  const [authStatus, setAuthStatus] = useState(true);
  const {userSettings, saveUserSettings} = useUserSettings();
  const [glucoseSamples, setGlucoseSamples] = useState([]);
  const [carbSamples, setCarbSamples] = useState([]);
  const [heartRateSamples, setHeartRateSamples] = useState([]);
  const [stepSamples, setStepSamples] = useState([]);
  /* Permission options */
  const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.BloodGlucose,
        AppleHealthKit.Constants.Permissions.Carbohydrates,
        AppleHealthKit.Constants.Permissions.HeartRate,
        AppleHealthKit.Constants.Permissions.Steps,
      ],
      write: [AppleHealthKit.Constants.Permissions.Carbohydrates],
    },
  };

  const saveState = () => {
    saveUserSettings({...userSettings, glucoseSource: HEALTHKIT});
  };
  const getPermission = () => {
    const fromDate = moment().subtract(20, 'days').toISOString();
    const tillDate = moment().toISOString();
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }

      let options = {
        startDate: fromDate, // required
        endDate: tillDate, // optional; default now
      };
      AppleHealthKit.getBloodGlucoseSamples(
        options,
        (callbackError, results) => {
          /* Samples are now collected from HealthKit */
          setGlucoseSamples(results);

          if (callbackError) {
            console.log(callbackError);
            return;
          }
        },
      );
      AppleHealthKit.getCarbohydratesSamples(
        options,
        (callbackError, results) => {
          /* Samples are now collected from HealthKit */
          setCarbSamples(results);

          if (callbackError) {
            console.log(callbackError);
            return;
          }
        },
      );
      AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
        /* Samples are now collected from HealthKit */
        setHeartRateSamples(results);

        if (callbackError) {
          console.log(callbackError);
          return;
        }
      });
      let optionsSteps = {
        date: new Date().toISOString(), // optional; default now
        includeManuallyAdded: true, // optional: default true
      };
      AppleHealthKit.getStepCount(
        (optionsSteps: HealthInputOptions),
        (err: Object, results: HealthValue) => {
          if (err) {
            return;
          }
          console.log(results);
          setStepSamples(results);
        },
      );

      getAuthAccess();
      saveState();
    });
  };

  const getAuthAccess = () => {
    AppleHealthKit.getAuthStatus(permissions, (err, result) => {
      if (err) {
        console.error(err);
      }
      setAuthStatus(false);
      console.log(result);
    });
  };
  useEffect(() => {
    if (userSettings.glucoseSource === HEALTHKIT) {
      AppleHealthKit.initHealthKit(permissions, (error: string) => {
        if (error) {
          console.log('[ERROR] Cannot grant permissions!');
        }
        getAuthAccess();
        getPermission();
      });
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            {userSettings.glucoseSource === HEALTHKIT ? (
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
              {authStatus ? (
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
                  title={t('Settings.healthKit.glucose')}
                  permission={glucoseSamples.length > 0}
                />
                <PermissionListItem
                  title={t('Settings.healthKit.carbohydrates')}
                  permission={carbSamples.length > 0}
                />
                <PermissionListItem
                  title={t('Settings.healthKit.heartRate')}
                  permission={heartRateSamples.length > 0}
                />
                <PermissionListItem
                  title={t('Settings.healthKit.steps')}
                  permission={stepSamples && stepSamples.value > 0}
                />
              </View>
            </View>
            {userSettings.glucoseSource === HEALTHKIT ? (
              <>
                <Text h4 style={styles.center}>
                  {t('Settings.healthKit.healthKitActivated')}
                </Text>
              </>
            ) : (
              !authStatus && (
                <Button
                  title={t('Settings.healthKit.activateHealthKit')}
                  onPress={() => {
                    saveState();
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
