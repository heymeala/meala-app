import PushNotification from 'react-native-push-notification';

export function reminderNotification(userMealId, mealId, t, defaultMealTitle) {
  PushNotification.localNotificationSchedule({
    date: new Date(Date.now() + 10950 * 1000), // in 3 hours
    /* Android Only Properties */
    channelId: 'food-reminder-channel',
    //id: userMealId,
    autoCancel: true, // (optional) default: true
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    /* iOS only properties */
    category: '', // (optional) default: empty string
    /* iOS and Android properties */
    message: t('AddMeal.notificationAfterMeal', {
      mealTitle: defaultMealTitle,
    }), // (required)
    userInfo: { stack: 'Home', screen: 'EnterMealStack', userMealId: userMealId }, // (optional) default: {} (using null throws a JSON value '<null>' error)
  });
}
