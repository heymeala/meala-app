import React from 'react';
import {Keyboard, ScrollView, View} from 'react-native';
import {Input, makeStyles} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const NoteInputField = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const screenReaderEnabled = useScreenReader();
  const {notiz, setNotiz} = props;
  return (
    <Input
      inputContainerStyle={styles.inputPaddingTextarea}
      inputStyle={{fontSize: 15}}
      placeholder={t('AddMeal.Note')}
      numberOfLines={3}
      renderErrorMessage={false}
      returnKeyType="done"
      onSubmitEditing={() => {
        Keyboard.dismiss();
      }}
      multiline={true}
      value={notiz}
      leftIcon={
        !screenReaderEnabled && {
          type: 'ionicon',
          name: 'ios-information-circle',
          containerStyle: {paddingRight: 10},
          iconStyle: {color: '#154d80'},
        }
      }
      onChangeText={text => setNotiz(text)}
    />
  );
};

export default NoteInputField;

const useStyles = makeStyles(theme => ({
  inputPaddingTextarea: {
    // backgroundColor: isDarkMode ? '#ffffff' : '#000000',
    borderRadius: 6,
    marginBottom: 10,
    height: 70,
  },
}));
