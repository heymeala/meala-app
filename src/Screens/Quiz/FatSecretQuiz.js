import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, Image, makeStyles, Text} from 'react-native-elements';
import {getRecipeDetails} from '../../Common/fatsecret/fatsecretApi';
import LocalizationContext from '../../../LanguageContext';
import {shuffle} from '../../utils/shuffel';
import {serving} from '../../utils/specialTranslations';

const FatSecretQuiz = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {fsRecipeIds} = props;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [current, setCurrent] = useState(0);

  function randomValues(value) {
    const threshold = value > 5 ? 3 : 0.4;
    let aboveThreshold = false;
    let rnd;

    do {
      rnd = (Math.random() * value + value / 2).toFixed(2);
      aboveThreshold = Math.abs(rnd - value) > threshold;
    } while (aboveThreshold === false);

    return rnd;
  }

  useEffect(() => {
    load();
  }, [current]);

  function validate(answer) {
    setValidated(true);
    setTimeout(() => {
      if (current < fsRecipeIds.length - 1) {
        setCurrent(prevState => {
          return prevState + 1;
        });
      }
    }, 1500);
  }

  function randomizer(value) {
    const ArraySmall = [0.2, 0.3, 0.5, 1.2, 1.4, 1.6, 2, 2.6, 3];
    const ArrayBig = [0, 0.7, 3, 4, 6, 7];


    if (value > 8) {
      const shuffledArray = shuffle(ArraySmall);
      return shuffledArray.slice(0, 3);
    } else if (value <= 8) {
      const shuffledArray = shuffle(ArrayBig);
      return shuffledArray.slice(0, 3);
    }
  }

  function load() {
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

  function color(answer) {
    return validated
      ? answer
        ? {backgroundColor: 'green'}
        : {backgroundColor: 'red'}
      : {backgroundColor: 'yellow'};
  }

  return recipeDetails !== null ? (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: Array.isArray(recipeDetails.recipe_images.recipe_image)
            ? recipeDetails.recipe_images.recipe_image[0]
            : recipeDetails.recipe_images.recipe_image,
        }}
      />
      <View>
        <Text h2>{recipeDetails.recipe_name}</Text>
        <Text>{serving(locale, recipeDetails.serving_sizes.serving.serving_size)}</Text>
      </View>
      {recipeDetails.serving_sizes && (
        <View style={styles.desc}>
          {answers &&
            answers.map((answer, i) => (
              <Button
                buttonStyle={color(answer.right)}
                key={i}
                style={styles.answerButton}
                onPress={() => validate(answer.right)}
                title={
                  <>
                    <Text h2>{answer.value}</Text>
                    <Text>g</Text>
                  </>
                }
              />
            ))}
        </View>
      )}
      <View style={styles.verticalSpacing}>
        <Text h2>{t('Recipes.ingredients')}</Text>
        <Text>für insgesamt {recipeDetails.number_of_servings} Portionen</Text>
      </View>
      {recipeDetails.ingredients &&
        recipeDetails.ingredients.ingredient.map((ingre, i) => (
          <View style={styles.desc} key={i}>
            <Text h4>- {ingre.ingredient_description}</Text>
          </View>
        ))}
      <Text h2 style={styles.verticalSpacing}>
        {t('Recipes.directions')}
      </Text>

      {recipeDetails.directions && Array.isArray(recipeDetails.directions.direction)
        ? recipeDetails.directions.direction.map((desc, i) => (
            <View style={styles.desc} key={i}>
              <View style={styles.descContainer}>
                <View>
                  <Text>{desc.direction_number}. </Text>
                </View>
                <View>
                  <Text>{desc.direction_description}</Text>
                </View>
              </View>
            </View>
          ))
        : null}
    </View>
  ) : null;
};

export default FatSecretQuiz;

const useStyles = makeStyles(theme => ({
  root: {minHeight: 700},
  container: {padding: theme.spacing.M},
  image: {width: '100%', height: 250, borderRadius: 5, marginBottom: theme.spacing.L},
  desc: {paddingVertical: theme.spacing.S},
  descContainer: {display: 'flex', flexDirection: 'row', paddingRight: 30},
  answerButton: {padding: theme.spacing.S},
  verticalSpacing: {paddingVertical: theme.spacing.M},
}));
