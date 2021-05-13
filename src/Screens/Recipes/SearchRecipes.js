import React, {useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import {Button, Card, Icon, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {getRecipeDetails, searchRecipes} from '../../Common/fatsecret/fatsecretApi';
import GroupedMealItems from '../MealEntries/Common/GroupedMealItems';
import NutritionDetails from '../MealEntries/Common/NutritionDetails';
import {translate} from '../../Common/translate';
import RecipesList from '../RecipesList';

const SearchRecipes = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [translatedRecipe, setTranslatedRecipe] = useState(null);
  const [noRecipeResults, setNoRecipeResults] = useState(false);
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

  async function searchForRecipes() {
    const translatedSearchText = await translate(locale, props.search);
    searchRecipes(translatedSearchText, 15).then(r => {
      if (r.recipes) {
        setRecipes(r.recipes.recipe);
        console.log(r.recipes.total_results);
        setNoRecipeResults(true);
      } else {
        setRecipes(null);
        setNoRecipeResults(true);
      }
      console.log(r);
    });
  }

  function recipeDetails(id) {
    getRecipeDetails(id).then(d => {
      console.log(d);
      setRecipe(d);
    });
  }

  return (
    <View style={{padding: 4}}>
      {recipes ? (
        recipes.filter(data => data.recipe_image).map(item => <RecipesList item={item} />)
      ) : noRecipeResults ? (
        <View>
          <Text>Leider keine Mahlzeiten aus der Community gefunden.</Text>
        </View>
      ) : (
        <>
          <Text h3>
            Du hast noch kein Eintrag mit dem namen {props.search}, aber Du kannst nach ähnliches Mahlzeiten
            aus der Community suchen
          </Text>
          <Button title={'Suchen'} onPress={() => searchForRecipes()} />
        </>
      )}
    </View>
  );
};

export default SearchRecipes;

const useStyles = makeStyles(theme => ({}));
