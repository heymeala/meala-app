import React from 'react';
import {View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';

const NightScoutTreatmentDetails = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  let eventType, enteredinsulin, carbsCal, insuliCal;
  const {carbSumme, insulinSumme} = props;
  const InsulinCarbDetails = () =>
    props.treatments.map((treatments, i) => {
      eventType = null;
      if (treatments.insulin) {
        insuliCal = t('Entries.directBolus') + treatments.insulin.toFixed(2);
      } else {
        insuliCal = null;
      }
      if (treatments.carbs) {
        carbsCal = t('Entries.carbs') + treatments.carbs.toFixed(2);
      } else {
        carbsCal = null;
      }
      if (treatments.eventType) {
        if (!i) {
          return true;
        }
        if (treatments.eventType !== props.treatments[i - 1].eventType) {
          eventType = t('Entries.event') + treatments.eventType;
        }
      } else {
        eventType = null;
      }
      if (treatments.enteredinsulin) {
        enteredinsulin = t('Entries.delay') + treatments.enteredinsulin;
      } else {
        enteredinsulin = null;
      }
      return (
        <View key={treatments._id}>
          {carbsCal || insuliCal || enteredinsulin ? (
            <View style={{padding: 5}}>
              <Text>{eventType}</Text>
              <Text>
                {carbsCal}
                {insuliCal}
                {enteredinsulin}{' '}
              </Text>
            </View>
          ) : null}
        </View>
      );
    });

  return (
    <View style={{padding: 20}}>
      <Text style={styles.text}>Details</Text>
      <InsulinCarbDetails />
      <Text style={styles.text}>Insulin: {insulinSumme}u</Text>
      <Text style={styles.text}>
        {t('General.Carbs')}: {carbSumme}g
      </Text>
    </View>
  );
};

export default NightScoutTreatmentDetails;

const useStyles = makeStyles(theme => ({
  text: {fontSize: 18, fontWeight: 'bold'},
}));
