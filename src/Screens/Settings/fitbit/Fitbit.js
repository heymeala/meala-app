import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import moment from 'moment';

import { fitbitOAuth, getAPIInfo, revokeToken } from './fitbitApi';

const Fitbit = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [heartRate, setHeartRate] = useState('0');
  moment.locale(locale);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.padding}>Fitti</Text>
      <Button title={'Auth'} onPress={() => fitbitOAuth()} />
      <Button title={'Devices'} onPress={() => getAPIInfo('https://api.fitbit.com/1/user/-/profile.json')} />
      <Button title={'Activity'} onPress={() => getAPIInfo('https://api.fitbit.com/1/activities.json')} />
      <Button
        title={'HeartRate'}
        onPress={() =>
          getAPIInfo('https://api.fitbit.com/1/user/-/activities/heart/date/2022-07-01/2022-07-05.json')
        }
      />
      <Button
        title={'Recent Activities'}
        onPress={() =>
          getAPIInfo(
            'https://api.fitbit.com/1/user/-/activities/heart/date/2022-07-05/1d/1min/time/12:00/14:30.json',
          ).then(response => {
            const activities = response['activities-heart-intraday'].dataset[0].time;
            console.log('hearteate', activities);
            setHeartRate(response['activities-heart-intraday'].dataset[0].time);
          })
        }
      />
      <Text>{heartRate && heartRate}</Text>
      <Button title={'Revoke'} onPress={() => revokeToken()} />
    </ScrollView>
  );
};

export default Fitbit;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  padding: {
    padding: 12,
    fontSize: 18,
    alignItems: 'center',
  },
});
