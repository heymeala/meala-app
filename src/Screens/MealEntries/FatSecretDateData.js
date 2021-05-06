import React from 'react';
import {StyleSheet, View} from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import GroupedMealItems from './Common/GroupedMealItems';
import PoweredByFatSecret from '../../Common/fatsecret/PoweredByFatSecret';
import {calculateFPE, reduceNutritionValues} from '../../utils/reducer';

const FatSecretDateData = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const fatSecretData = props.fatSecretData;
  console.log(fatSecretData);
  const breakfast = fatSecretData.filter(data => data.meal === 'Breakfast');
  const lunch = fatSecretData.filter(data => data.meal === 'Lunch');
  const dinner = fatSecretData.filter(data => data.meal === 'Dinner');
  const snack = fatSecretData.filter(data => data.meal === 'Other');

  const nutritionTypes = {
    carbohydrate: 'carbohydrate',
    calories: 'calories',
    fat: 'fat',
    fiber: 'fiber',
    number_of_units: 'number_of_units',
    protein: 'protein',
    saturated_fat: 'saturated_fat',
    sodium: 'sodium',
    sugar: 'sugar',
  };

  const breakfastSumCarbohydrates = reduceNutritionValues(breakfast, nutritionTypes.carbohydrate);
  const lunchSumCarbohydrates = reduceNutritionValues(lunch, nutritionTypes.carbohydrate);
  const dinnerSumCarbohydrates = reduceNutritionValues(dinner, nutritionTypes.carbohydrate);
  const snackSumCarbohydrates = reduceNutritionValues(snack, nutritionTypes.carbohydrate);

  const breakfastCalories = reduceNutritionValues(breakfast, nutritionTypes.calories);
  const lunchCalories = reduceNutritionValues(lunch, nutritionTypes.calories);
  const dinnerCalories = reduceNutritionValues(dinner, nutritionTypes.calories);
  const snackCalories = reduceNutritionValues(snack, nutritionTypes.calories);

  /*  const breakfastProtein = reduceNutritionValues(breakfast, nutritionTypes.protein);
  const lunchProtein = reduceNutritionValues(lunch, nutritionTypes.protein);
  const dinnerProtein = reduceNutritionValues(dinner, nutritionTypes.protein);
  const snackProtein = reduceNutritionValues(snack, nutritionTypes.protein);

  const breakfastFat = reduceNutritionValues(breakfast, nutritionTypes.fat);
  const lunchFat = reduceNutritionValues(lunch, nutritionTypes.fat);
  const dinnerFat = reduceNutritionValues(dinner, nutritionTypes.fat);
  const snackFat = reduceNutritionValues(snack, nutritionTypes.fat);*/

  const breakfastFPE = calculateFPE(breakfastCalories, breakfastSumCarbohydrates);
  const lunchFPE = calculateFPE(lunchCalories, lunchSumCarbohydrates);
  const dinnerFPE = calculateFPE(dinnerCalories, dinnerSumCarbohydrates);
  const snackFPE = calculateFPE(snackCalories, snackSumCarbohydrates);

  return (
    <View style={styles.centeredView}>
      <PoweredByFatSecret />
      {breakfast.length > 0 && (
        <GroupedMealItems
          data={breakfast}
          title={t('Entries.breakfast')}
          carbohydrates={breakfastSumCarbohydrates}
          fpe={breakfastFPE}
          icon={'breakfast'}
        />
      )}
      {lunch.length > 0 && (
        <GroupedMealItems
          data={lunch}
          title={t('Entries.lunch')}
          carbohydrates={lunchSumCarbohydrates}
          fpe={lunchFPE}
          icon={'pan_cooking'}
          iconSize={22}
        />
      )}
      {dinner.length > 0 && (
        <GroupedMealItems
          data={dinner}
          title={t('Entries.dinner')}
          carbohydrates={dinnerSumCarbohydrates}
          fpe={dinnerFPE}
          icon={'woman_cooking'}
          iconSize={30}
        />
      )}
      {snack.length > 0 && (
        <GroupedMealItems
          data={snack}
          title={t('Entries.Other')}
          carbohydrates={snackSumCarbohydrates}
          fpe={snackFPE}
          icon={'cup_cake'}
        />
      )}
    </View>
  );
};

export default FatSecretDateData;
const styles = StyleSheet.create({
  centeredView: {
    //   flex: 1,
    // justifyContent: 'center',
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
