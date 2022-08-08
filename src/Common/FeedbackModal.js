import React, { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { Button, Input, makeStyles, Text } from 'react-native-elements';
import Modal from 'react-native-modal';
import { FEEDBACK_MAIL } from '@env';
import LocalizationContext from '../../LanguageContext';
import { checkAPI } from '../utils/checkAPI';

const FeedbackModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { open, setOpen, feedbackTitle, feedbackDescription } = props;
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function sendFeedback() {
    if (message) {
      setLoading(true);
      checkAPI('FEEDBACK_MAIL', FEEDBACK_MAIL);
      fetch(FEEDBACK_MAIL + message).then(() => {
        setLoading(false);
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
            {feedbackTitle}
          </Text>
          <Text>{feedbackDescription}</Text>
          <Input
            placeholder={t('Settings.yourMessage')}
            numberOfLines={5}
            multiline
            value={message}
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onChangeText={text => setMessage(text)}
            style={{ height: 70, marginTop: 4 }}
          />

          <View style={styles.buttons}>
            <Button
              loading={loading}
              disabled={!message}
              title={t('Settings.sendMessage')}
              onPress={() => sendFeedback()}
            />
            <Button title={t('General.close')} onPress={() => setOpen(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;

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
