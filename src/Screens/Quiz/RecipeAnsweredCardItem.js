import React from 'react';
import {Button, Card, makeStyles, Text} from 'react-native-elements';
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
    <Card containerStyle={{borderRadius: 10, backgroundColor: background}}>
      <Card.Title>{item.recipe_name}</Card.Title>
      <Card.Divider />
      {item.recipe_images ? <Card.Image source={{uri: item.recipe_images.recipe_image}} /> : null}
      <Text style={{margin: 10}}>{item.recipe_description}</Text>

      <>
        <Card.Divider />
        {/*
        <NutritionDetails data={item.recipe_nutrition} />
*/}
      </>

      <Button title="Rezept anzeigen" onPress={() => openModal(item)} />
    </Card>
  );
};

export default RecipeAnsweredCardItem;

const useStyles = makeStyles(theme => ({}));
