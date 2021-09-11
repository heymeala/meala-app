import Healthkit, {
  HKInsulinDeliveryReason,
  HKQuantityTypeIdentifier,
  HKUnit,
} from '@kingstinct/react-native-healthkit/src/index';

export function saveCarbohydratesToHealthKit(g, date) {
  if (!isNaN(g)) {
    Healthkit.saveQuantitySample(HKQuantityTypeIdentifier.dietaryCarbohydrates, HKUnit.Grams, parseFloat(g), {
      start: date,
    });
  }
}

export function saveInsulinToHealthKit(u, date) {
  if (!isNaN(u)) {
    Healthkit.saveQuantitySample(
      HKQuantityTypeIdentifier.insulinDelivery,
      HKUnit.InternationalUnit,
      parseFloat(u),

      {
        start: date,
        metadata: {
          HKInsulinDeliveryReason: HKInsulinDeliveryReason.bolus,
        },
      },
    );
  }
}
