import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import dayjs from 'dayjs';
import Healthkit, {
  HKCategoryTypeIdentifier,
  HKCharacteristicTypeIdentifier,
  HKQuantitySample,
  HKQuantityTypeIdentifier,
} from '@kingstinct/react-native-healthkit';

const DisplayQuantitySample: React.FunctionComponent = ({ title, sample }) => {
  return (
    <DataTable.Row accessibilityStates={[]}>
      <DataTable.Cell accessibilityStates={[]}>{title}</DataTable.Cell>
      <DataTable.Cell style={{ paddingRight: 10 }} accessibilityStates={[]} numeric>
        {sample ? sample.quantity.toFixed(1) : '-'}
      </DataTable.Cell>
      <DataTable.Cell accessibilityStates={[]}>{sample ? sample.unit : '-'}</DataTable.Cell>
      <DataTable.Cell accessibilityStates={[]}>
        {sample ? sample.startDate.toLocaleTimeString() : '-'}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

function DataView() {
  const [bloodGlucoseSamples, setBloodGlucoseSamples] = React.useState(null);
  const [insulinSamples, setInsulinSamples] = React.useState(null);
  const [carbohydrateSamples, setCarbohydrateSamples] = React.useState(null);
  const [steps, setSteps] = React.useState(null);
  const [menstrualFlow, setMenstrualFlow] = React.useState(null);

  React.useEffect(() => {
    Healthkit.authorizationStatusFor(HKQuantityTypeIdentifier.bloodPressureDiastolic).then(r => {
      console.log('bloodPressureDiastolic', r ? 'True' : 'False');
    });
    Healthkit.authorizationStatusFor(HKQuantityTypeIdentifier.bloodGlucose).then(r => {
      console.log('bloodGlucose', r ? 'True' : 'False');
    });
    Healthkit.authorizationStatusFor(HKQuantityTypeIdentifier.insulinDelivery).then(r => {
      console.log('insulin', r ? 'True' : 'False');
    });

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.bloodGlucose, {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    }).then(setBloodGlucoseSamples);

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.insulinDelivery, {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    }).then(setInsulinSamples);

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.dietaryCarbohydrates, {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    }).then(setCarbohydrateSamples);
    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    }).then(setSteps);

    Healthkit.queryQuantitySamples(HKQuantityTypeIdentifier.stepCount, {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    }).then(setSteps);

    Healthkit.queryCategorySamples(HKCategoryTypeIdentifier.menstrualFlow, {
      ascending: true,
      from: dayjs().startOf('day').toDate(),
      to: new Date(),
    }).then(setMenstrualFlow);
  }, []);
  console.log(menstrualFlow);

  return (
    <ScrollView style={{ flex: 1, paddingTop: 40 }}>
      <DataTable>
        {bloodGlucoseSamples
          ? bloodGlucoseSamples.map((sample: HKQuantitySample) => (
              <DisplayQuantitySample sample={sample} title="Glucose" />
            ))
          : null}
        {insulinSamples
          ? insulinSamples.map((sample: HKQuantitySample) => (
              <DisplayQuantitySample sample={sample} title="Insulin" />
            ))
          : null}

        {carbohydrateSamples
          ? carbohydrateSamples.map((sample: HKQuantitySample) => (
              <DisplayQuantitySample sample={sample} title="Carbs" />
            ))
          : null}
        {steps
          ? steps.map((sample: HKQuantitySample) => <DisplayQuantitySample sample={sample} title="Steps" />)
          : null}
      </DataTable>
    </ScrollView>
  );
}

/*
      </DataTable>*/

const HealthKitTest = () => {
  const [hasPermissions, setHasPermissions] = React.useState(false);
  React.useEffect(() => {
    Healthkit.requestAuthorization(
      [
        HKCharacteristicTypeIdentifier.biologicalSex,
        HKCharacteristicTypeIdentifier.bloodType,
        HKCharacteristicTypeIdentifier.dateOfBirth,
        HKCharacteristicTypeIdentifier.fitzpatrickSkinType,
        HKQuantityTypeIdentifier.waistCircumference,
        HKQuantityTypeIdentifier.bodyMassIndex,
        HKQuantityTypeIdentifier.bodyMass,
        HKQuantityTypeIdentifier.heartRate,
        HKQuantityTypeIdentifier.bloodGlucose,
        HKQuantityTypeIdentifier.insulinDelivery,
        HKQuantityTypeIdentifier.activeEnergyBurned,
        HKCategoryTypeIdentifier.mindfulSession,
        HKCategoryTypeIdentifier.menstrualFlow,
        HKQuantityTypeIdentifier.dietaryCaffeine,
        HKQuantityTypeIdentifier.dietaryEnergyConsumed,
        'HKWorkoutTypeIdentifier',
      ],
      [
        HKQuantityTypeIdentifier.waistCircumference,
        HKQuantityTypeIdentifier.activeEnergyBurned,
        HKQuantityTypeIdentifier.bloodGlucose,
        HKQuantityTypeIdentifier.insulinDelivery,
        HKQuantityTypeIdentifier.bodyFatPercentage,
        HKCategoryTypeIdentifier.mindfulSession,
        HKQuantityTypeIdentifier.dietaryCaffeine,
        HKQuantityTypeIdentifier.dietaryEnergyConsumed,
        'HKWorkoutTypeIdentifier',
      ],
    ).then(setHasPermissions);
  }, []);

  return hasPermissions ? (
    <DataView />
  ) : (
    <Text style={{ paddingTop: 40, textAlign: 'center' }}>Waiting for user to authorize..</Text>
  );
};

export default HealthKitTest;
