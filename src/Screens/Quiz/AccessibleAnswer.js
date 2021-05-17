import React, {useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {DEVICE_HEIGHT} from '../../utils/deviceHeight';
import {quizServings} from './loadQuestionRecipes';

const AccessibleAnswer = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {counter, answer, recipeDetails, timeOut, serving, answers} = props;
  const rightAnswer = useRef(answers.filter(item => item.right).map(data => data));
  const servingAnswer = rightAnswer.current[0];
  const type = useRef(handleQuizTypeTranslation());
  const answerText = useRef(getAnswer());

  function handleQuizTypeTranslation() {
    if (serving === quizServings.carbohydrate) {
      return t('Accessibility.Quiz.answer_carbs');
    } else if (serving === quizServings.calories) {
      return t('Accessibility.Quiz.answer_calories');
    } else if (serving === quizServings.fat) {
      return t('Accessibility.Quiz.answer_fat');
    } else if (serving === quizServings.fpe) {
      return t('Accessibility.Quiz.answer_fpe');
    } else if (serving === quizServings.protein) {
      return t('Accessibility.Quiz.answer_protein');
    }
  }

  function getAnswer() {
    if (answer) {
      return (
        t('Accessibility.Quiz.answer_right', {
          name: recipeDetails.recipe_name,
          serving: servingAnswer[serving],
          type: type.current,
        }) +
        ' ' +
        t('Accessibility.Quiz.next')
      );
    } else {
      return (
        t('Accessibility.Quiz.answer_wrong', {
          name: recipeDetails.recipe_name,
          serving: servingAnswer[serving],
          type: type.current,
        }) +
        ' ' +
        t('Accessibility.Quiz.next')
      );
    }
  }

  return (
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
