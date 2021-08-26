import React from 'react';
import { Button, makeStyles, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { useUserSettings } from '../../hooks/useUserSettings';
import { HEALTHKIT } from '../Settings/glucoseSourceConstants';
import { Alert, View } from 'react-native';

const HealthKitCarbohydrateField = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { theme } = useTheme();
  const { userSettings } = useUserSettings();
  const buttonTitle = `${props.healthKitData.carbs ? props.healthKitData.carbs + 'g' : ''} Carbohydrates `;

  const showAlert = () =>
    Alert.prompt(
      'Add Carbs to HealthKit',
      t('AddMeal.healthKit.hint'),
      [
        {
          text: t('General.cancel'),
          style: 'destructive',
        },
        {
          text: t('General.add'),
          style: 'default',
          onPress: g => {
            if (!isNaN(g)) {
              props.setHealthKitData(prevState => {
                return { carbs: g, insulin: { ...prevState.insulin } };
              });
            }
          },
        },
      ],
      'plain-text',
      props.healthKitData.carbs,
      'numeric',
    );

  return userSettings.glucoseSource === HEALTHKIT ? (
    <View style={styles.container}>
      <Button
        type={props.healthKitData.carbs ? 'solid' : 'outline'}
        buttonStyle={
          props.healthKitData.carbs
            ? { paddingHorizontal: 20, backgroundColor: '#ffd420' }
            : { paddingHorizontal: 20, backgroundColor: 'transparent' }
        }
        title={buttonTitle}
        onPress={() => showAlert()}
      />
    </View>
  ) : null;
};

export default HealthKitCarbohydrateField;

const useStyles = makeStyles(theme => ({
  container: {
    alignSelf: 'flex-start',
    marginLeft: theme.spacing.M,
    marginBottom: theme.spacing.S,
  },
  centeredView: {
    //flex: 1,
    // height:300,
    justifyContent: 'center',
  },
  modalView: {
    margin: theme.spacing.S,
    backgroundColor: 'white',
    height: '95%',
    borderRadius: 20,
    padding: theme.spacing.S,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 40,
    marginLeft: 20,
    flex: 1,
  },
}));
