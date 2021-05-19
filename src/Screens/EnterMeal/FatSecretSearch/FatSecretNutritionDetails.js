import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import NutritionDetails from '../EnterMealComponents/nutritionDetails';
import LocalizationContext from '../../../../LanguageContext';

const FatSecretNutritionDetails = props => {
  const {t} = React.useContext(LocalizationContext);
  const {foodDetailData, serving} = props;
  const windowWidth = Dimensions.get('window').width;

  return (
    <View accessible={true} style={{width: windowWidth - 150}}>
      <Text style={{paddingBottom: 8}}>
        {foodDetailData.food_name} -{foodDetailData.servings[serving].serving.serving_description}
      </Text>
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.metric_serving_amount}
        unit={foodDetailData.servings[serving].serving.metric_serving_unit}
        title={t('AddMeal.nutritionData.serving')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.carbohydrate}
        title={t('AddMeal.nutritionData.carbohydrate')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.fat}
        title={t('AddMeal.nutritionData.fat')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.protein}
        title={t('AddMeal.nutritionData.protein')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.sugar}
        title={t('AddMeal.nutritionData.sugar')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.calcium}
        title={t('AddMeal.nutritionData.calcium')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.cholesterol}
        title={t('AddMeal.nutritionData.cholesterol')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.fiber}
        title={t('AddMeal.nutritionData.fiber')}
      />
      <NutritionDetails
        foodDetailData={foodDetailData.servings[serving].serving.iron}
        title={t('AddMeal.nutritionData.iron')}
      />
    </View>
  );
};

export default FatSecretNutritionDetails;
