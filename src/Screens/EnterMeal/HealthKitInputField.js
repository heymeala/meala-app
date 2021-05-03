import React from 'react';
import {Input, makeStyles, useTheme} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const HealthKitInputField = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {theme} = useTheme();

  const screenReaderEnabled = useScreenReader();
  const {glucoseDataSource, setCarbs} = props;
  return glucoseDataSource === 'Healthkit' ? (
    <Input
      inputContainerStyle={styles.inputPadding}
      inputStyle={{fontSize: 15}}
      placeholder={t('AddMeal.Carbs')}
      keyboardType={'numeric'}
      renderErrorMessage={false}
      leftIcon={
        !screenReaderEnabled && {
          type: 'ionicon',
          name: 'ios-information-circle',
          containerStyle: {paddingRight: 10},
          iconStyle: {color: theme.colors.primary},
        }
      }
      onChangeText={text => setCarbs(parseFloat(text))}
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
