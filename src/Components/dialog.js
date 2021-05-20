import React from 'react';
import { Alert } from 'react-native';

const Dialog = (title, message, t, reset) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: t('General.cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => reset() },
    ],
    { cancelable: false },
  );
};

export default Dialog;
