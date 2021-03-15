import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';

const NutritionDetails = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);

  const {foodDetailData, unit, title} = props;
  return (
    <View style={styles.nContainer}>
      <Text style={styles.nutritionTitle}>{title}</Text>
      <Text style={styles.nutritionData}>
        {foodDetailData}
        {unit}
      </Text>
    </View>
  );
};

export default NutritionDetails;

const styles = StyleSheet.create({
  nutritionTitle: {
    fontWeight: 'bold',
  },
  nutritionData: {},
  nContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
