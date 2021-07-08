import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Image, makeStyles, Text } from "react-native-elements";
import LocalizationContext from "../../../LanguageContext";
import { serving } from "../../utils/specialTranslations";
import QuizDetailInfos from "./QuizDetailInfos";
import AnswerButtons from "./AnswerButtons";
import { loadQuestionRecipes } from "./loadQuestionRecipes";

import PoweredByFatSecret from "../../Common/fatsecret/PoweredByFatSecret";
import { useScreenReader } from "../../hooks/useScreenReaderEnabled";
import Finish from "./Finish";
import AccessibleAnswer from "./AccessibleAnswer";
import { quizServings } from "./quizServingTypes";
import AnswerAnimation from "./AnswerAnimation";
import { playRightAnswerSound, playWrongAnswerSound } from "./GameSounds";

/*
var rightSound = new Sound('right.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
});

var wrongSound = new Sound('wrong.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
});
*/

const FatSecretQuiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { fsRecipe, quizType } = props;
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
  const soundTimer = screenReaderEnabled ? 0 : 1500;
  const timeOut = useRef(null);
  const question = useRef(getTranslatedQuestion(quizType));

  useEffect(() => {
    loadQuestionRecipes(fsRecipe, current, setRecipeDetails, setAnswers, setValidated);
  }, [current]);

  function playSound() {
    // Play the sound with an onEnd callback
    if (playWrongAnimation) {
      playWrongAnswerSound();
    } else {
      playRightAnswerSound();
      props.scrollToTop();
    }
  }

  useEffect(() => {
    if (
      (validated && !screenReaderEnabled && animation.current !== null) ||
      (playWrongAnimation && !screenReaderEnabled && animation.current !== null)
    ) {
      playSound();
      animation.current.play();
    } else if ((validated && screenReaderEnabled) || (playWrongAnimation && screenReaderEnabled)) {
      playSound();
      console.log('play');
    }
  }, [validated, playWrongAnimation]);

  function counter() {
    if (current < fsRecipe.length - 1) {
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
          } else {
            return { ...data };
          }
        });
      });

      setPlayWrongAnimation(true);
      setTimeout(() => {
        setPlayWrongAnimation(false);
      }, soundTimer);
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
        <Text accessibilityRole={'header'} h2 style={styles.text}>
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
          <Text h2 accessibilityRole={'header'}>
            {recipeDetails.recipe_name}
          </Text>
          <Text>{serving(locale, recipeDetails.serving_sizes.serving.serving_size)}</Text>
        </View>

        <AnswerButtons
          recipeDetails={recipeDetails}
          answers={answers}
          validate={validate}
          validated={validated}
          serving={quizType}
        />
        {fsRecipe[current].hint ? (
          <View>
            <Text h2 accessibilityRole={'header'}>
              {t('Quiz.hint')}
            </Text>
            <Text h3>{fsRecipe[current].hint}</Text>
          </View>
        ) : null}

        <QuizDetailInfos recipeDetails={recipeDetails} />
      </View>
      {(validated && !screenReaderEnabled) || (playWrongAnimation && !screenReaderEnabled) ? (
        <AnswerAnimation answer={answer} animation={animation} />
      ) : null}
      <PoweredByFatSecret />
    </>
  ) : null;
};

export default FatSecretQuiz;

const useStyles = makeStyles(theme => ({
  root: { minHeight: 700 },
  container: { padding: theme.spacing.M },
  image: { width: '100%', height: 250, borderRadius: 5, marginBottom: theme.spacing.L },
  text: { padding: theme.spacing.S },
}));
