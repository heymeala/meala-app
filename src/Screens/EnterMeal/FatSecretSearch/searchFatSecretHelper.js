import { getFood } from '../../../Common/fatsecret/fatsecretApi';
import React from 'react';

function checkIfExists(data, t) {
  if (data) {
    return data;
  } else {
    return t('AddMeal.nutritionData.nodata');
  }
}

export async function searchFatSecret(userSearchText, toggleList, t, setFoodDetailData) {
  const data = await getFood(userSearchText);
  console.log(data);
  const servings = data.food.servings;

  const newArray = {
    food_name: data.food.food_name,
    food_id: data.food.food_id,
    servings: Array.isArray(servings.serving)
      ? servings.serving.map(servings => {
          return {
            serving: {
              calcium: checkIfExists(servings.calcium, t),
              serving_description: checkIfExists(servings.serving_description, t),
              carbohydrate: checkIfExists(servings.carbohydrate, t),
              cholesterol: checkIfExists(servings.cholesterol, t),
              fat: checkIfExists(servings.fat, t),
              fiber: checkIfExists(servings.fiber, t),
              iron: checkIfExists(servings.iron, t),
              measurement_description: checkIfExists(servings.measurement_description, t),
              metric_serving_amount: checkIfExists(servings.metric_serving_amount, t),
              metric_serving_unit: checkIfExists(servings.metric_serving_unit, t),
              number_of_units: checkIfExists(servings.number_of_units, t),
              protein: checkIfExists(servings.protein, t),
              sugar: checkIfExists(servings.sugar, t),
            },
          };
        })
      : data.food.servings.serving
      ? [
          {
            serving: {
              calcium: checkIfExists(data.food.servings.serving.calcium, t),
              serving_description: checkIfExists(data.food.servings.serving.serving_description, t),
              carbohydrate: checkIfExists(data.food.servings.serving.carbohydrate, t),
              cholesterol: checkIfExists(data.food.servings.serving.cholesterol, t),
              fat: checkIfExists(data.food.servings.serving.fat, t),
              fiber: checkIfExists(data.food.servings.serving.fiber, t),
              iron: checkIfExists(data.food.servings.serving.iron, t),
              measurement_description: checkIfExists(data.food.servings.serving.measurement_description, t),
              metric_serving_amount: checkIfExists(data.food.servings.serving.metric_serving_amount, t),
              metric_serving_unit: checkIfExists(data.food.servings.serving.metric_serving_unit, t),
              number_of_units: checkIfExists(data.food.servings.serving.number_of_units, t),
              protein: checkIfExists(data.food.servings.serving.protein, t),
              sugar: checkIfExists(data.food.servings.serving.sugar, t),
            },
          },
        ]
      : {
          serving: {
            calcium: t('AddMeal.nutritionData.nodata'),
            serving_description: t('AddMeal.nutritionData.nodata'),
            carbohydrate: t('AddMeal.nutritionData.nodata'),
            cholesterol: t('AddMeal.nutritionData.nodata'),
            fat: t('AddMeal.nutritionData.nodata'),
            fiber: t('AddMeal.nutritionData.nodata'),
            iron: t('AddMeal.nutritionData.nodata'),
            measurement_description: t('AddMeal.nutritionData.nodata'),
            metric_serving_amount: t('AddMeal.nutritionData.nodata'),
            metric_serving_unit: t('AddMeal.nutritionData.nodata'),
            number_of_units: t('AddMeal.nutritionData.nodata'),
            protein: t('AddMeal.nutritionData.nodata'),
            sugar: t('AddMeal.nutritionData.nodata'),
          },
        },
  };
  setFoodDetailData(prevState => newArray);
  toggleList();
}
