import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {FAB, Icon, makeStyles, Text} from 'react-native-elements';
import {database} from '../Common/database_realm';
import Modal from 'react-native-modal';
import LocalizationContext from '../../LanguageContext';
import {DEVICE_HEIGHT} from '../utils/deviceHeight';

const FirstOpenDialog = props => {
  const {t} = React.useContext(LocalizationContext);
  const dimension = Dimensions.get('window');
  const styles = useStyles(dimension);
  const [open, setOpen] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef();
  useEffect(() => {
    const load = async () => {
      const firstOpen = await database.getOnboarding();
      if (firstOpen >= 1) {
        setOpen(true);
      }
    };
    load();
  }, []);

  function acceptDialog() {
    setOpen(false);
    database.saveOnbording();
  }

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={open}
      style={styles.modal}
      backdropOpacity={0.3}
      onBackdropPress={() => acceptDialog()}
      onSwipeComplete={() => acceptDialog()}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={50} // content height - ScrollView height
      propagateSwipe={true}
      onAccessibilityEscape={() => acceptDialog()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}>
            <View style={styles.wrapper}>
              <View style={styles.container}>
                <Text h3>Alles an einem Ort</Text>
                <Text>
                  Es gibt bereits viele Apps mit denen du deine aktivitäten
                  tracken kannst. Einige davon haben wir integriert, damit du
                  alle Informationen an einem Ort hast. Dies hilft dir die
                  Auswirkungen deiner Mahlzeiten besser zu verstehen. Um diese
                  Daten in meala zu sehen, musst du die Apps in den
                  Einstellungen verknüpfen.
                </Text>
                <Text h4>Aktuell kannst du folgende Daten anbinden:</Text>
                <Text>Nightscout</Text>
                <Icon name={'eat'} type={'meala'} size={30} />
                <Text>Dexcom USA </Text>
                <Text>FatSecret</Text>
                <Text>HealthKit</Text>
                <Text>Tidepool</Text>
                <Text>Libre</Text>
              </View>
              <View style={styles.button}>
                <FAB
                  placement={'right'}
                  title={'Okay'}
                  onPress={() => acceptDialog()}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FirstOpenDialog;

const useStyles = makeStyles((theme, dimensions) => ({
  modal: {marginHorizontal: 0, marginVertical: 0},
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrapper: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-between',
    height: DEVICE_HEIGHT - DEVICE_HEIGHT / 4,
  },
  container: {},
  button: {},
  modalView: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
}));
