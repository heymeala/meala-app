import {View} from 'react-native';
import EnterMealButton from './EnterMealComponents/EnterMealButton';
import React from 'react';
import LocalizationContext from '../../../LanguageContext';
import {makeStyles} from 'react-native-elements';

const PictureSelector = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <EnterMealButton
        onPress={props.selectCameraTapped}
        name={t('AddMeal.camera')}
        icon="ios-camera"
        avatarSource={props.avatarSourceCamera}
      />
      <EnterMealButton
        onPress={props.selectLibraryTapped}
        name={'Library'}
        icon="ios-albums"
        avatarSource={props.avatarSourceLibrary}
      />
      <EnterMealButton
        onPress={() => props.setIsScannerVisible(true)}
        name={'Food Scan'}
        icon="ios-barcode"
      />
    </View>
  );
};

export default PictureSelector;

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));
