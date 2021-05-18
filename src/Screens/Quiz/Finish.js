import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, makeStyles, Text} from 'react-native-elements';
import RecipeDetailModal from '../Recipes/RecipeDetailModal';
import LocalizationContext from '../../../LanguageContext';
import RecipeAnsweredCardItem from './RecipeAnsweredCardItem';

const Finish = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {answeredQuestions, setFinish} = props;
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const rightAnswers = answeredQuestions.filter(item => item.userAnswer);
  const numberOfRightAnswers = rightAnswers.length;
  return (
    <View style={styles.container}>
      <RecipeDetailModal recipe={recipe} open={open} setOpen={setOpen} />
      <Text h3 style={styles.text}>
        {t('Quiz.results', {count: numberOfRightAnswers})}
      </Text>
      {answeredQuestions.map((item, i) => (
        <View key={i}>
          <RecipeAnsweredCardItem
            userAnswer={item.userAnswer}
            item={item.recipeDetails}
            setOpen={setOpen}
            setRecipe={setRecipe}
            tries={item.tries}
          />
        </View>
      ))}
      <View style={styles.text}>
        <Text h3>{t('Quiz.done')}</Text>
        {/*        <Button
          onPress={() => {
            setFinish(false);
          }}
          title={'Again'}
        />*/}
      </View>
    </View>
  );
};

export default Finish;

const useStyles = makeStyles(theme => ({
  container: {padding: 0, margin: 0},
  text: {textAlign: 'center', margin: 12},
}));
