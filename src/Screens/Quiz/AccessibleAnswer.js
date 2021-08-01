import React, { useRef } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { DEVICE_HEIGHT } from '../../utils/deviceHeight';
import { quizServings } from './quizServingTypes';

const AccessibleAnswer = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { counter, answer, recipeDetails, timeOut, serving, answers } = props;
  const rightAnswer = useRef(answers.filter(item => item.right).map(data => data));
  const servingAnswer = rightAnswer.current[0];
  const type = useRef(handleQuizTypeTranslation());
  const answerText = useRef(getAnswer());

  function handleQuizTypeTranslation() {
    if (serving === quizServings.carbohydrate) {
      return t('Accessibility.MealQuiz.answer_carbs');
    } else if (serving === quizServings.calories) {
      return t('Accessibility.MealQuiz.answer_calories');
    } else if (serving === quizServings.fat) {
      return t('Accessibility.MealQuiz.answer_fat');
    } else if (serving === quizServings.fpe) {
      return t('Accessibility.MealQuiz.answer_fpe');
    } else if (serving === quizServings.protein) {
      return t('Accessibility.MealQuiz.answer_protein');
    }
  }

  function getAnswer() {
    if (answer) {
      return (
        t('Accessibility.MealQuiz.answer_right', {
          name: recipeDetails.recipe_name,
          serving: servingAnswer[serving],
          type: type.current,
        }) +
        ' ' +
        t('Accessibility.MealQuiz.next')
      );
    } else {
      return (
        t('Accessibility.MealQuiz.answer_wrong', {
          name: recipeDetails.recipe_name,
          serving: servingAnswer[serving],
          type: type.current,
        }) +
        ' ' +
        t('Accessibility.MealQuiz.next')
      );
    }
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        onPress={() => {
          clearTimeout(timeOut.current);
          counter();
        }}>
        <Text h2 style={styles.accessibleButton}>
          {answerText.current}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccessibleAnswer;

const useStyles = makeStyles(theme => ({
  accessibleButton: {
    height: DEVICE_HEIGHT,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingHorizontal: theme.spacing.M,
  },
}));
