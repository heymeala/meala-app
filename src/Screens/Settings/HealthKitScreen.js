import React, {useEffect, useState} from 'react';
import {Button, ScrollView} from 'react-native';
import AppleHealthKit from 'rn-apple-healthkit';
import {Text} from 'react-native-elements';
import {database} from '../../Common/database_realm';
import {useNavigation} from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import moment from 'moment';

const HealthKitScreen = () => {
  const navigation = useNavigation();
  const {t, locale} = React.useContext(LocalizationContext);

  const [healthKitBloodGlucoseData, setHealthKitBloodGlucoseData] = useState(
    undefined,
  );
  const [healthKitgetSteps, setHealthKitgetSteps] = useState(undefined);
  const [glucoseSource, setGlucoseSource] = useState(undefined);

  // Healthkit API part

  useEffect(() => {
    const d = new Date();

    const PERMS = AppleHealthKit.Constants.Permissions;

    const HKOPTIONS = {
      permissions: {
        read: [
          PERMS.StepCount,
          PERMS.Steps,
          PERMS.DateOfBirth,
          PERMS.BloodGlucose,
        ],
        write: [PERMS.StepCount, PERMS.Weight, PERMS.BloodGlucose],
      },
      date: d.toISOString(),
    };

    let options = {
      unit: 'mgPerdL', // optional; default 'mmolPerL'
      startDate: moment().subtract(1, 'days').toISOString(), // required
      endDate: new Date().toISOString(), // optional; default now
      ascending: false, // optional; default false
      limit: 30, // optional; default no limit
    };
    let stepOptions = {};

    AppleHealthKit.initHealthKit(HKOPTIONS, (err, res) => {
      if (err) {
        console.log('error initializing Healthkit: ' + err);
        return;
      }
      AppleHealthKit.getStepCount(stepOptions, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        setHealthKitgetSteps(results);
      });

      AppleHealthKit.getBloodGlucoseSamples(options, (err, results) => {
        if (err) {
          return;
        }
        console.log(results);
        setHealthKitBloodGlucoseData(results);
      });
    });

    database
      .getGlucoseSource()
      .then((glucoseSource) =>
        glucoseSource ? setGlucoseSource(glucoseSource) : undefined,
      );
  }, []);

  const saveState = (value) => {
    database.saveGlucoseSource(1);
    setGlucoseSource('1');
    navigation.goBack();
  };
  //todo: steps for 3 hours
  const totalSteps = () => {
    if (typeof healthKitgetSteps === 'undefined') {
      return t('Settings.healthKit.noData');
    } else {
      return t('Settings.healthKit.totalStepsToday', {
        steps: healthKitgetSteps.value,
      });
    }
  };

  const totalGlucose = () => {
    if (typeof healthKitBloodGlucoseData === 'undefined') {
      return 'Gehe in die Einstellungen und überprüfe die Berechtigung für Apple Health.';
    } else if (healthKitBloodGlucoseData.length > 0) {
      return t('Settings.healthKit.totalGlucoseValues', {
        length: healthKitBloodGlucoseData.length,
      });
    }
  };
  return (
    <ScrollView style={{padding: 20}}>
      <Text style={{paddingTop: 20}}>{totalGlucose()} </Text>
      {glucoseSource === '1' ? (
        <>
          <Text style={{paddingTop: 20}}>
            {t('Settings.healthKit.healthKitActivated')}
          </Text>
        </>
      ) : (
        <Button
          title={t('Settings.healthKit.activateHealthKit')}
          onPress={() => {
            saveState(1);
          }}
        />
      )}
    </ScrollView>
  );
};

export default HealthKitScreen;
