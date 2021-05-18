import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, makeStyles, Text} from 'react-native-elements';
import RecipeDetailModal from '../Recipes/RecipeDetailModal';
import LocalizationContext from '../../../LanguageContext';
import RecipeAnsweredCardItem from './RecipeAnsweredCardItem';
import LottieView from 'lottie-react-native';
import right from '../../assets/animations/quiz/confetti.json';
import wrong from '../../assets/animations/quiz/wrong-answer.json';
import winner from '../../assets/animations/quiz/winner.json';
const Finish = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {answeredQuestions, setFinish} = props;
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const rightAnswers = answeredQuestions.filter(item => item.userAnswer);
  const numberOfRightAnswers = rightAnswers.length;
  const score = answeredQuestions
    .map(data => {
      if (data.tries === 1) {
        return 10;
      } else if (data.tries === 2) {
        return 5;
      } else if (data.tries === 3) {
        return 1;
      }
    })
    .reduce((a, b) => a + b, 0);

  return (
    <View style={styles.container}>
      <RecipeDetailModal recipe={recipe} open={open} setOpen={setOpen} />
      <Text h1 style={styles.text}>
        {score} {t('Quiz.score')}
      </Text>
      <LottieView style={{width: '100%'}} source={winner} loop={false} autoPlay />
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
        <Text h3 style={styles.text}>
          {t('Quiz.done')}
        </Text>
        <Button
          buttonStyle={styles.button}
          onPress={() => {
            props.reset();
          }}
          title={t('General.back')}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default Finish;

const useStyles = makeStyles(theme => ({
  container: {padding: 0, margin: 0},
  text: {textAlign: 'center', margin: 12},
  button: {backgroundColor: theme.colors.primary},
  buttonText: {color: theme.colors.white},
}));
