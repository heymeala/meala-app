import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import Modal from 'react-native-modal';

export const ScannerModalResults = props => {
  const [visible, setVisible] = useState(false);
  const { t, locale } = React.useContext(LocalizationContext);

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', padding: 8 }}>
        <TouchableOpacity style={{ ...styles.openButton }} onPress={() => setVisible(true)}>
          <Text style={{ padding: 6, color: '#fff' }}>{t('AddMeal.tag.addTag')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.centeredView}>
        <Modal
          animationIn="slideInUp"
          animationOut="slideOutDown"
          isVisible={visible}
          backdropOpacity={0.3}
          onBackdropPress={() => setVisible(false)}
          onSwipeComplete={() => setVisible(false)}
          swipeDirection={['down']}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ ...styles.modalText, fontWeight: 'bold' }}>{t('AddMeal.tag.addATag')}</Text>
              <Text style={styles.modalText}>{t('AddMeal.tag.findTag')}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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
