import { PermissionsAndroid, Platform, View } from 'react-native';
import EnterMealButton from './EnterMealComponents/EnterMealButton';
import React from 'react';
import LocalizationContext from '../../../LanguageContext';
import { makeStyles } from 'react-native-elements';
import { imageDetectionClarifai } from './imageDetectionClarifai';
import * as ImagePicker from 'react-native-image-picker';
import PermissionAlert from '../../Common/PermissionAlert';
import { DEFAULT_MODE, useEnterMealType } from '../../hooks/useEnterMealState';
import RNFS from 'react-native-fs';
import { IMAGEFOLDER } from '../../Common/Constants/folder';

const PictureSelector = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { type } = useEnterMealType();
  const {
    setFoodPicture,
    setDate,
    setPredictions,
    setClarifaiImagebase,
    setTags,
    setAvatarSourceCamera,
    setAvatarSourceLibrary,
    userMealId,
  } = props;

  function handleImageLoadStates(response) {
    const isAndroid = Platform.OS === 'android';
    const mkDirOption = isAndroid ? null : { NSURLIsExcludedFromBackupKey: false };

    const documentPath = RNFS.DocumentDirectoryPath + IMAGEFOLDER;
    RNFS.mkdir(documentPath, mkDirOption).then(response => console.log(response));

    const file_path = documentPath + '/' + userMealId + '_food.png';

    RNFS.writeFile(file_path, response.base64, 'base64').catch(error => {
      console.log(error);
    });
    setFoodPicture(file_path);
    setClarifaiImagebase(response.base64);
    response.timestamp && setDate(new Date(response.timestamp));
    imageDetectionClarifai(response.base64, setPredictions, locale, setTags);
  }

  function selectLibraryTapped() {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 800,
        maxWidth: 800,
        quality: 0.7,
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
            return { uri: response.uri };
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

      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: t('AddMeal.Permission'),
        message: t('AddMeal.grantPermission'),
        buttonNegative: t('General.cancel'),
        buttonPositive: 'OK',
      });

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
        quality: 0.7,
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
            return { uri: response.uri };
          });
          handleImageLoadStates(response);
        }
      },
    );
  }

  return (
    <View style={styles.container}>
      <EnterMealButton
        onPress={Platform.OS === 'android' ? requestCameraPermission : selectCameraTapped}
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
