import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles, Text, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useScreenReader } from '../../../hooks/useScreenReaderEnabled';
import { createButtonColor } from "../createButtonColor";

const AnswerButtonsGeneral = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { answers, validate, validated } = props;
  const { theme } = useTheme();
  const screenReaderEnabled = useScreenReader();
//todo: button color
  return (
    <View style={styles.desc}>
      {answers &&
        answers.map((answer, i) => (
          <Button
             buttonStyle={createButtonColor(answer.right, answer.pressed , theme)}
            key={i}
            disabled={answer.pressed}
            disabledStyle={{ backgroundColor: 'red' }}
            containerStyle={styles.answerButton}
            onPress={() => {
              validate(answer.right, answer.id);
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
