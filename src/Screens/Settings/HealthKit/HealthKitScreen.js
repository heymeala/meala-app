import React, { useEffect, useState } from 'react';
import LocalizationContext from '../../../../LanguageContext';

import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PermissionListItem from './PermissionListItem';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { spacing } from '../../../theme/styles';
import { useUserSettings } from '../../../hooks/useUserSettings';
import { HEALTHKIT } from '../glucoseSourceConstants';
import moment from 'moment';
import analytics from '@react-native-firebase/analytics';
import Healthkit, { HKQuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';
import dayjs from 'dayjs';
import { HKCategoryTypeIdentifier } from '@kingstinct/react-native-healthkit/src/native-types';

export default function HealthKitScreen() {
  const { t, locale } = React.useContext(LocalizationContext);
  const [authStatus, setAuthStatus] = useState(true);
  const { userSettings, saveUserSettings } = useUserSettings();
  const [glucoseSamples, setGlucoseSamples] = useState([]);
  const [carbSamples, setCarbSamples] = useState([]);
  const [heartRateSamples, setHeartRateSamples] = useState([]);
  const [stepSamples, setStepSamples] = useState([]);
  const [insulinSamples, setInsulinSamples] = useState([]);
  const [sleepAnalysis, setSleepAnalysis] = useState([]);

  const saveState = () => {
    analytics().logEvent('glucose_source', {
      name: HEALTHKIT,
    });
    saveUserSettings({ ...userSettings, glucoseSource: HEALTHKIT });
  };

  const getPermission = () => {
    getAuthAccess();
    const fromDate = moment().subtract(20, 'days').toISOString();
    const tillDate = moment().toISOString();
    const options = {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    };

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.bloodGlucose, options).then(setGlucoseSamples);

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.insulinDelivery, options).then(result => {
      setInsulinSamples(result);
      console.log(result);
    });

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.dietaryCarbohydrates, options).then(result => {
      setCarbSamples(result);
      console.log(result);
    });
    Healthkit.queryCategorySamples(HKCategoryTypeIdentifier.sleepAnalysis, {
      ascending: true,
      from: dayjs().subtract(1, 'day').toDate(),
      to: new Date(),
    }).then(result => {
      const hours = result
        .filter(data => data.value === 1)
        .map(data => {
          return moment(data.endDate).diff(moment(data.startDate), 'hours');
        });
      //const sum = hours.reduce(add);
      setSleepAnalysis(result);
    });

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.heartRate, options).then(setHeartRateSamples);

    const majorVersionIOS = parseInt(Platform.Version, 10);
    // if (majorVersionIOS >= 13) {
    // todo: test on ios 10
    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, options).then(result =>
      setStepSamples(result),
    );
    // }
    saveState();
  };

  const getAuthAccess = () => {
    Healthkit.requestAuthorization(
      [
        HKQuantityTypeIdentifier.heartRate,
        HKQuantityTypeIdentifier.bloodGlucose,
        HKQuantityTypeIdentifier.insulinDelivery,
        HKQuantityTypeIdentifier.dietaryCarbohydrates,
        HKQuantityTypeIdentifier.stepCount,
        HKCategoryTypeIdentifier.sleepAnalysis,
      ],
      [HKQuantityTypeIdentifier.dietaryCarbohydrates, HKQuantityTypeIdentifier.insulinDelivery],
    ).then(r => setAuthStatus(!r));
  };
  useEffect(() => {
    if (userSettings.glucoseSource === HEALTHKIT) {
      getPermission();
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            {userSettings.glucoseSource === HEALTHKIT ? (
              <Icon style={styles.center} name="ios-heart" color={'#cf2c3c'} size={70} />
            ) : (
              <Icon style={styles.center} name="heart-dislike-sharp" color={'#cf2c3c'} size={70} />
            )}
            <View style={styles.sectionContainer}>
              {authStatus ? (
                <>
                  <Text style={styles.sectionTitle}>{t('Settings.healthKit.title')}</Text>
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
                <Text style={styles.spacing}>{t('Settings.healthKit.canRead')}</Text>
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
                  permission={stepSamples && stepSamples.length > 0}
                />
                <PermissionListItem
                  title={t('Settings.healthKit.insulin')}
                  permission={insulinSamples && insulinSamples.length > 0}
                />
                <PermissionListItem
                  title={t('Settings.healthKit.sleepAnalysis')}
                  permission={sleepAnalysis && sleepAnalysis.length > 0}
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
  button: { marginVertical: spacing.M },
  scrollView: {},
  spacing: { marginVertical: spacing.M },
  sectionContainer: {
    marginVertical: 12,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  center: { paddingVertical: 20, alignSelf: 'center' },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
});
