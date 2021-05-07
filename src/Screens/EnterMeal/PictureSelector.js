import {PermissionsAndroid, Platform, View} from 'react-native';
import EnterMealButton from './EnterMealComponents/EnterMealButton';
import React from 'react';
import LocalizationContext from '../../../LanguageContext';
import {makeStyles} from 'react-native-elements';
import {imageDetectionClarifai} from './imageDetectionClarifai';
import * as ImagePicker from 'react-native-image-picker';
import PermissionAlert from '../../Common/PermissionAlert';
import {
  COPY_MODE,
  DEFAULT_MODE,
  EDIT_MODE,
  useEnterMealType,
} from '../../hooks/useEnterMealState';

const PictureSelector = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {type} = useEnterMealType();
  const {
    setFoodPicture,
    setDate,
    setPredictions,
    setClarifaiImagebase,
    setTags,
    setAvatarSourceCamera,
    setAvatarSourceLibrary,
  } = props;
  function handleImageLoadStates(response) {
    setFoodPicture(
      (prevState => Platform.OS === 'android')
        ? response.uri
        : 'data:image/jpeg;base64,' + response.base64,
    );
    setClarifaiImagebase(prevState => response.base64);
    response.timestamp && setDate(prevState => new Date(response.timestamp));
    imageDetectionClarifai(response.base64, setPredictions, locale, setTags);
  }

  function selectLibraryTapped() {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
          if (response.errorCode === 'permission') {
            PermissionAlert(t);
          }
        } else {
          setAvatarSourceLibrary(prevState => {
            return {uri: response.uri};
          });
          setAvatarSourceCamera(prevState => undefined);
          handleImageLoadStates(response);
        }
      },
    );
  }

  const requestCameraPermission = async () => {
    try {
      console.log('Camera permission try');

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: t('AddMeal.Permission'),
          message: t('AddMeal.grantPermission'),
          buttonNegative: t('General.cancel'),
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        selectCameraTapped();
      } else {
        console.log('Camera permission denied');
        PermissionAlert(t);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function selectCameraTapped() {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 800,
        maxWidth: 800,
        quality: 0.6,
        //  saveToPhotos:true,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled Camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
          if (response.errorCode === 'permission') {
            PermissionAlert(t);
          }
        } else {
          setAvatarSourceLibrary(prevState => undefined);
          setAvatarSourceCamera(prevState => {
            return {uri: response.uri};
          });
          handleImageLoadStates(response);
        }
      },
    );
  }

  return (
    <View style={styles.container}>
      <EnterMealButton
        onPress={
          Platform.OS === 'android'
            ? requestCameraPermission
            : selectCameraTapped
        }
        name={t('AddMeal.camera')}
        icon="ios-camera"
        avatarSource={props.avatarSourceCamera}
      />
      <EnterMealButton
        onPress={selectLibraryTapped}
        name={t('AddMeal.library')}
        icon="ios-albums"
        avatarSource={props.avatarSourceLibrary}
      />
      {type.mode === DEFAULT_MODE && (
        <EnterMealButton
          onPress={() => props.setIsScannerVisible(true)}
          name={t('AddMeal.barCode')}
          icon="ios-barcode"
        />
      )}
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
