import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, makeStyles, Text } from 'react-native-elements';
import RecipeDetailModal from '../Recipes/RecipeDetailModal';
import LocalizationContext from '../../../LanguageContext';
import RecipeAnsweredCardItem from './RecipeAnsweredCardItem';
import LottieView from 'lottie-react-native';
import winner from '../../assets/animations/quiz/winner.json';
import Sound from 'react-native-sound';
import analytics from '@react-native-firebase/analytics';
import { calculateScore } from './calculateScore';

var scoreSound = new Sound('score.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log(
    'duration in seconds: ' +
      scoreSound.getDuration() +
      'number of channels: ' +
      scoreSound.getNumberOfChannels(),
  );
});

const Finish = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { answeredQuestions, setFinish, quizType } = props;
  const [open, setOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const rightAnswers = answeredQuestions.filter(item => item.userAnswer);
  const numberOfRightAnswers = rightAnswers.length;
  const tries = answeredQuestions.map(data => data.tries);
  const score = useMemo(() => calculateScore(tries), []);

  useEffect(() => {
    scoreSound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    analytics().logEvent('quiz_result', {
      score: score,
      type: quizType,
    });
  }, []);

  return (
    <View style={styles.container}>
      <RecipeDetailModal recipe={recipe} open={open} setOpen={setOpen} />
      <Text accessibilityRole={'header'} h1 style={styles.text}>
        {score} {t('Quiz.score')}
      </Text>
      <LottieView style={{ width: '100%' }} source={winner} loop={false} autoPlay />
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
  container: { padding: 0, margin: 0 },
  text: { textAlign: 'center', margin: 12 },
  button: { backgroundColor: theme.colors.primary },
  buttonText: { color: theme.colors.white },
}));
