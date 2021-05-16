import {shuffle} from '../../utils/shuffel';
import {getRecipeDetails} from '../../Common/fatsecret/fatsecretApi';

function randomizer(value) {
  const ArraySmall = [0.2, 0.3, 0.5, 1.2, 1.4, 1.6, 2, 2.6, 3];
  const ArrayBig = [0, 0.6, 3, 4, 6, 7];
  const ArrayBelowTwo = [1.7, 2.5, 3.6, 4, 6, 12];

  if (value > 8) {
    const shuffledArray = shuffle(ArraySmall);
    return shuffledArray.slice(0, 3);
  } else if (value <= 8 && value > 2) {
    const shuffledArray = shuffle(ArrayBig);
    return shuffledArray.slice(0, 3);
  } else if (value <= 2) {
    const shuffledArray = shuffle(ArrayBelowTwo);
    return shuffledArray.slice(0, 3);
  }
}

export function loadQuestionRecipes(fsRecipeIds, current, setRecipeDetails, setAnswers, setValidated) {
  if (fsRecipeIds.current !== null) {
    getRecipeDetails(fsRecipeIds[current]).then(recipe => {
      setRecipeDetails(recipe.recipe);
      console.log(recipe.recipe);
      const randomValueArray = randomizer(recipe.recipe.serving_sizes.serving.carbohydrate);
      const array = [
        {
          id: 1,
          value: (randomValueArray[0] * recipe.recipe.serving_sizes.serving.carbohydrate).toFixed(0),
          right: false,
        },
        {
          id: 2,
          value: (randomValueArray[1] * recipe.recipe.serving_sizes.serving.carbohydrate).toFixed(0),
          right: false,
        },
        {
          id: 3,
          value: (randomValueArray[2] * recipe.recipe.serving_sizes.serving.carbohydrate).toFixed(0),
          right: false,
        },
        {id: 4, value: parseInt(recipe.recipe.serving_sizes.serving.carbohydrate), right: true},
      ];
      setAnswers(prev => shuffle(array));
      setValidated(false);
    });
  }
}
