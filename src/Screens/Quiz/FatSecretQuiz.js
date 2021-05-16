import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {serving} from '../../utils/specialTranslations';
import QuizDetailInfos from './QuizDetailInfos';
import AnswerButtons from './AnswerButtons';
import {loadQuestionRecipes} from './loadQuestionRecipes';
import LottieView from 'lottie-react-native';
import right from '../../assets/animations/quiz/confetti.json';
import wrong from '../../assets/animations/quiz/wrong-answer.json';
import PoweredByFatSecret from '../../Common/fatsecret/PoweredByFatSecret';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import {DEVICE_HEIGHT} from '../../utils/deviceHeight';

const FatSecretQuiz = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {fsRecipeIds} = props;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [validated, setValidated] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [finish, setFinish] = useState(false);
  const animation = useRef(null);
  const screenReaderEnabled = useScreenReader();
  const timer = screenReaderEnabled ? 15000 : 1500;
  const timeOut = useRef();
  useEffect(() => {
    loadQuestionRecipes(fsRecipeIds, current, setRecipeDetails, setAnswers, setValidated);
  }, [current]);

  useEffect(() => {
    if (validated && !screenReaderEnabled) {
      animation.current.play();
    }
  }, [validated]);

  function counter() {
    if (current < fsRecipeIds.length - 1) {
      setCurrent(prevState => {
        return prevState + 1;
      });
    } else {
      setFinish(true);
    }
  }

  function validate(userAnswer) {
    setAnswer(userAnswer);
    setValidated(true);

    timeOut.current = setTimeout(() => {
      counter();
    }, timer);
  }
  if (finish) {
    return (
      <View style={styles.container}>
        <Text h2>{t('Quiz.done')}</Text>
      </View>
    );
  }

  if (validated && screenReaderEnabled) {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        onPress={() => {
          clearTimeout(timeOut.current);
          counter();
        }}>
        <Text h2 style={styles.accessibleButton}>
          {answer
            ? t('Accessibility.Quiz.answer_right_carbs', {
                name: recipeDetails.recipe_name,
                serving: recipeDetails.serving_sizes.serving.carbohydrate,
              }) +
              ' ' +
              t('Accessibility.Quiz.next')
            : t('Accessibility.Quiz.answer_wrong_carbs', {
                name: recipeDetails.recipe_name,
                serving: recipeDetails.serving_sizes.serving.carbohydrate,
              }) +
              ' ' +
              t('Accessibility.Quiz.next')}
        </Text>
      </TouchableOpacity>
    );
  }

  return recipeDetails !== null ? (
    <>
      <View style={styles.container}>
        <Text h2 style={styles.text}>
          {t('Quiz.question')}
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
        />
        <QuizDetailInfos recipeDetails={recipeDetails} />
      </View>
      {validated && !screenReaderEnabled ? (
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
            }}
          />
          <LottieView
            ref={animation}
            style={{width: '100%', position: 'absolute', top: 0}}
            source={answer ? right : wrong}
            loop={false}
          />
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
  accessibleButton: {
    height: DEVICE_HEIGHT,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: theme.spacing.M,
  },
}));
