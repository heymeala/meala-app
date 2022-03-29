import { useEffect } from 'react';
import { Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';
import * as RootNavigation from '../Navigation/RootNavigation';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const PushNotifications = t => {
  useEffect(() => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('ON NOTIFICATION:', notification);

        if (notification.data.screen && !notification.foreground && notification.userInteraction) {
          console.log(notification.data.screen);
          RootNavigation.navigate(notification.data.screen);
          if (notification.data.message) {
            Alert.alert(notification.data.title ? notification.data.title : '', notification.data.message, [
              {
                text: t('General.okay'),
              },
            ]);
          }

          if (notification.data.screen === 'EnterMealStack' && notification.userInteraction) {
            RootNavigation.navigate('Home', {
              screen: 'MealDataCollector',
              params: { mealId: notification.data.mealId },
            });
          }
        }

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true,
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: false,
    });
    PushNotification.createChannel(
      {
        channelId: 'food-reminder-channel', // (required)
        channelName: 'Meal Reminder', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, []);
};
export default PushNotifications;
