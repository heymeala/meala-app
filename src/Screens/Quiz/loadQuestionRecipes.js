import {shuffle} from '../../utils/shuffel';
import {getRecipeDetails} from '../../Common/fatsecret/fatsecretApi';
import {calculateFPE} from '../../utils/reducer';

function randomizer(value) {
  const ArraySmall = [0.2, 0.3, 0.5, 1.2, 1.4, 1.6, 2, 2.6, 3];
  const ArrayBig = [0, 0.6, 3, 4, 6];
  const ArrayBelowTwo = [1.7, 2.5, 4, 6, 0];
  const zero = [2, 3, 4];

  if (value > 8) {
    return shuffle(ArraySmall);
  } else if (value <= 8 && value > 2) {
    return shuffle(ArrayBig);
  } else if (value <= 2 && value >= 1.1) {
    return shuffle(ArrayBelowTwo);
  } else if (value < 1.1) {
    return shuffle(zero);
  }
}

function chooseData(value, serving) {
  if (serving !== 0) {
    return (value * serving).toFixed(0);
  } else {
    return value;
  }
}

export const quizServings = {
  carbohydrate: 'carbohydrate',
  calories: 'calories',
  fat: 'fat',
  protein: 'protein',
  fpe: 'fpe',
};


export function loadQuestionRecipes(fsRecipeIds, current, setRecipeDetails, setAnswers, setValidated) {
  if (fsRecipeIds.current !== null) {
    getRecipeDetails(fsRecipeIds[current]).then(recipe => {
      setRecipeDetails(recipe.recipe);
      console.log(recipe.recipe);
      const serving = recipe.recipe.serving_sizes.serving;

      const fpe = calculateFPE(serving.calories, serving.carbohydrate);

      const randomValueArrayCarbs = randomizer(serving.carbohydrate);
      const randomValueArrayCalories = randomizer(serving.calories);
      const randomValueArrayFat = randomizer(serving.fat);
      const randomValueArrayProtein = randomizer(serving.protein);
      const randomValueArrayFPE = randomizer(fpe);
      const array = [
        {
          id: 1,
          carbohydrate: chooseData(randomValueArrayCarbs[0], serving.carbohydrate),
          calories: chooseData(randomValueArrayCalories[0], serving.calories),
          fat: chooseData(randomValueArrayFat[0], serving.fat),
          protein: chooseData(randomValueArrayProtein[0], serving.protein),
          fpe: chooseData(randomValueArrayFPE[0], fpe),
          right: false,
        },
        {
          id: 2,
          carbohydrate: chooseData(randomValueArrayCarbs[1], serving.carbohydrate),
          calories: chooseData(randomValueArrayCalories[1], serving.calories),
          fat: chooseData(randomValueArrayFat[1], serving.fat),
          protein: chooseData(randomValueArrayProtein[1], serving.protein),
          fpe: chooseData(randomValueArrayFPE[1], fpe),
          right: false,
        },
        {
          id: 3,
          carbohydrate: parseInt(serving.carbohydrate),
          calories: parseInt(serving.calories),
          fat: parseInt(serving.fat),
          protein: parseInt(serving.protein),
          fpe: calculateFPE(serving.calories, serving.carbohydrate),
          right: true,
        },
      ];

      setAnswers(prev => shuffle(array));
      setValidated(false);
    });
  }
}
