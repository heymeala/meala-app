import React from 'react';
import {View} from 'react-native';
import {Image, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const RecipeDetails = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {recipe} = props;
  return (
    <View style={styles.root}>
      <Image style={styles.image} source={{uri: recipe.recipe_images.recipe_image}} />
      <Text h2>{recipe.recipe_name}</Text>

      {recipe.ingredients &&
        recipe.ingredients.ingredient.map((ingre, i) => (
          <View style={styles.desc} key={i}>
            <Text>{ingre.food_name}</Text>
            <Text>{ingre.ingredient_description}</Text>
          </View>
        ))}
      <Text h2>Beschreibung</Text>

      {recipe.directions &&
        recipe.directions.direction.map((desc, i) => (
          <View style={styles.desc} key={i}>
            <Text>{desc.direction_description}</Text>
          </View>
        ))}
    </View>
  );
};

export default RecipeDetails;

const useStyles = makeStyles(theme => ({
  root: {minHeight: 700},
  image: {width: '100%', height: 250, borderRadius: 10, marginBottom: theme.spacing.L},
  desc: {paddingVertical: theme.spacing.S},
}));
