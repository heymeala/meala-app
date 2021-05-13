import React from 'react';
import {View} from 'react-native';
import {Button, Card, makeStyles, Text} from 'react-native-elements';
import NutritionDetails from '../MealEntries/Common/NutritionDetails';
import LocalizationContext from '../../../LanguageContext';

const RecipesList = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {item, recipeDetails} = props;
  return (
    <Card containerStyle={{borderRadius: 10}}>
      <Card.Title>{item.recipe_name}</Card.Title>
      <Card.Divider />
      {item.recipe_image ? <Card.Image source={{uri: item.recipe_image}} /> : null}
      <Text style={{margin: 10}}>{item.recipe_description}</Text>

      <>
        <Card.Divider />
        <NutritionDetails data={item.recipe_nutrition} />
      </>

      <Button title="Rezept anzeigen" onPress={() => recipeDetails(item.recipe_id)} />
    </Card>
  );
};

export default RecipesList;

const useStyles = makeStyles(theme => ({}));
