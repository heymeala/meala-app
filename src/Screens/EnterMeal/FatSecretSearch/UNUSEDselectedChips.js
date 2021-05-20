//todo: unused?
import { getFood, searchFood } from '../../../Common/fatsecret/fatsecretApi';

function activateChip(id, name) {
  searchFood(name)
    .then(foodList => {
      getFood(foodList.foods.food[0].food_id).then(foodIdData => {
        const testArray =
          foodIdData.food.servings.serving.length > 0
            ? foodIdData.food.servings.serving[0].carbohydrate
            : foodIdData.food.servings.serving
            ? foodIdData.food.servings.serving.carbohydrate
            : 'no data';

        setChipsArray(prevState =>
          prevState.map(data => {
            const foodDesc = foodIdData.food.food_name + ' ' + testArray;
            const active = data.id === id ? !data.active : data.active;
            const nutritionText = data.id === id ? foodDesc : data.nutritionData;
            return {
              id: data.id,
              name: data.name,
              active: active,
              nutritionData: nutritionText,
            };
          }),
        );
      });
    })
    .catch(err => console.log('no data' + err));
}
