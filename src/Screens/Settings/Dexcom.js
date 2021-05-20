import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { authorize } from 'react-native-app-auth';
import { DEXCOM_ID, DEXCOM_SECRET } from '@env';
import SaveButton from '../../Common/SaveButton';
import LocalizationContext from '../../../LanguageContext';
import BlueButton from '../../Common/BlueButton';
import moment from 'moment';
import * as Keychain from 'react-native-keychain';
const axios = require('axios').default;
import qs from 'qs';

const Dexcom = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [code, setCode] = useState();
  moment.locale(locale);
  const apiUrl = 'api';

  const config = {
    clientId: DEXCOM_ID,
    redirectUrl: 'com.heymeala.app.oauth://callback',
    clientSecret: DEXCOM_SECRET,
    clientAuthMethod: 'post',
    responseType: 'code',
    useNonce: false,
    usePKCE: false,
    skipCodeExchange: true,
    additionalParameters: {
      grant_type: 'authorization_code',
    },
    scopes: ['offline_access'],
    serviceConfiguration: {
      authorizationEndpoint: `https://${apiUrl}.dexcom.com/v2/oauth2/login`,
      tokenEndpoint: `https://${apiUrl}.dexcom.com/v2/oauth2/token`,
    },
  };

  const [hasLoggedInOnce, setHasLoggedInOnce] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [dataRange, setDataRange] = useState();
  const [cgm, setCGM] = useState();

  useEffect(() => {
    getTokens().then(e => console.log(e));
  }, []);

  const refreshData = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    redirect_uri: config.redirectUrl,
  };
  const reFreshOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
    },
    data: qs.stringify(refreshData),
    url: `https://${apiUrl}.dexcom.com/v2/oauth2/token`,
    withCredentials: true,
  };

  async function getTokens() {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials('https://api.dexcom.com/v2/oauth2/token');
      if (credentials) {
        console.log('Credentials successfully loaded for user ' + credentials.server);
        setAccessToken(credentials.username);
        setRefreshToken(credentials.password);
        setHasLoggedInOnce(true);
        setCode('DXUS2021');
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }

  async function saveAccessToken(access, refresh) {
    await Keychain.setInternetCredentials('https://api.dexcom.com/v2/oauth2/token', access, refresh);
    await getTokens();
  }

  function axiosAuthorizer() {
    try {
      authorize(config).then(authState => {
        const data = {
          client_id: config.clientId,
          client_secret: config.clientSecret,
          code: authState.authorizationCode,
          grant_type: 'authorization_code',
          redirect_uri: config.redirectUrl,
        };
        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-cache',
          },
          data: qs.stringify(data),
          url: `https://${apiUrl}.dexcom.com/v2/oauth2/token`,
          withCredentials: true,
        };

        if (authState.authorizationCode) {
          axios(options)
            .then(function (response) {
              setAccessToken(response.data.access_token);
              setRefreshToken(response.data.refresh_token);
              setHasLoggedInOnce(true);
              saveAccessToken(response.data.access_token, response.data.refresh_token);
            })
            .catch(function (error) {
              console.log('Auth Error', error);
            });
        } else {
          console.log('no code');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  function axiosGetDataRange() {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: `https://${apiUrl}.dexcom.com/v2/users/self/dataRange`,
    };

    axios(options)
      .then(function (response) {
        setDataRange(response.data);
      })
      .catch(function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          //  originalRequest._retry = true;
          axios(reFreshOptions)
            .then(response => {
              if (response.status === 200) {
                // 1) put token to Storage
                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);
                setHasLoggedInOnce(true);
                try {
                  saveAccessToken(response.data.access_token, response.data.refresh_token);
                } catch (e) {
                  console.log('Keychain Error');
                }
                // 2) Change Authorization header
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                // 3) return originalRequest object with Axios.
                axios(originalRequest)
                  .then(function (response) {
                    setDataRange(response.data);
                  })
                  .catch(function (error) {
                    console.log('Data Range 2', error);
                  });
              } else {
                console.log('No status 200');
              }
            })
            .catch(function (error) {
              console.log('reFresh Error', error);
            });
        }
      });
  }

  function getSGVDataToken() {
    const startDate = moment().subtract(6, 'hours').format('YYYY-MM-DDTHH:mm:ss');
    const endDate = moment().subtract(3, 'hours').format('YYYY-MM-DDTHH:mm:ss');

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      url: `https://${apiUrl}.dexcom.com/v2/users/self/egvs?startDate=${startDate}&endDate=${endDate}`,
    };

    axios(options)
      .then(function (response) {
        setCGM(response.data);
      })
      .catch(function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          //  originalRequest._retry = true;
          axios(reFreshOptions)
            .then(response => {
              if (response.status === 200) {
                // 1) put token to Storage
                setAccessToken(response.data.access_token);
                setRefreshToken(response.data.refresh_token);
                setHasLoggedInOnce(true);
                try {
                  saveAccessToken(response.data.access_token, response.data.refresh_token);
                } catch (e) {
                  console.log('Keychain Error');
                }
                // 2) Change Authorization header
                originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                // 3) return originalRequest object with Axios.
                axios(originalRequest)
                  .then(function (response) {
                    setCGM(response.data);
                  })
                  .catch(function (error) {
                    console.log('Data Range 2', error);
                  });
              } else {
                console.log('No status 200');
              }
            })
            .catch(function (error) {
              console.log('reFresh Error', error);
            });
        }
      });
  }

  async function deleteKey() {
    await Keychain.resetInternetCredentials('https://api.dexcom.com/v2/oauth2/token');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input placeholder={'Code'} onChangeText={text => setCode(text)} />
      {code === 'DXUS2021' ? (
        <>
          {!hasLoggedInOnce ? (
            <SaveButton title={'Login'} onPress={() => axiosAuthorizer()} />
          ) : (
            <>
              <BlueButton title={'Get Date Range Info'} onPress={() => axiosGetDataRange()} />
              <BlueButton title={'Get Glucose Data'} onPress={() => getSGVDataToken()} />

              <Button title={'Delete'} onPress={() => deleteKey()} />
            </>
          )}
          {dataRange && (
            <Text>
              End: {dataRange.egvs.end.displayTime} Start: {dataRange.egvs.start.displayTime}
            </Text>
          )}
          {cgm && (
            <>
              <Text>Values: </Text>
              {cgm.egvs &&
                cgm.egvs.map((data, i) => (
                  <View style={styles.padding} key={i}>
                    <Text>{data.displayTime}</Text>
                    <Text>
                      {data.smoothedValue} {data.trend}
                    </Text>
                  </View>
                ))}
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.padding}>{t('Settings.Dexcom.text')}</Text>
          <Button
            title={t('Settings.Dexcom.button')}
            onPress={() => Linking.openURL('mailto:mail@heymeala.com')}
          />
        </>
      )}
    </ScrollView>
  );
};

export default Dexcom;

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
