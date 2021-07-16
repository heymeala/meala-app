import React from 'react';
import { View } from 'react-native';
import { Divider, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { spacing } from '../../../theme/styles';

const NightScoutTreatmentDetails = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  let eventType, enteredinsulin, carbsCal, insuliCal;
  const { carbSumme, insulinSumme, treatments } = props;

  const sortedList = treatments && treatments.sort((a, b) => (a.eventType > b.eventType ? 1 : -1));
  let helper = '';
  console.log(sortedList);
  const InsulinCarbDetails = () =>
    sortedList &&
    sortedList.map((treatments, i) => {
      eventType = null;
      if (treatments.insulin) {
        insuliCal = t('Entries.directBolus') + ' ' + treatments.insulin.toFixed(2);
      } else {
        insuliCal = null;
      }
      if (treatments.carbs) {
        carbsCal = t('Entries.carbs') + ' ' + treatments.carbs.toFixed(2);
      } else {
        carbsCal = null;
      }
      if (treatments.eventType) {
        console.log('treatments.eventType', treatments.eventType);
        console.log('helper', helper);

        if (treatments.eventType !== helper) {
          eventType = t('Entries.event')+ ' ' + treatments.eventType;
        }
        helper = treatments.eventType;
      } else {
        eventType = null;
        console.log('null');
      }
      if (treatments.enteredinsulin) {
        enteredinsulin = t('Entries.delay') + treatments.enteredinsulin;
      } else {
        enteredinsulin = null;
      }
      return carbsCal || insuliCal || enteredinsulin || eventType ? (
        <View key={treatments._id}>
          <View style={styles.detailsContainer}>
            {eventType && <Text style={styles.event}>{eventType}</Text>}
            {treatments.reason && <Text style={styles.event}>{treatments.reason}</Text>}
            {carbsCal && <Text style={styles.event}>{carbsCal}</Text>}
            {insuliCal && <Text style={styles.event}>{insuliCal}</Text>}
            {enteredinsulin && <Text style={styles.event}>{enteredinsulin}</Text>}
          </View>

          <Divider />
        </View>
      ) : null;
    });
  return (
    <View style={{ padding: 20 }}>
      <Text accessibilityRole={'header'} style={styles.text}>
        {t('Entries.details')}
      </Text>

      <InsulinCarbDetails />

      {insulinSumme ? (
        <Text style={styles.text}>
          {t('General.insulin')}: {insulinSumme}u
        </Text>
      ) : null}
      {carbSumme ? (
        <Text style={styles.text}>
          {t('General.Carbs')}: {carbSumme}g
        </Text>
      ) : null}
    </View>
  );
};
export default NightScoutTreatmentDetails;

const useStyles = makeStyles(theme => ({
  text: { fontSize: 18, fontWeight: 'bold' ,marginTop:theme.spacing.XS},
  detailsContainer: { marginVertical: spacing.XS },
  event: { padding: 4 },
}));
