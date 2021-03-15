import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import GroupedMealItems from './Common/GroupedMealItems';
import openLink from "../../Common/InAppBrowser";
import {Image} from "react-native-elements";
import PoweredByFatSecret from "../../Common/fatsecret/PoweredByFatSecret";
import {calculateFPE, reduceCalories, reduceCarbohydrates} from "../../utils/reducer";

const FatSecretDateData = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const fatSecretData = props.fatSecretData;

  const breakfast = fatSecretData.filter((data) => data.meal === 'Breakfast');
  const lunch = fatSecretData.filter((data) => data.meal === 'Lunch');
  const dinner = fatSecretData.filter((data) => data.meal === 'Dinner');
  const snack = fatSecretData.filter((data) => data.meal === 'Other');

  const breakfastSumCarbohydrates = reduceCarbohydrates(breakfast);
  const lunchSumCarbohydrates = reduceCarbohydrates(lunch);
  const dinnerSumCarbohydrates = reduceCarbohydrates(dinner);
  const snackSumCarbohydrates = reduceCarbohydrates(snack);

  const breakfastCalories = reduceCalories(breakfast);
  const lunchCalories = reduceCalories(lunch);
  const dinnerCalories = reduceCalories(dinner);
  const snackCalories = reduceCalories(snack);

  const breakfastFPE = calculateFPE(breakfastCalories,breakfastSumCarbohydrates)
  const lunchFPE = calculateFPE(lunchCalories,lunchSumCarbohydrates)
  const dinnerFPE = calculateFPE(dinnerCalories,dinnerSumCarbohydrates)
  const snackFPE = calculateFPE(snackCalories,snackSumCarbohydrates)



  return (
    <View style={styles.centeredView}>
   <PoweredByFatSecret/>
      {breakfast.length > 0 && (
        <GroupedMealItems
          data={breakfast}
          title={t('Entries.breakfast')}
          carbohydrates={breakfastSumCarbohydrates}
          fpe={breakfastFPE}
        />
      )}
      {lunch.length > 0 && (
        <GroupedMealItems
          data={lunch}
          title={t('Entries.lunch')}
          carbohydrates={lunchSumCarbohydrates}
          fpe={lunchFPE}
        />
      )}
      {dinner.length > 0 && (
        <GroupedMealItems
          data={dinner}
          title={t('Entries.dinner')}
          carbohydrates={dinnerSumCarbohydrates}
          fpe={dinnerFPE}
        />
      )}
      {snack.length > 0 && (
        <GroupedMealItems
          data={snack}
          title={t('Entries.Other')}
          carbohydrates={snackSumCarbohydrates}
          fpe={snackFPE}
        />
      )}
    </View>
  );
};

export default FatSecretDateData;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },

  openButton: {
    backgroundColor: '#ffe109',
    borderRadius: 20,
    padding: 8,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  nutritionTitle: {
    fontWeight: 'bold',
  },
  nutritionData: {},
  nContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
