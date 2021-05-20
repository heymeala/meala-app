import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import SaveButton from '../../Common/SaveButton';
import LocalizationContext from '../../../LanguageContext';
import { Input } from 'react-native-elements';
import Keychain from 'react-native-keychain';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import qs from 'qs';
import axios from 'axios';

const Tidepool = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [allUsers, setAllUsers] = useState();
  const api = 'int-api';

  async function deleteKey() {
    await Keychain.resetInternetCredentials('https://api.tidepool.org/auth/login');
    await Keychain.resetInternetCredentials('https://api.tidepool.org/user_pw');
  }

  useEffect(() => {
    getTokens().then(e => console.log(e));
  }, []);

  async function getTokens() {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials('https://api.tidepool.org/auth/login');
      const login = await Keychain.getInternetCredentials('https://api.tidepool.org/user_pw');
      if (credentials && login) {
        console.log('Credentials successfully loaded for user ' + credentials.server);
        console.log('Credentials successfully loaded for user ' + login.server);
        setUserId(credentials.username);
        setToken(credentials.password);

        setPassword(login.password);
        setUsername(login.username);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }

  async function store(username, password, server) {
    // Store the credentials
    await Keychain.setInternetCredentials(server, username, password);

    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials(server);
      if (credentials) {
        console.log('Credentials successfully loaded for user ');
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }

  function login() {
    if (username && password) {
      const baseString = RNFetchBlob.base64.encode(`${username}:${password}`);
      fetch(`https://${api}.tidepool.org/auth/login`, {
        headers: {
          Authorization: 'Basic ' + baseString,
          'X-Tidepool-Client-Name': 'com.heymeala',
          'X-Tidepool-Client-Version': '0.0.1',
        },
        method: 'POST',
      })
        .then(response => {
          setToken(response.headers.get('x-tidepool-session-token'));

          return response.json();
        })
        .then(data => {
          setUserId(data.userid);
          if (data.userid) {
            store(username, password, 'https://api.tidepool.org/user_pw');
            store(data.userid, token, 'https://api.tidepool.org/auth/login');
          } else {
            console.log('no user id found');
          }
        });
    }
  }

  function axiosFetchUserData() {
    const baseString = RNFetchBlob.base64.encode(`${username}:${password}`);

    const reFreshOptions = {
      headers: {
        Authorization: 'Basic ' + baseString,
        'X-Tidepool-Client-Name': 'com.heymeala',
        'X-Tidepool-Client-Version': '0.0.1',
      },
      method: 'POST',
      url: `https://${api}.tidepool.org/auth/login`,
    };

    const options = {
      method: 'GET',
      headers: {
        'X-Tidepool-Session-Token': token,
        'Content-Type': 'application/json',
      },
      url: `https://${api}.tidepool.org/message/notes/${userId}`,
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          //  originalRequest._retry = true;
          axios(reFreshOptions)
            .then(response => {
              if (response.status === 200) {
                // 1) put token to Storage
                // setToken(response.headers.get('x-tidepool-session-token'));
                console.log(response.headers['x-tidepool-session-token']);
                // 2) Change Authorization header
                originalRequest.headers['X-Tidepool-Session-Token'] =
                  response.headers['x-tidepool-session-token'];
                try {
                  store(
                    userId,
                    response.headers['x-tidepool-session-token'],
                    'https://api.tidepool.org/auth/login',
                  );
                } catch (e) {
                  console.log(e);
                }
                // 3) return originalRequest object with Axios.
                axios(originalRequest)
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log('Data ', error);
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

  function axiosFetch() {
    const baseString = RNFetchBlob.base64.encode(`${username}:${password}`);
    const startDate = moment().subtract(1260, 'days').toISOString();
    const endDate = moment().subtract(1200, 'days').toISOString();
    console.log(startDate);
    console.log(endDate);
    const reFreshOptions = {
      headers: {
        Authorization: 'Basic ' + baseString,
        'X-Tidepool-Client-Name': 'com.heymeala',
        'X-Tidepool-Client-Version': '0.0.1',
      },
      method: 'POST',
      url: `https://${api}.tidepool.org/auth/login`,
    };

    const options = {
      method: 'GET',
      headers: {
        'X-Tidepool-Session-Token': token,
        'Content-Type': 'application/json',
      },
      url: `https://${api}.tidepool.org/data/${userId}?startDate=${startDate}&endDate=${endDate}`,
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          //  originalRequest._retry = true;
          axios(reFreshOptions)
            .then(response => {
              if (response.status === 200) {
                // 1) put token to Storage
                // setToken(response.headers.get('x-tidepool-session-token'));
                console.log(response.headers['x-tidepool-session-token']);
                // 2) Change Authorization header
                originalRequest.headers['X-Tidepool-Session-Token'] =
                  response.headers['x-tidepool-session-token'];
                try {
                  store(
                    userId,
                    response.headers['x-tidepool-session-token'],
                    'https://api.tidepool.org/auth/login',
                  );
                } catch (e) {
                  console.log(e);
                }
                // 3) return originalRequest object with Axios.
                axios(originalRequest)
                  .then(function (response) {
                    console.log(response.data);
                  })
                  .catch(function (error) {
                    console.log('Data ', error);
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

  function axiosGetAllUsers() {
    const baseString = RNFetchBlob.base64.encode(`${username}:${password}`);

    const reFreshOptions = {
      headers: {
        Authorization: 'Basic ' + baseString,
        'X-Tidepool-Client-Name': 'com.heymeala',
        'X-Tidepool-Client-Version': '0.0.1',
      },
      method: 'POST',
      url: `https://${api}.tidepool.org/auth/login`,
    };

    const options = {
      method: 'GET',
      headers: {
        'X-Tidepool-Session-Token': token,
        'Content-Type': 'application/json',
      },
      url: `https://${api}.tidepool.org/metadata/users/${userId}/users`,
    };

    axios(options)
      .then(function (response) {
        console.log(response.data);
        setAllUsers(response.data);
      })
      .catch(function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401) {
          //  originalRequest._retry = true;
          axios(reFreshOptions)
            .then(response => {
              if (response.status === 200) {
                // 1) put token to Storage
                // setToken(response.headers.get('x-tidepool-session-token'));
                console.log(response.headers['x-tidepool-session-token']);
                // 2) Change Authorization header
                originalRequest.headers['X-Tidepool-Session-Token'] =
                  response.headers['x-tidepool-session-token'];
                try {
                  store(
                    userId,
                    response.headers['x-tidepool-session-token'],
                    'https://api.tidepool.org/auth/login',
                  );
                } catch (e) {
                  console.log(e);
                }
                // 3) return originalRequest object with Axios.
                axios(originalRequest)
                  .then(function (response) {
                    console.log(response.data);
                    setAllUsers(response.data);
                  })
                  .catch(function (error) {
                    console.log('Data ', error);
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

  return (
    <View style={styles.container}>
      <Text style={styles.padding}>Tidepool </Text>
      {!userId ? (
        <>
          <Input placeholder={'Tidepool E-Mail'} onChangeText={text => setUsername(text)} />
          <Input
            textContentType={'password'}
            placeholder={'Password'}
            onChangeText={text => setPassword(text)}
          />

          <SaveButton title={'Login'} onPress={() => login()} />
        </>
      ) : (
        <>
          <Button title={'Delete Integration'} onPress={() => deleteKey()} />
          <SaveButton title={'Get Info Data'} onPress={() => axiosFetchUserData()} />
          <SaveButton title={'Get Users'} onPress={() => axiosGetAllUsers()} />

          {allUsers &&
            allUsers.map((data, i) => (
              <View style={{ padding: 8 }} key={i}>
                <Text>{data.userid}</Text>
                <Text>{data.profile.fullName}</Text>
              </View>
            ))}
        </>
      )}
    </View>
  );
};

export default Tidepool;

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
