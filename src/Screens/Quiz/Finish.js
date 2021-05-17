import React, {useState} from 'react';
import {View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import RecipeDetailModal from '../Recipes/RecipeDetailModal';
import LocalizationContext from '../../../LanguageContext';
import RecipeAnsweredCardItem from './RecipeAnsweredCardItem';

const Finish = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {answeredQuestions} = props;
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const rightAnswers = answeredQuestions.filter(item => item.userAnswer);
  const numberOfRightAnswers = rightAnswers.length;
  return (
    <View style={styles.container}>
      <RecipeDetailModal recipe={recipe} open={open} setOpen={setOpen} />
      <Text h1 style={styles.text}>
        {numberOfRightAnswers} {t('Quiz.results')}
      </Text>
      {answeredQuestions.map((item, i) => (
        <View key={i}>
          <RecipeAnsweredCardItem
            userAnswer={item.userAnswer}
            item={item.recipeDetails}
            setOpen={setOpen}
            setRecipe={setRecipe}
          />
        </View>
      ))}
      <View style={styles.container}>
        <Text h3>{t('Quiz.done')}</Text>
      </View>
    </View>
  );
};

export default Finish;

const useStyles = makeStyles(theme => ({
  container: {padding: theme.spacing.S},
  text: {textAlign: 'center'},
}));
