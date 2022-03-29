import React from 'react';
import { Keyboard } from 'react-native';
import { Input, makeStyles } from 'react-native-elements';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const NoteInputField = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { notiz, setNotiz } = props;
  return (
    <Input
      style={styles.container}
      inputContainerStyle={styles.inputPaddingTextarea}
      inputStyle={{ fontSize: 18 }}
      placeholder={t('AddMeal.Note')}
      renderErrorMessage={false}
      returnKeyType="done"
      blurOnSubmit={true}
      textAlignVertical={'top'}
      onSubmitEditing={() => {
        Keyboard.dismiss();
      }}
      multiline={true}
      value={notiz}
      onChangeText={text => setNotiz(text)}
    />
  );
};

export default NoteInputField;

const useStyles = makeStyles(theme => ({
  container: { height: 70, alignSelf: 'center' },
  inputPaddingTextarea: {
    // backgroundColor: isDarkMode ? '#ffffff' : '#000000',
    borderRadius: 15,
    borderWidth: 1,
    padding: theme.spacing.S,
    marginHorizontal: theme.spacing.S,
    marginBottom: 10,
  },
}));
