import React from 'react';
import {View} from 'react-native';
import {Button, makeStyles, Text, useTheme} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {createButtonColor} from './createButtonColor';
import { useScreenReader } from "../../hooks/useScreenReaderEnabled";

const AnswerButtons = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {answers, recipeDetails, validate, validated} = props;
  const {theme} = useTheme();
  const screenReaderEnabled = useScreenReader();

  return (
    recipeDetails.serving_sizes && (
      <View style={styles.desc}>
        {answers &&
          answers.map((answer, i) => (
            <Button
              buttonStyle={createButtonColor(answer.right, validated, theme)}
              key={i}
              containerStyle={styles.answerButton}
              onPress={() => (!validated ? validate(answer.right) : null)}
              title={
                <>
                  <Text h2>{answer.value}</Text>
                  <Text>{screenReaderEnabled ? t('Quiz.gram') : t('Quiz.g')}</Text>
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
  answerButton: {margin: theme.spacing.S},
  desc: {paddingVertical: theme.spacing.S},
}));
