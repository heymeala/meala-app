import React from 'react';
import {Input, makeStyles, useTheme} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';
import {useUserSettings} from '../../hooks/useUserSettings';
import { HEALTHKIT } from "../Settings/glucoseSourceConstants";

const HealthKitInputField = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {theme} = useTheme();
  const {userSettings} = useUserSettings();

  const screenReaderEnabled = useScreenReader();
  const {carbs, setCarbs} = props;
  return userSettings.glucoseSource === HEALTHKIT ? (
    <Input
      inputContainerStyle={styles.inputPadding}
      inputStyle={{fontSize: 15}}
      placeholder={t('AddMeal.Carbs')}
      keyboardType={'numeric'}
      renderErrorMessage={false}
      value={carbs}
      leftIcon={
        !screenReaderEnabled && {
          type: 'ionicon',
          name: 'ios-information-circle',
          containerStyle: {paddingRight: 10},
          iconStyle: {color: theme.colors.primary},
        }
      }
      onChangeText={text => setCarbs(text)}
    />
  ) : null;
};

export default HealthKitInputField;

const useStyles = makeStyles(theme => ({
  inputPadding: {
    borderRadius: 6,
    marginBottom: 10,
    height: 56,
  },
}));
