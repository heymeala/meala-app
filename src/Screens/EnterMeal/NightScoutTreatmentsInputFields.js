import React from 'react';
import {Input, makeStyles, useTheme} from 'react-native-elements';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';
import {useUserSettings} from '../../hooks/useUserSettings';

const NightScoutInputFields = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const screenReaderEnabled = useScreenReader();
  const {userSettings} = useUserSettings();

  const {setNsTreatmentsUpload, nsTreatmentsUpload} = props;

  const {theme} = useTheme();

  return userSettings && userSettings.nightscoutTreatmentsUpload ? (
    <>
      <Input
        inputContainerStyle={styles.inputPaddingTextarea}
        inputStyle={{fontSize: 15}}
        placeholder={t('AddMeal.Carbs')}
        renderErrorMessage={false}
        keyboardType={'numeric'}
        returnKeyType="done"
        value={nsTreatmentsUpload.carbs}
        leftIcon={
          !screenReaderEnabled && {
            type: 'font-awesome-5',
            name: 'cookie-bite',
            containerStyle: {paddingRight: 10},
            iconStyle: {color: theme.colors.primary},
          }
        }
        onChangeText={text =>
          setNsTreatmentsUpload({...nsTreatmentsUpload, carbs: text})
        }
      />
      <Input
        inputContainerStyle={styles.inputPaddingTextarea}
        inputStyle={{fontSize: 15}}
        placeholder={t('AddMeal.Insulin')}
        renderErrorMessage={false}
        keyboardType={'numeric'}
        returnKeyType="done"
        value={nsTreatmentsUpload.insulin}
        leftIcon={
          !screenReaderEnabled && {
            type: 'material-community',
            name: 'needle',
            containerStyle: {paddingRight: 10},
            iconStyle: {color: theme.colors.primary},
          }
        }
        onChangeText={text =>
          setNsTreatmentsUpload({...nsTreatmentsUpload, insulin: text})
        }
      />
    </>
  ) : null;
};

export default NightScoutInputFields;

const useStyles = makeStyles(theme => ({
  inputPaddingTextarea: {
    // backgroundColor: isDarkMode ? '#ffffff' : '#000000',
    borderRadius: 6,
    marginBottom: 10,
    height: 70,
  },
}));
