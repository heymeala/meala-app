import React, { useEffect, useState } from 'react';
import { Image as RNImage, Linking, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Icon, Image, makeStyles, Overlay, Text } from 'react-native-elements';
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
import libre_de from '../../../assets/libre/libre_tagesdiagram.png';
import libre_en from '../../../assets/libre/libre_daily_graph.png';

const AddLibreData = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { userSettings } = useUserSettings();
  const [isVisible, setIsVisible] = useState(false);
  const [chartImage, setChartImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const libreImage =
    locale === 'de' ? RNImage.resolveAssetSource(libre_de).uri : RNImage.resolveAssetSource(libre_en).uri;
  useEffect(() => {
    if (chartImage && chartImage.length > 0) {
      uploadImage();
    }
  }, [chartImage]);

  const getTimeLine = ({ x, y }) => {
    const d = new Date(props.date);
    d.setHours(0, 0, x * 3600, 0);

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
          <Button
            type={'clear'}
            titleStyle={{ fontSize: 13 }}
            buttonStyle={{ alignSelf: 'flex-end', backgroundColor: 'transparent' }}
            onPress={() => setIsVisible(false)}
            title={t('General.close')}
          />
          <ScrollView contentContainerStyle={styles.container}>
            {/*
            <Text h2>{t('Entries.libre.title')}</Text>
*/}
            <View style={styles.instructionContainer}>
              <Text h3 h3Style={styles.steps}>
                1.
              </Text>
              <Text h4 h4Style={styles.text}>
                {t('Entries.libre.stepOne')}
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: libreImage }} style={styles.libreMenuImage} />
            </View>

            <View style={styles.instructionContainer}>
              <Text h3 h3Style={styles.steps}>
                2.
              </Text>
              <Text h4 h4Style={styles.text}>
                {t('Entries.libre.saveLibreImageOne')}
                <Icon
                  containerStyle={Platform.OS === 'ios' ? { marginRight: -10 } : {}}
                  size={16}
                  style={Platform.OS === 'ios' ? { marginLeft: 20, width: 20 } : {}}
                  name={Platform.OS === 'ios' ? 'ios-share' : 'share'}
                />
                {t('Entries.libre.saveLibreImageTwo')}
              </Text>
            </View>
            <Button
              type={'clear'}
              buttonStyle={{ backgroundColor: 'transparent' }}
              title={t('Entries.libre.openLibre')}
              onPress={() => open()}
            />
            <View style={styles.instructionContainer}>
              <Text h3 h3Style={styles.steps}>
                3.
              </Text>
              <Text h4 h4Style={styles.text}>
                {t('Entries.libre.stepTwo')}
              </Text>
            </View>
            {loading && <Text>{t('Entries.libre.loading')}</Text>}
            {errorMessage && <Text>{t('Entries.libre.errorMessage')}</Text>}
            <Button
              buttonStyle={styles.imageSelectButton}
              loading={loading}
              title={t('Entries.libre.chooseImage') + moment(props.date).format('ll')}
              onPress={() => selectLibraryTapped()}
            />
          </ScrollView>
        </SafeAreaView>
      </Overlay>
    </>
  );
};

export default AddLibreData;

const useStyles = makeStyles(theme => ({
  button: { padding: theme.spacing.M, alignItems: 'center' },
  container: { alignItems: 'center' },
  libreMenuImage: { width: '100%', minHeight: 300 },
  imageContainer: { width: '80%' },
  steps: {
    marginTop: theme.spacing.M,
    fontFamily: 'SecularOne-Regular',
  },
  text: {
    paddingLeft: theme.spacing.M,
    lineHeight: 25,
    width: '95%',
  },
  instructionContainer: {
    flexDirection: 'row',
    marginVertical: theme.spacing.M,
    marginHorizontal: theme.spacing.S,
    alignSelf: 'flex-start',
  },
  saveImageDescription: { flexDirection: 'row', alignItems: 'center', padding: theme.spacing.M },
  imageSelectButton: { marginVertical: theme.spacing.L, marginBottom: 100 },
}));
