import React from 'react';
import { Linking, View } from 'react-native';
import { Button, makeStyles, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import LocalizationContext from '../../../LanguageContext';

const InfoModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { open, setOpen } = props;
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={open}
      backdropOpacity={0.3}
      onBackdropPress={() => setOpen(false)}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={['down']}
      propagateSwipe={true}
      onAccessibilityEscape={() => setOpen(false)}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text h2 h2Style={{ ...styles.modalText }}>
            {t('Map.title')}
          </Text>
          <Text h3>{t('Map.description')}</Text>
          <Text style={{ marginTop: 12 }}>{t('Map.help')}</Text>
          <View style={styles.buttons}>
            <Button title={t('Map.contact')} onPress={() => Linking.openURL('mailto:mail@heymeala.com')} />
            <Button title={t('General.close')} onPress={() => setOpen(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InfoModal;

const useStyles = makeStyles(theme => ({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    margin: 15,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#ffe109',
    borderRadius: 20,
    padding: 8,
  },
  buttons: { width: '100%', marginTop: 24, flexDirection: 'row', justifyContent: 'space-around' },
}));
