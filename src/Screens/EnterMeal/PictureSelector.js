import {StyleSheet, View} from 'react-native';
import EnterMealButton from './EnterMealComponents/EnterMealButton';
import React from 'react';
import LocalizationContext from '../../../LanguageContext';

const PictureSelector = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <View style={stylesImagePicker.container}>
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

const stylesImagePicker = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#154d80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  avatarSmall: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});
