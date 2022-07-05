import React, { useEffect, useState } from 'react';
import { FITBIT_ID, FITBIT_SECRET } from '@env';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { authorize, revoke } from 'react-native-app-auth';
import LocalizationContext from '../../../../LanguageContext';
import moment from 'moment';
import { default as axios } from 'axios';

const Fitbit = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  moment.locale(locale);
  const [accessToken, setAccessToken] = useState();

  // Log in to get an authentication token
  const config = {
    clientId: FITBIT_ID,
    clientSecret: FITBIT_SECRET,
    redirectUrl: 'com.heymeala.app.oauth://callback',
    scopes: ['activity', 'sleep', 'profile', 'heartrate', 'nutrition', 'location','settings','social', 'weight'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
      tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
      revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
    },
  };

  const fitbitOAuth = () => {
    authorize(config).then(response => {
      console.log(response);
      setAccessToken(response.accessToken);
    });
  };

  const getDeviceInfo = () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: 'https://api.fitbit.com/1/user/-/profile.json',
    };

    axios(options).then(function (response) {
      console.log(response.data);
    });
  };
  const getActivityInfo = () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: 'https://api.fitbit.com/1/activities.json',
    };

    axios(options).then(function (response) {
      console.log(response.data);
    });
  };
  const getHeartRateInfo = () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: 'https://api.fitbit.com/1/user/-/activities/heart/date/2022-07-01/2022-07-05.json',
    };

    axios(options).then(function (response) {
      console.log(response.data);
    });
  };
  const getAPIInfo = url => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: url,
    };

    axios(options).then(function (response) {
      console.log(response.data);
    });
  };

  const revokeToken = async () => {
    const result = await revoke(config, {
      tokenToRevoke: accessToken,
      sendClientId: true,
      includeBasicAuth: true,
    });
    console.log(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.padding}>Fitti</Text>
      <Button title={'Auth'} onPress={() => fitbitOAuth()} />
      <Button title={'Devices'} onPress={() => getDeviceInfo()} />
      <Button title={'Activity'} onPress={() => getActivityInfo()} />
      <Button title={'HeartRate'} onPress={() => getHeartRateInfo()} />
      <Button
        title={'Recent Activities'}
        onPress={() =>
          getAPIInfo(
            'https://api.fitbit.com/1/user/-/activities/heart/date/2022-07-05/1d/1min/time/12:00/12:30.json',
          )
        }
      />
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
