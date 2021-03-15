import React, {useState} from 'react';
import {
  Dimensions,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Image, Text} from 'react-native-elements';
import QRCodeScanner from 'react-native-qrcode-scanner';
import LocalizationContext from '../../../LanguageContext';
import ScannerResults from './EnterMealComponents/Scanner/ScannerResults';
import Modal from 'react-native-modal';

const ScanScreen = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [data, setData] = useState('');
  const [status, setStatus] = useState(true);
  const [openModal, setModal] = useState(false);

  const newEntry = () => {
    const carbs = data.nutriments && data.nutriments.carbohydrates_100g;
    const meal = data.product_name && data.product_name;
    const serving =
      data.serving_size &&
      t('BarCode.portion', {weight: data.serving_size}) + '\n';
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
    props.handleScannerFood({carbs: carbs, meal: meal, note: note});
    props.toggleScanner();
  };

  const onSuccess = (e) => {
    fetch('https://world.openfoodfacts.org/api/v0/product/' + e.data + '.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 0) {
          setStatus(false);
          setTimeout(() => setStatus(true), 3000);
        } else {
          setData(data.product);
          setStatus(true);
          setModal(true);
        }
      });
  };

  const FoodView = () => {
    return data.product_name === undefined || data.product_name === '' ? (
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 8,
                }}>
                <TouchableOpacity
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#ffffff',
                    color: '#000',
                    minWidth: 100,
                  }}
                  onPress={() => setModal(false)}>
                  <Text style={styles.textStyle}>{t('General.close')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.openButton,
                    backgroundColor: '#ffe109',
                    color: '#000',
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
          style={{flex: 1}}
          notAuthorizedView={
            <>
              <Text>{t('AddMeal.Permission')}</Text>
              <Button
                buttonStyle={{backgroundColor: '#000'}}
                title={t('AddMeal.grantPermission')}
                onPress={() => Linking.openSettings()}
              />
            </>
          }
          customMarker={
            <Image
              source={require('../../assets/marker.png')}
              style={{width: Dimensions.get('window').width - 50, height: 45}}
            />
          }
          cameraStyle={{height: 240, overflow: 'hidden'}}
          topViewStyle={{
            backgroundColor: '#474747',
            color: '#fff',
            zIndex: 1000,
              justifyContent:"flex-end",
              paddingBottom: 18,
          }}
          containerStyle={{backgroundColor: '#FFCE00'}}
          bottomViewStyle={{backgroundColor: '#FFCE00', color: '#000'}}
          topContent={<FoodView />}
          bottomContent={
            <View>
              <Button
                type={'outline'}
                titleStyle={{color: 'black'}}
                buttonStyle={{
                  marginBottom: 10,
                  borderColor: 'black',
                }}
                containerStyle={{paddingVertical: 5}}
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
    <View style={{flex: 1}}>
      <Scanner />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    padding: 3,
    color: '#fff',
    fontWeight: 'bold',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,0,0)',
  },
  buttonTouchable: {
    padding: 16,
  },
  whiteText: {
    color: '#ffffff',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#154d80',
    color: '#fff',
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
});
