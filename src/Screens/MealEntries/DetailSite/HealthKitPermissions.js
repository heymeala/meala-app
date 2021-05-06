import AppleHealthKit from 'react-native-health';
import moment from 'moment';
import {SEA_MINUTES} from './Chart/chartConstant';

export const permissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.BloodGlucose,
      AppleHealthKit.Constants.Permissions.Carbohydrates,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
    ],
    write: [AppleHealthKit.Constants.Permissions.Steps],
  },
};


