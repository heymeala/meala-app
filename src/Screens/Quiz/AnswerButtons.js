import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles, Text, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { createButtonColor } from './createButtonColor';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import { quizServings } from './quizServingTypes';

const AnswerButtons = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { answers, recipeDetails, validate, validated, serving } = props;
  const { theme } = useTheme();
  const screenReaderEnabled = useScreenReader();

  function getUnitTranslations(serving) {
    if (serving === quizServings.fpe) {
      return t('Quiz.fpe');
    } else if (serving === quizServings.calories) {
      return t('Quiz.calories');
    } else {
      if (screenReaderEnabled) {
        return t('Quiz.gram');
      } else {
        return t('Quiz.g');
      }
    }
  }

  const unit = getUnitTranslations(serving);
  return (
    recipeDetails.serving_sizes && (
      <View style={styles.desc}>
        {answers &&
          answers.map((answer, i) => (
            <Button
              buttonStyle={createButtonColor(answer.right, validated, theme)}
              key={i}
              disabled={answer.pressed}
              disabledStyle={{ backgroundColor: 'red' }}
              containerStyle={styles.answerButton}
              onPress={() => (!validated ? validate(answer.right, answer.id) : null)}
              title={
                <>
                  {answer.pressed ? (
                    <Text h2>{t('Quiz.again')}</Text>
                  ) : (
                    <>
                      <Text h2>{answer[serving]}</Text>
                      <Text>{unit}</Text>
                    </>
                  )}
                </>
              }
            />
          ))}
      </View>
    )
  );
};

export default AnswerButtons;

const useStyles = makeStyles(theme => ({
  answerButton: { margin: theme.spacing.S },
  desc: { paddingVertical: theme.spacing.M },
}));
