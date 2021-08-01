import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { getAccessToken, getOauthUrl } from '../../Common/fatsecret/fatsecretApi';
import openLink from '../../Common/InAppBrowser';
import { Button, Input, Text } from 'react-native-elements';

import * as Keychain from 'react-native-keychain';
import { useNavigation } from '@react-navigation/core';
import LocalizationContext from '../../../LanguageContext';
import analytics from '@react-native-firebase/analytics';

const FatSecretSettings = () => {
  const navigation = useNavigation();
  const { t, locale } = React.useContext(LocalizationContext);

  const [oAuthTokenOne, setOAuthTokenOne] = useState();
  const [oAuthSecretOne, setOAuthSecretOne] = useState();
  const [userOAuthToken, setUserOauthToken] = useState();
  const [userOAuthTokenSecret, setUserOauthTokenSecret] = useState();
  const [hasKey, setHasKey] = useState(false);

  const [text, setText] = useState('');

  async function store(username, password) {
    // Store the credentials
    await Keychain.setInternetCredentials('https://www.fatsecret.com/oauth/authorize', username, password);

    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials('https://www.fatsecret.com/oauth/authorize');
      if (credentials) {
        Alert.alert(t('Settings.FatSecretSettings.loginSuccess'));
        // console.log('Credentials successfully loaded for user ' + credentials.username);
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  }

  async function deleteKey() {
    await Keychain.resetInternetCredentials('https://www.fatsecret.com/oauth/authorize');
  }

  useEffect(() => {
    Keychain.hasInternetCredentials('https://www.fatsecret.com/oauth/authorize').then(result =>
      result !== false ? setHasKey(true) : null,
    );
  }, []);

  return (
    <View style={{ padding: 12 }}>
      {!hasKey && (
        <>
          <Text h3 style={{ padding: 13 }}>
            {t('Settings.FatSecretSettings.info')}
          </Text>

          <Button
            disabled={oAuthTokenOne && oAuthSecretOne && text.length > 3}
            title={t('Settings.FatSecretSettings.Login')}
            onPress={() =>
              getOauthUrl().then(data => {
                setOAuthTokenOne(data.oauth_token);
                setOAuthSecretOne(data.oauth_token_secret);
                data.oauth_token &&
                  openLink('https://www.fatsecret.com/oauth/authorize?oauth_token=' + data.oauth_token);
              })
            }
          />
        </>
      )}
      {oAuthTokenOne && oAuthSecretOne ? (
        <>
          <View style={{ width: 300 }}>
            <Text style={{ padding: 8 }}>{t('Settings.FatSecretSettings.valid')}</Text>

            <Input style={{ height: 40 }} placeholder="Validation Id" onChangeText={text => setText(text)} />
          </View>
          <Button
            disabled={text.length < 3}
            title={t('Settings.FatSecretSettings.connect')}
            onPress={() =>
              text.length > 3 &&
              getAccessToken(oAuthTokenOne, oAuthSecretOne, text).then(data => {
                setUserOauthToken(data.oauth_token);
                setUserOauthTokenSecret(data.oauth_token_secret);
                store(data.oauth_token, data.oauth_token_secret).then(() => {
                  analytics().logEvent('connected_app', {
                    name: 'FatSecret',
                  });
                  navigation.goBack();
                });
              })
            }
          />
        </>
      ) : null}

      {hasKey ? (
        <>
          <Button
            title={t('Settings.FatSecretSettings.delete')}
            onPress={() => deleteKey().then(() => navigation.goBack())}
          />
        </>
      ) : null}
    </View>
  );
};

export default FatSecretSettings;
