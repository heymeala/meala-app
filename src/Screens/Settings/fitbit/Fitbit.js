import React, { useEffect, useState } from 'react';
import { FITBIT_ID, FITBIT_SECRET } from '@env';
import { Alert, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { authorize, revoke, refresh } from 'react-native-app-auth';
import LocalizationContext from '../../../../LanguageContext';
import moment from 'moment';
import { default as axios } from 'axios';
import Keychain from 'react-native-keychain';

const Fitbit = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  moment.locale(locale);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();

  const axiosApiInstance = axios.create();

  // Log in to get an authentication token
  const config = {
    clientId: FITBIT_ID,
    clientSecret: FITBIT_SECRET,
    redirectUrl: 'com.heymeala.app.oauth://callback',
    scopes: [
      'activity',
      'sleep',
      'profile',
      'heartrate',
      'nutrition',
      'location',
      'settings',
      'social',
      'weight',
    ],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
      tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
      revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke',
    },
  };

  useEffect(() => {
    getTokens().then(e => console.log(e));
  }, []);

  async function getTokens() {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials('https://api.fitbit.com/oauth2/token');
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.server);
        setAccessToken(credentials.username);
        setRefreshToken(credentials.password);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }

  async function saveAccessToken(access, refresh) {
    await Keychain.setInternetCredentials('https://api.fitbit.com/oauth2/token', access, refresh);
    await getTokens();
  }

  const fitbitOAuth = () => {
    authorize(config).then(response => {
      console.log(response);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      saveAccessToken(response.accessToken, response.refreshToken);
    });
  };

  // Request interceptor for API calls
  axiosApiInstance.interceptors.request.use(
    async config => {
      //const value = await redisClient.get(rediskey);
      //  const keys = JSON.parse(value);

      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      return config;
    },
    error => {
      Promise.reject(error);
    },
  );

  // Response interceptor for API calls
  axiosApiInstance.interceptors.response.use(
    response => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      console.log('response error', error);
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        console.log('refresh', 'refresh');
        const access_token = await refresh(config, {
          refreshToken: refreshToken,
        });
        axios.defaults.headers.common.Authorization = 'Bearer ' + access_token;
        return axiosApiInstance(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  const getAPIInfo = url => {
    const options = {
      /* method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },*/
      url: url,
    };

    axiosApiInstance(options).then(function (response) {
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
