import React from 'react';
import {Button, Card, makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const RecipeAnsweredCardItem = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {item, setOpen, setRecipe, userAnswer} = props;
  const background = userAnswer ? 'rgba(145,255,0,0.64)' : 'rgba(255,23,23,0.57)';

  function openModal(id) {
    setOpen(true);
    setRecipe(id);
  }

  return (
    <Card containerStyle={{...styles.container, backgroundColor: background}} wrapperStyle={styles.wrapper}>
      <Card.Title>
        {userAnswer ? t('Quiz.right') : t('Quiz.wrong')}
        {' - '} {item.recipe_name}
      </Card.Title>
      <Card.Divider />
      {item.recipe_images ? (
        <Card.Image
          source={{
            uri: Array.isArray(item.recipe_images.recipe_image)
              ? item.recipe_images.recipe_image[0]
              : item.recipe_images.recipe_image,
          }}
        />
      ) : null}
      {/*
      <Text style={{margin: 10}}>{item.recipe_description}</Text>
*/}
      <>
        <Card.Divider />

        {/*      <NutritionDetailItem
          data={item.serving_sizes.serving.carbohydrate}
          text={t('AddMeal.nutritionData.carbohydrate')}
        />
        <NutritionDetailItem data={item.serving_sizes.serving.fat} text={t('AddMeal.nutritionData.fat')} />
        <NutritionDetailItem
          data={item.serving_sizes.serving.protein}
          text={t('AddMeal.nutritionData.protein')}
        />
        <NutritionDetailItem
          data={item.serving_sizes.serving.calories}
          text={t('AddMeal.nutritionData.calories')}
        />*/}
      </>

      <Button title={t('Recipes.show_recipe')} onPress={() => openModal(item)} />
    </Card>
  );
};

export default RecipeAnsweredCardItem;

const useStyles = makeStyles(theme => ({
  container: {borderRadius: 10, borderWidth: 1, padding: 8, margin: 12},
  wrapper: {backgroundColor: 'white', padding: 5},
}));
