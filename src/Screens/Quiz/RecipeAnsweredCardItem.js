import React from 'react';
import {Button, Card, Icon, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {View} from 'react-native';

const RecipeAnsweredCardItem = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {item, setOpen, setRecipe, userAnswer, tries} = props;
  const background = tries === 1 ? 'rgba(140,205,56,0.79)' : 'rgb(172,57,57)';

  function openModal(id) {
    setOpen(true);
    setRecipe(id);
  }

  return (
    <View style={{backgroundColor: background, paddingVertical: 12, marginVertical: 4}}>
      <Card containerStyle={{...styles.container}} wrapperStyle={styles.wrapper}>
        <View style={styles.iconLabel}>
          {/*
          <Icon name={userAnswer ? 'check' : 'cancel'} color={background} />
*/}
          <Text>{t('Quiz.tries_result', {tries: tries})}</Text>
        </View>
        <Card.Title h2>{item.recipe_name}</Card.Title>
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
        <View style={{paddingHorizontal: 30}}>
          <Button title={t('Recipes.show_recipe')} onPress={() => openModal(item)} />
        </View>
      </Card>
    </View>
  );
};

export default RecipeAnsweredCardItem;

const useStyles = makeStyles(theme => ({
  container: {borderRadius: 5, borderWidth: 1, padding: 0, margin: 8},
  wrapper: {backgroundColor: 'white', padding: 0, marginVertical: 8},
  iconLabel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
}));
