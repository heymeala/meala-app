import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Image, makeStyles, Text} from 'react-native-elements';
import {getRecipeDetails} from '../../Common/fatsecret/fatsecretApi';
import LocalizationContext from '../../../LanguageContext';
import {shuffle} from '../../utils/shuffel';

const FatSecretQuiz = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [validated, setValidated] = useState(false);
  function randomValues(value) {
    const threshold = 3;
    let aboveThreshold = false;
    let rnd = 3;

    do {
      rnd = (Math.random() * value + value / 2).toFixed(2);
      aboveThreshold = Math.abs(rnd - value) > threshold;
      console.log(aboveThreshold);
      console.log(rnd);
    } while (aboveThreshold === false);

    return rnd;
  }

  const fatSecretRecipes = ['8866808', '8307492'];

  useEffect(() => {
    const randomRecipe = fatSecretRecipes[Math.floor(Math.random() * fatSecretRecipes.length)];
    getRecipeDetails(randomRecipe).then(recipe => {
      setRecipeDetails(recipe.recipe);

      const array = [
        {id: 1, value: randomValues(recipe.recipe.serving_sizes.serving.carbohydrate), right: false},
        {id: 2, value: recipe.recipe.serving_sizes.serving.carbohydrate, right: true},
        {id: 3, value: randomValues(recipe.recipe.serving_sizes.serving.carbohydrate), right: false},
        {id: 4, value: randomValues(recipe.recipe.serving_sizes.serving.carbohydrate), right: false},
      ];
      setAnswers(prev => shuffle(array));
    });
  }, []);

  function validate(answer) {
    console.log(answer);
    setValidated(true);
  }

  function color(answer) {
    return validated
      ? answer
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'red'}
      : {backgroundColor: 'yellow'};
  }

  return recipeDetails !== null ? (
    <View>
      <Image style={styles.image} source={{uri: recipeDetails.recipe_images.recipe_image}} />
      <Text h2>
        <Text h2>{recipeDetails.serving_sizes.serving.serving_size}</Text> {recipeDetails.recipe_name}
      </Text>
      {recipeDetails.serving_sizes && (
        <View style={styles.desc}>
          {answers &&
            answers.map((answer, i) => (
              <Button
                buttonStyle={color(answer.right)}
                key={i}
                style={styles.answerButton}
                onPress={() => validate(answer.right)}
                title={answer.value + 'g'}
              />
            ))}
        </View>
      )}
      <Text h2>{t('Recipes.ingredients')}</Text>
      <Text>Portionen: {recipeDetails.number_of_servings}</Text>

      {recipeDetails.ingredients &&
        recipeDetails.ingredients.ingredient.map((ingre, i) => (
          <View style={styles.desc} key={i}>
            <Text>{ingre.food_name}</Text>
            <Text>
              {ingre.number_of_units} {ingre.measurement_description}
            </Text>
          </View>
        ))}
      <Text h2>{t('Recipes.directions')}</Text>

      {recipeDetails.directions &&
        recipeDetails.directions.direction.map((desc, i) => (
          <View style={styles.desc} key={i}>
            <Text>{desc.direction_description}</Text>
          </View>
        ))}
    </View>
  ) : null;
};

export default FatSecretQuiz;

const useStyles = makeStyles(theme => ({
  root: {minHeight: 700},
  image: {width: '100%', height: 250, borderRadius: 10, marginBottom: theme.spacing.L},
  desc: {paddingVertical: theme.spacing.S},
  answerButton: {padding: theme.spacing.S},
}));
