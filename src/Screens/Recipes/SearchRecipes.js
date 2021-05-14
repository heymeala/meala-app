import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {getRecipeDetails, searchRecipes} from '../../Common/fatsecret/fatsecretApi';
import {translate} from '../../Common/translate';
import RecipesList from './RecipesList';
import RecipeDetailModal from './RecipeDetailModal';
import PoweredByFatSecret from '../../Common/fatsecret/PoweredByFatSecret';

const SearchRecipes = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const [translatedRecipe, setTranslatedRecipe] = useState(null);
  const [noRecipeResults, setNoRecipeResults] = useState(false);
  const [open, setOpen] = useState(false);

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
    const translatedSearchText = await translate(locale, props.search, 'de', 'en');
    searchRecipes(translatedSearchText, 15).then(r => {
      if (r.recipes) {
        setRecipes(r.recipes.recipe);
        console.log(r.recipes);
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
      setRecipe(d.recipe);
      setOpen(true);
    });
  }

  return (
    <>
      <RecipeDetailModal recipe={recipe} open={open} setOpen={setOpen} />
      <View style={{padding: 4}}>
        {recipes ? (
          <>
            {recipes
              .filter(data => data.recipe_image)
              .map(item => (
                <View key={item.recipe_id}>
                  <RecipesList item={item} recipeDetails={recipeDetails} />
                </View>
              ))}
            <PoweredByFatSecret />

          </>
        ) : noRecipeResults ? (
          <View style={styles.container}>
            <Text h3>Leider keine Mahlzeiten aus der Community gefunden.</Text>
          </View>
        ) : (
          <View style={styles.container}>
            <Text h3 style={styles.text}>
              Du hast noch keinen Eintrag mit dem Namen{' '}
              <Text h3 style={styles.bold}>
                {props.search}
              </Text>
              , aber Du kannst nach ähnliches Mahlzeiten aus der Community suchen
            </Text>
            <Button title={'Suchen'} onPress={() => searchForRecipes()} />
          </View>
        )}
      </View>
    </>
  );
};

export default SearchRecipes;

const useStyles = makeStyles(theme => ({
  container: {padding: theme.spacing.M},
  text: {paddingVertical: theme.spacing.M},
  bold: {fontWeight: 'bold'},
}));
