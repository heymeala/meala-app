import React from 'react';
import {Text, View} from 'react-native';
import FatSecretOverviewList from './OverviewList';
import LocalizationContext from '../../../../LanguageContext';

const FoodSuggestions = props => {
  const {foodsData, toggleList, setFoodDetailData} = props;
  const {t} = React.useContext(LocalizationContext);

  if (foodsData.foods) {
    if (foodsData.foods.total_results === '0') {
      return <Text>{t('AddMeal.foodDataBaseSearch.noResults')}</Text>;
    }
    if (foodsData.foods.food) {
      console.log(foodsData.foods.food);
      if (foodsData.foods.food.length > 0) {
        return foodsData.foods.food.map((data, i) => (
          <FatSecretOverviewList
            key={i}
            data={data}
            toggleList={toggleList}
            setFoodDetailData={setFoodDetailData}
          />
        ));
      }
    } else {
      return <Text>{t('AddMeal.foodDataBaseSearch.noResults')}</Text>;
    }
  } else {
    return <></>;
  }
};

export default FoodSuggestions;
