import React from 'react';
import {ScrollView, View} from 'react-native';
import {Input, makeStyles} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const NightScoutInputFields = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const screenReaderEnabled = useScreenReader();
  const {
    settings,
    nightscoutCarbs,
    setNightscoutCarbs,
    nightscoutInsulin,
    setNightscoutInsulin,
  } = props;
  return settings && settings.nightscoutTreatmentsUpload ? (
    <>
      <Input
        inputContainerStyle={styles.inputPaddingTextarea}
        inputStyle={{fontSize: 15}}
        placeholder={t('AddMeal.Carbs')}
        renderErrorMessage={false}
        keyboardType={'numeric'}
        returnKeyType="done"
        value={nightscoutCarbs}
        leftIcon={
          !screenReaderEnabled && {
            type: 'font-awesome-5',
            name: 'cookie-bite',
            containerStyle: {paddingRight: 10},
            iconStyle: {color: '#154d80'},
          }
        }
        onChangeText={text => setNightscoutCarbs(text)}
      />
      <Input
        inputContainerStyle={styles.inputPaddingTextarea}
        inputStyle={{fontSize: 15}}
        placeholder={t('AddMeal.Insulin')}
        renderErrorMessage={false}
        keyboardType={'numeric'}
        returnKeyType="done"
        value={nightscoutInsulin}
        leftIcon={
          !screenReaderEnabled && {
            type: 'material-community',
            name: 'needle',
            containerStyle: {paddingRight: 10},
            iconStyle: {color: '#154d80'},
          }
        }
        onChangeText={text => setNightscoutInsulin(text)}
      />
    </>
  ) : null;
};

export default NightScoutInputFields;

const useStyles = makeStyles(theme => ({}));
