import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {serving} from '../../utils/specialTranslations';
import QuizDetailInfos from './QuizDetailInfos';
import AnswerButtons from './AnswerButtons';
import {loadQuestionRecipes, quizServings} from './loadQuestionRecipes';
import LottieView from 'lottie-react-native';
import right from '../../assets/animations/quiz/confetti.json';
import wrong from '../../assets/animations/quiz/wrong-answer.json';
import PoweredByFatSecret from '../../Common/fatsecret/PoweredByFatSecret';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import {DEVICE_HEIGHT} from '../../utils/deviceHeight';
import Finish from './Finish';
import AccessibleAnswer from './AccessibleAnswer';
var Sound = require('react-native-sound');
var rightSound = new Sound('right.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log(
    'duration in seconds: ' +
      rightSound.getDuration() +
      'number of channels: ' +
      rightSound.getNumberOfChannels(),
  );
});

var wrongSound = new Sound('wrong.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log(
    'duration in seconds: ' +
      wrongSound.getDuration() +
      'number of channels: ' +
      wrongSound.getNumberOfChannels(),
  );
});

const FatSecretQuiz = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {fsRecipeIds, quizType} = props;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [finish, setFinish] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [tries, setTries] = useState(1);
  const [playWrongAnimation, setPlayWrongAnimation] = useState(null);
  const animation = useRef(null);
  const screenReaderEnabled = useScreenReader();
  const timer = screenReaderEnabled ? 15000 : 1500;
  const timeOut = useRef(null);
  const question = useRef(getTranslatedQuestion(quizType));

  useEffect(() => {
    loadQuestionRecipes(fsRecipeIds, current, setRecipeDetails, setAnswers, setValidated);
  }, [current]);

  function playSound() {
    // Play the sound with an onEnd callback
    if (playWrongAnimation) {
      wrongSound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      rightSound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  }

  useEffect(() => {
    if (
      (validated && !screenReaderEnabled && animation.current !== null) ||
      (playWrongAnimation && !screenReaderEnabled && animation.current !== null)
    ) {
      playSound();
      animation.current.play();
    }
  }, [validated, playWrongAnimation]);

  function counter() {
    if (current < fsRecipeIds.length - 1) {
      setCurrent(prevState => {
        return prevState + 1;
      });
    } else {
      setFinish(true);
    }
  }

  function reset() {
    setFinish(false);
    setValidated(false);
    props.setQuizType(null);
  }

  function getTranslatedQuestion(type) {
    if (type === quizServings.carbohydrate) {
      return t('Quiz.question_carbs');
    } else if (type === quizServings.calories) {
      return t('Quiz.question_calories');
    } else if (type === quizServings.fat) {
      return t('Quiz.question_fat');
    } else if (type === quizServings.fpe) {
      return t('Quiz.question_fpe');
    } else if (type === quizServings.protein) {
      return t('Quiz.question_protein');
    }
  }

  function validate(userAnswer, id) {
    if (userAnswer) {
      setAnswer(userAnswer);
      setValidated(true);

      setAnsweredQuestions(prevAnswers => {
        return [
          ...prevAnswers,
          {
            userAnswer: userAnswer,
            recipeId: recipeDetails.recipe_id,
            name: recipeDetails.recipe_name,
            recipeDetails,
            tries,
          },
        ];
      });
      setTries(1);

      timeOut.current = setTimeout(() => {
        counter();
      }, timer);
    } else {
      setTries(prevState => prevState + 1);
      setAnswer(userAnswer);
      setAnswers(prevState => {
        return prevState.map(data => {
          if (data.id === id) {
            return {
              ...data,
              pressed: true,
            };
          } else return {...data};
        });
      });

      setPlayWrongAnimation(true);
      setTimeout(() => {
        setPlayWrongAnimation(false);
      }, timer);
    }
  }

  if (finish) {
    return (
      <Finish answeredQuestions={answeredQuestions} setFinish={setFinish} quizType={quizType} reset={reset} />
    );
  }

  if (validated && screenReaderEnabled) {
    return (
      <AccessibleAnswer
        counter={counter}
        answer={answer}
        answers={answers}
        serving={quizType}
        recipeDetails={recipeDetails}
        timeOut={timeOut}
      />
    );
  }

  return recipeDetails !== null ? (
    <>
      <View style={styles.container}>
        <Text h2 style={styles.text}>
          {question.current}
        </Text>

        <Image
          style={styles.image}
          source={{
            uri: Array.isArray(recipeDetails.recipe_images.recipe_image)
              ? recipeDetails.recipe_images.recipe_image[0]
              : recipeDetails.recipe_images.recipe_image,
          }}
        />

        <View>
          <Text h2>{recipeDetails.recipe_name}</Text>
          <Text>{serving(locale, recipeDetails.serving_sizes.serving.serving_size)}</Text>
        </View>

        <AnswerButtons
          recipeDetails={recipeDetails}
          answers={answers}
          validate={validate}
          validated={validated}
          serving={quizType}
        />

        <QuizDetailInfos recipeDetails={recipeDetails} />
      </View>
      {(validated && !screenReaderEnabled) || (playWrongAnimation && !screenReaderEnabled) ? (
        <>
          <View
            style={{
              backgroundColor: answer ? 'rgba(89,255,0,0.3)' : 'rgba(255,0,0,0.3)',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              width: '100%',
            }}>
            <LottieView
              ref={animation}
              style={{width: '100%', position: 'absolute', top: 0}}
              source={answer ? right : wrong}
              loop={false}
            />
          </View>
        </>
      ) : null}
      <PoweredByFatSecret />
    </>
  ) : null;
};

export default FatSecretQuiz;

const useStyles = makeStyles(theme => ({
  root: {minHeight: 700},
  container: {padding: theme.spacing.M},
  image: {width: '100%', height: 250, borderRadius: 5, marginBottom: theme.spacing.L},
  text: {padding: theme.spacing.S},
}));
