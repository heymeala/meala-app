import React, { useEffect, useState } from 'react';
import { Linking, Platform, SafeAreaView, View } from 'react-native';
import { Button, makeStyles, Overlay, Text } from 'react-native-elements';
import { LIBRETWOAPP } from '../../Settings/glucoseSourceConstants';
import LocalizationContext from '../../../../LanguageContext';
import { useUserSettings } from '../../../hooks/useUserSettings';
import RNFetchBlob from 'rn-fetch-blob';
import { IMAGECONVERTER_API } from '@env';
import * as ImagePicker from 'react-native-image-picker';
import PermissionAlert from '../../../Common/PermissionAlert';
import uuid from 'react-native-uuid';
import { database } from '../../../Common/database_realm';
import moment from 'moment';

const AddLibreData = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { userSettings } = useUserSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [chartImage, setChartImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  useEffect(() => {
    if (chartImage && chartImage.length > 0) {
      uploadImage();
    }
  }, [chartImage]);

  const getTimeLine = ({ x, y }) => {
    const d = new Date(props.date);
    d.setHours(0, 0, x * 3600, 0);
    console.log(d.toISOString());
    console.log(d.getTime());
    return {
      _id: uuid.v4(),
      device: 'meala-Libre-Import',
      date: d.getTime(),
      dateString: d.toISOString(),
      sgv: y,
      type: 'sgv',
    };
  };

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
          setChartImage(response.base64);
        }
      },
    );
  }

  function uploadImage() {
    setLoading(true);
    RNFetchBlob.fetch(
      'POST',
      IMAGECONVERTER_API,
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'chart',
          filename: 'image.jpg',
          type: 'image/jpg',
          data: chartImage,
        },
        { name: 'date', data: '2021-07-16T19:20:30.45+02:00' },
      ],
    )
      .then(response => response.json())
      .then(result => {
        setErrorMessage(false);
        console.log(result);
        const chartData = result.map(getTimeLine);
        database.editMealCgmData(chartData, props.userMealId);
        setLoading(false);
        setIsVisible(false);
        props.reloadData();
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage(true);
        console.log('error', error);
      });
  }

  function open() {
    Linking.openURL(
      Platform.OS === 'ios'
        ? 'https://apps.apple.com/app/freestyle-librelink-de/id1292420160'
        : 'https://play.google.com/store/apps/details?id=com.freestylelibre.app.de',
    );
  }

  return (
    <>
      {userSettings.glucoseSource === LIBRETWOAPP && (
        <View style={styles.button}>
          <Button
            title={
              props.coordinates && props.coordinates.length > 0
                ? t('Entries.libre.differentImage')
                : t('Entries.libre.addImage')
            }
            onPress={() => setIsVisible(true)}
          />
        </View>
      )}
      <Overlay
        isVisible={isVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        fullScreen={true}
        title={'Libre'}>
        <SafeAreaView>
          <View style={styles.container}>
            <Text h2>{t('Entries.libre.title')}</Text>
            <Text h3>{t('Entries.libre.stepOne')}</Text>
            <Button title={t('Entries.libre.openLibre')} onPress={() => open()} />
            <Text h3>{t('Entries.libre.stepTwo')}</Text>
            {loading && <Text>{t('Entries.libre.loading')}</Text>}
            {errorMessage && <Text>{t('Entries.libre.errorMessage')}</Text>}
            <Button
              loading={loading}
              title={t('Entries.libre.chooseImage') + moment(props.date).format('ll')}
              onPress={() => selectLibraryTapped()}
            />
            <Button
              type={'clear'}
              buttonStyle={{ backgroundColor: 'transparent' }}
              onPress={() => setIsVisible(false)}
              title={t('General.close')}
            />
          </View>
        </SafeAreaView>
      </Overlay>
    </>
  );
};

export default AddLibreData;

const useStyles = makeStyles(theme => ({
  button: { padding: 8, alignItems: 'center' },
  container: { height: '100%', justifyContent: 'space-evenly', alignItems: 'center' },
}));
