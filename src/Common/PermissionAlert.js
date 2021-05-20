import React from 'react';
import { Alert, Linking } from 'react-native';

const PermissionAlert = t => {
  return Alert.alert(
    t('AddMeal.Permission'),
    t('AddMeal.grantPermission'),
    [
      {
        text: t('General.cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => Linking.openSettings() },
    ],
    { cancelable: false },
  );
};
export default PermissionAlert;
