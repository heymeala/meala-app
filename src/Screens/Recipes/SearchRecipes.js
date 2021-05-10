import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {getRecipeDetails, searchRecipes} from '../../Common/fatsecret/fatsecretApi';

const SearchRecipes = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);

  /*
recipe_description: "A great pasta substitute."
  recipe_id: "332"
  recipe_image: "https://m.ftscrt.com/static/recipe/a2e0b074-db30-4ac1-9c5f-a816d7a21b24.jpg"
  recipe_name: "Zucchini Noodles"
  recipe_nutrition:
       calories: "80"
       carbohydrate: "4.32"
        fat: "6.98"
        protein: "1.36"
  recipe_url: "https://www.fatsecret.com/recipes/zucchini-noodles/Default.aspx"
  */

  function searchForRecipes() {
    searchRecipes(props.search, 5).then(r => {
      if (r.recipes) {
        setRecipes(r.recipes.recipe);
      } else {
        setRecipes(null);
      }
      console.log(r);
    });
  }

  useEffect(() => {
    /*    getRecipeDetails('73894').then(d => {
      console.log(d);
      setRecipe(d);
    });*/
  }, []);

  return (
    <View>
      <Button title={'Search for Community meals'} onPress={() => searchForRecipes()} />

      {recipes ? recipes.map(item => <Text key={item.recipe_id}>{item.recipe_name}</Text>) : null}
    </View>
  );
};

export default SearchRecipes;

const useStyles = makeStyles(theme => ({}));
