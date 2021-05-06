import {Platform} from 'react-native';
import AppleHealthKit from 'react-native-health';

export function hkSteps(setStepSamples) {
  const majorVersionIOS = parseInt(Platform.Version, 10);
  if (majorVersionIOS >= 13) {
    console.log('ios >= 13');

    let optionsSteps = {
      date: new Date().toISOString(), // optional; default now
      includeManuallyAdded: true, // optional: default true
    };
    AppleHealthKit.getStepCount(optionsSteps, (err, results) => {
      if (err) {
        console.log('err 2', err);
        return;
      }
      results ? setStepSamples(results) : setStepSamples(null);
    });
  }
}
