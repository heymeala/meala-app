import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles, Text, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useScreenReader } from '../../../hooks/useScreenReaderEnabled';

const AnswerButtonsGeneral = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { answers, validate, validated } = props;
  const { theme } = useTheme();
  const screenReaderEnabled = useScreenReader();

  return (
    <View style={styles.desc}>
      {answers &&
        answers.map((answer, i) => (
          <Button
            //   buttonStyle={createButtonColor(answer.right, validated, theme)}
            key={i}
            disabled={answer.pressed}
            disabledStyle={{ backgroundColor: 'red' }}
            containerStyle={styles.answerButton}
            onPress={() => {
              props.validate(answer.right, answer.id);
            }}
            //  onPress={() => (!validated ? validate(answer.right, answer.id) : null)}
            title={
              <>
                {answer.pressed ? (
                  <Text h2>{t('Quiz.again')}</Text>
                ) : (
                  <>
                    <Text h2>{answer.answer}</Text>
                  </>
                )}
              </>
            }
          />
        ))}
    </View>
  );
};

export default AnswerButtonsGeneral;

const useStyles = makeStyles(theme => ({
  answerButton: { margin: theme.spacing.S },
  desc: { paddingVertical: theme.spacing.M, flexGrow:1 , },
}));
