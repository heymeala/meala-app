import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const QuizDetailInfos = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { recipeDetails } = props;
  return (
    <>
      <View style={styles.verticalSpacing}>
        <Text h2>{t('Quiz.recipe_description')}</Text>
        <Text h3>{recipeDetails.recipe_description}</Text>
      </View>

      <View style={styles.verticalSpacing}>
        <Text accessibilityRole={'header'} h2>
          {t('Recipes.ingredients')}
        </Text>
        <Text>{t('Quiz.total_servings', { total: recipeDetails.number_of_servings })}</Text>
      </View>
      {recipeDetails.ingredients &&
        recipeDetails.ingredients.ingredient.map((ingre, i) => (
          <View style={styles.desc} key={i}>
            <Text h4>- {ingre.ingredient_description}</Text>
          </View>
        ))}
    </>
  );
};

export default QuizDetailInfos;

const useStyles = makeStyles(theme => ({
  verticalSpacing: { paddingVertical: theme.spacing.M },
  desc: { paddingVertical: theme.spacing.S },
  descContainer: { display: 'flex', flexDirection: 'row', paddingRight: 30 },
}));
