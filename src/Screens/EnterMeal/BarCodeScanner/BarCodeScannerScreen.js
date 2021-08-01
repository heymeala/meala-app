import React, { useState } from 'react';
import { Dimensions, Linking, TouchableOpacity, View } from 'react-native';
import { Button, Image, makeStyles, Text, useTheme } from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LocalizationContext from '../../../../LanguageContext';
import ScannerResults from './Scanner/ScannerResults';
import Modal from 'react-native-modal';
import { spacing } from '../../../theme/styles';
import { openFoodFactsApi } from './openFoodFactsApi';
import analytics from '@react-native-firebase/analytics';

const ScanScreen = props => {
  const { t } = React.useContext(LocalizationContext);
  const [data, setData] = useState('');
  const [status, setStatus] = useState(true);
  const [openModal, setModal] = useState(false);
  const styles = useStyles();
  const { theme } = useTheme();
  const newEntry = () => {
    const carbs = data.nutriments && data.nutriments.carbohydrates_100g;
    const meal = data.product_name && data.product_name;

    const serving = data.serving_size && t('BarCode.portion', { weight: data.serving_size }) + '\n';

    const note = `${serving !== undefined ? serving : ''} ${
      carbs !== undefined
        ? carbs +
          data.nutriments.carbohydrates_unit +
          ' ' +
          t('BarCode.g100', {
            nutrition: t('AddMeal.nutritionData.carbohydrate'),
          })
        : ''
    }`;
    props.handleScannerFood({ carbs: carbs, meal: meal, note: note });
    props.toggleScanner();
  };
  const onSuccess = async e => {
    const foodData = await openFoodFactsApi(e.data);
    console.log(foodData);
    if (foodData.status === 0) {
      setStatus(false);
      setTimeout(() => setStatus(true), 3000);
      await analytics().logEvent('barcode_scan', { result: 'not found' });
    } else {
      setData(foodData.product);

      if (foodData.product_name === undefined || foodData.product_name === '') {
        setStatus(true);
        setModal(true);
        await analytics().logEvent('barcode_scan', { result: 'no name' });
      }
      await analytics().logEvent('barcode_scan', { result: 'success' });
    }
  };

  const FoodView = () => {
    return data.product_name !== undefined || data.product_name !== '' ? (
      <View>
        {status ? (
          <Text style={styles.whiteText}>{t('BarCode.Intro')}</Text>
        ) : (
          <Text style={styles.whiteText}>{t('BarCode.noInfo')}</Text>
        )}
      </View>
    ) : (
      <Text style={styles.whiteText}>{t('BarCode.noInfo')}</Text>
    );
  };

  const Scanner = () => {
    return (
      <>
        <Modal
          isVisible={openModal}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          backdropOpacity={0.3}
          onBackdropPress={() => setModal(false)}
          onSwipeComplete={() => setModal(false)}
          onAccessibilityEscape={() => setModal(false)}
          swipeDirection={['down']}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ScannerResults data={data} />
              <View style={styles.container}>
                <TouchableOpacity
                  style={{
                    ...styles.openButton,
                    backgroundColor: theme.colors.white,
                    color: theme.colors.black,
                    minWidth: 100,
                  }}
                  onPress={() => setModal(false)}>
                  <Text style={styles.textStyle}>{t('General.close')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.openButton,
                    backgroundColor: theme.colors.secondary,
                    color: theme.colors.black,
                    minWidth: 100,
                  }}
                  onPress={() => newEntry(t)}>
                  <Text style={styles.textStyle}>{t('BarCode.AddMeal')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={1000}
          showMarker={true}
          style={{ flex: 1 }}
          notAuthorizedView={
            <>
              <Text>{t('AddMeal.Permission')}</Text>
              <Button
                buttonStyle={{ backgroundColor: '#000' }}
                title={t('AddMeal.grantPermission')}
                onPress={() => Linking.openSettings()}
              />
            </>
          }
          customMarker={
            <Image
              source={require('../../../assets/marker.png')}
              style={{ width: Dimensions.get('window').width - 50, height: 45 }}
            />
          }
          cameraStyle={{ height: 240, overflow: 'hidden' }}
          topViewStyle={{
            backgroundColor: theme.colors.grey0,
            color: theme.colors.white,
            zIndex: 1000,
            justifyContent: 'flex-end',
            paddingBottom: spacing.M,
          }}
          containerStyle={{ backgroundColor: theme.colors.black }}
          bottomViewStyle={{
            backgroundColor: theme.colors.secondary,
            color: theme.colors.black,
          }}
          topContent={<FoodView />}
          bottomContent={
            <View>
              <Button
                type={'outline'}
                titleStyle={{ color: 'black' }}
                buttonStyle={{
                  marginBottom: spacing.S,
                  borderColor: 'black',
                }}
                containerStyle={{ paddingVertical: spacing.XS }}
                onPress={() => props.toggleScanner()}
                title={t('General.cancel')}
              />
            </View>
          }
        />
      </>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Scanner />
    </View>
  );
};

export default ScanScreen;

const useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.S,
  },
  centerText: {
    fontSize: 18,
    padding: spacing.XS,
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  textBold: {
    fontWeight: '500',
    color: theme.colors.black,
  },
  buttonText: {
    fontSize: 21,
    color: theme.colors.black,
  },
  buttonTouchable: {
    padding: spacing.M,
  },
  whiteText: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 25,
    padding: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
  },
}));
