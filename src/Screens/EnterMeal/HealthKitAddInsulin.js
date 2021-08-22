import React from 'react';
import { makeStyles, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { useUserSettings } from '../../hooks/useUserSettings';
import { HEALTHKIT } from '../Settings/glucoseSourceConstants';
import Healthkit, { HKQuantityTypeIdentifier } from '@kingstinct/react-native-healthkit';
import { HKInsulinDeliveryReason, HKUnit } from '@kingstinct/react-native-healthkit/src/index';
import { Alert, View } from 'react-native';
import OutLineButton from '../../Common/OutLineButton';

const HealthKitAddInsulin = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { theme } = useTheme();
  const { userSettings } = useUserSettings();

  function saveToHealthKit(u) {
    if (!isNaN(u)) {
      Healthkit.saveQuantitySample(
        HKQuantityTypeIdentifier.insulinDelivery,
        HKUnit.InternationalUnit,
        parseFloat(u),

        {
          start: props.date,
          metadata: {
            HKInsulinDeliveryReason: HKInsulinDeliveryReason.bolus,
          },
        },
      );
    }
  }

  const showAlert = () =>
    Alert.prompt(
      'Add Insulin to HealthKit',
      'Tage hier die Insulin Einheiten für dein Gericht ein, wenn du keine andere App nutzt um Insulin in HealthKit zu speichern',
      [
        {
          text: 'Cancel',
          style: 'destructive',
        },
        {
          text: 'Save to HealthKit',
          style: 'default',
          onPress: g => saveToHealthKit(g),
        },
      ],
      'plain-text',
      '',
      'numeric',
    );

  return userSettings.glucoseSource === HEALTHKIT ? (
    <View style={styles.container}>
      <OutLineButton
        buttonStyle={{ paddingHorizontal: 20 }}
        title={'Insulin Einheiten'}
        onPress={showAlert}
      />
    </View>
  ) : null;
};

export default HealthKitAddInsulin;

const useStyles = makeStyles(theme => ({
  container: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing.S,
    marginBottom: theme.spacing.L,
  },
}));
