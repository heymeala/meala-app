import { default as axios } from 'axios';
import Keychain from 'react-native-keychain';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { FITBIT_ID, FITBIT_SECRET } from '@env';

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

async function getFitbitTokens() {
  try {
    // Retrieve the credentials
    const credentials = await Keychain.getInternetCredentials('https://api.fitbit.com/oauth2/token');
    if (credentials) {
      console.log(credentials);
      console.log('Credentials successfully loaded for user ' + credentials.server);
      return credentials;
    } else {
      console.log('No credentials stored');
    }
  } catch (error) {
    console.log("Keychain couldn't be accessed!", error);
  }
}

async function saveAccessToken(access_Token, refresh_Token) {
  await Keychain.setInternetCredentials('https://api.fitbit.com/oauth2/token', access_Token, refresh_Token);
  // await getFitbitTokens();
}

export const fitbitOAuth = () => {
  authorize(config).then(response => {
    console.log(response);
    saveAccessToken(response.accessToken, response.refreshToken);
    return response;
  });
};

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async interceptorConfig => {
    // load tokens from keychain
    const credentials = await getFitbitTokens();
    console.log('request interceptor');
    interceptorConfig.headers = {
      Authorization: `Bearer ${credentials.username}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    return interceptorConfig;
  },
  error => {
    Promise.reject(error);
  },
);

export const refreshFitbitToken = () => {
  return getFitbitTokens().then(async credentials => {
    console.log('credentials', credentials.password);
    const responseTokens = await refresh(config, {
      refreshToken: credentials.password,
    });
    console.log('response', 'response');
    console.log('response', responseTokens);
    saveAccessToken(responseTokens.accessToken, responseTokens.refreshToken);
  });
};

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  response => {
    console.log('response', 'test res');
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    console.log(error);

    console.log(error.response.status);
/*    if (error.response.status === 401) {
      console.log('login again');
      fitbitOAuth();
      return Promise.reject(error);
    }*/

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      refreshFitbitToken().then(async () => {
        console.log('response 401', 'response');
        const credentials = await getFitbitTokens();
        axiosApiInstance.defaults.headers.common.Authorization = 'Bearer ' + credentials.username;
        return axiosApiInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  },
);

export const getAPIInfo = url => {
  const options = {
    url: url,
  };

  return axiosApiInstance(options).then(function (response) {
    console.log(response.data);
    return response.data;
  });
};

export const revokeToken = async () => {
  const credentials = await getFitbitTokens();
  const result = await revoke(config, {
    tokenToRevoke: credentials.username,
    sendClientId: true,
    includeBasicAuth: true,
  });
  console.log(result);
};
