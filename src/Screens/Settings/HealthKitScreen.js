import React, {useEffect, useState} from 'react';
import LocalizationContext from '../../../LanguageContext';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppleHealthKit from 'react-native-health';
import {database} from '../../Common/database_realm';

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

export default function HealthKitScreen() {
  const [glucoseData, setGlucoseData] = useState();
  const {t, locale} = React.useContext(LocalizationContext);

  const [glucoseSource, setGlucoseSource] = useState(undefined);
  const [authStatus, setAuthStatus] = useState();

  useEffect(() => {
    database
      .getGlucoseSource()
      .then(glucoseSource =>
        glucoseSource ? setGlucoseSource(glucoseSource) : undefined,
      );
  }, []);

  const saveState = value => {
    database.saveGlucoseSource(1);
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
      /* Can now read or write to HealthKit */

      const options = {
        startDate: new Date(2020, 1, 1).toISOString(),
      };

      AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
        /* Samples are now collected from HealthKit */
      });
      AppleHealthKit.getBloodGlucoseSamples(
        options,
        (callbackError, results) => {
          /* Samples are now collected from HealthKit */
          if (callbackError) {
            console.log(callbackError);
            return;
          }
          setGlucoseData(results);
          console.log(results);
        },
      );
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
    getAuthAccess();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              {authStatus && authStatus.permissions.read[0] !== 1 ? (
                <>
                  <Text style={styles.sectionTitle}>
                    Connect Apple Health Kit with meala
                  </Text>
                  <Text onPress={getPermission}>
                    Press me to get give Permission
                  </Text>
                </>
              ) : (
                <Text> meala has access to the following health data </Text>
              )}
              {/*     <View style={styles.sectionDescription}>
                {glucoseData &&
                  glucoseData.map((data, i) => (
                    <Text key={i}>{data.value}</Text>
                  ))}
              </View>*/}
              <View>
                <Text>Read</Text>
                <Text>
                  Glucose{' '}
                  {authStatus && authStatus.permissions.read[0] === 1
                    ? 'Zugriff'
                    : 'Kein Zugriff'}
                </Text>
                <Text>
                  Carohydrats{' '}
                  {authStatus && authStatus.permissions.read[1] === 1
                    ? 'Zugriff'
                    : 'Kein Zugriff'}
                </Text>
              </View>
            </View>
            {glucoseSource === '1' ? (
              <>
                <Text style={{paddingTop: 20}}>
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
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
