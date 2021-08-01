import React, { useState } from 'react';
import { Keyboard, View } from "react-native";
import { Button, Input, makeStyles, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import LocalizationContext from '../../../LanguageContext';
import { FEEDBACK_MAIL } from '@env';

const InfoModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { open, setOpen } = props;
  const [message, setMessage] = useState(null);

  function sendFeedback() {
    if (message) {
      fetch(FEEDBACK_MAIL + message).then(() => {
        setOpen(false);
        setMessage(null);
      });
    }
  }

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
          <Text>{t('Map.description')}</Text>
          <Text style={{ marginTop: 12 }}>{t('Map.help')}</Text>
          <Input
            placeholder={t('Settings.yourMessage')}
            numberOfLines={5}
            multiline
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            value={message}
            onChangeText={text => setMessage(text)}
            style={{ height: 70, marginTop: 4 }}
          />

          <View style={styles.buttons}>
            <Button disabled={!message} title={'Nachricht senden'} onPress={() => sendFeedback()} />
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
  buttons: { width: '100%', marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' },
}));
