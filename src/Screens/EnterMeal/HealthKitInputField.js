import React from 'react';
import {ScrollView, View} from 'react-native';
import {Input, makeStyles} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const HealthKitInputField = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
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
          iconStyle: {color: '#f9de1c'},
        }
      }
      onChangeText={text => setCarbs(parseFloat(text))}
    />
  ) : null;
};

export default HealthKitInputField;

const useStyles = makeStyles(theme => ({}));
