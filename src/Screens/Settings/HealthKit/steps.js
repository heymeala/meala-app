import { Platform } from 'react-native';
import Healthkit, { HKQuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';
import dayjs from 'dayjs';

export function hkSteps(setStepSamples) {
  const majorVersionIOS = parseInt(Platform.Version, 10);
  if (majorVersionIOS >= 13) {
    console.log('ios >= 13');

    const options = {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    };

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, options).then(result =>
      setStepSamples(result),
    );
  }
}
