import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {FAB, Icon, ListItem, makeStyles, Text} from 'react-native-elements';
import {database} from '../Common/database_realm';
import Modal from 'react-native-modal';
import LocalizationContext from '../../LanguageContext';
import {DEVICE_HEIGHT} from '../utils/deviceHeight';
import LottieView from 'lottie-react-native';
import ListItemWithIcon from './MealEntries/Common/ListItemWithIcon';
import {spacing} from '../theme/styles';

const FirstOpenDialog = props => {
  const {t} = React.useContext(LocalizationContext);
  const dimension = Dimensions.get('window');
  const styles = useStyles(dimension);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const firstOpen = await database.getOnboarding();
      if (firstOpen === 1) {
        setOpen(true);
      }
    };
    load();
  }, []);

  function acceptDialog() {
    setOpen(false);
    database.saveOnbording();
  }

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
      propagateSwipe={true}
      onAccessibilityEscape={() => acceptDialog()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.wrapper}>
              <View
                onStartShouldSetResponder={() => true}
                style={styles.container}>
                <LottieView
                  style={styles.animation}
                  source={require('../assets/animations/food_animation.json')}
                  autoPlay
                  loop
                />

                <Text h2 h2Style={styles.text}>
                  {t('Entries.firstOpenDialog.title')}
                </Text>
                <Text>{t('Entries.firstOpenDialog.description')}</Text>
                <Text h4 h4Style={styles.text}>
                  {t('Entries.firstOpenDialog.subtitle')}
                </Text>
                <ListItemWithIcon
                  title={t('Entries.firstOpenDialog.Nightscout')}
                  icon={'nightscout'}
                />
                <ListItemWithIcon
                  title={t('Entries.firstOpenDialog.FatSecret')}
                  icon={'apps'}
                  type={'ionicon'}
                />
                <ListItemWithIcon
                  title={t('Entries.firstOpenDialog.AppleHealth')}
                  icon={'heart'}
                  type={'ionicon'}
                />
                <ListItemWithIcon
                  title={t('Entries.firstOpenDialog.Dexcom')}
                  icon={'dexcom'}
                />
                <ListItemWithIcon
                  title={t('Entries.firstOpenDialog.Tidepool')}
                  icon={'tidepool'}
                  subtitle={t('Entries.firstOpenDialog.wip')}
                />
                <ListItemWithIcon
                  title={t('Entries.firstOpenDialog.Libre')}
                  icon={'libre'}
                  subtitle={t('Entries.firstOpenDialog.wip')}
                />
              </View>
            </View>
          </ScrollView>
          <FAB
            placement={'right'}
            title={'Okay'}
            onPress={() => acceptDialog()}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FirstOpenDialog;

const useStyles = makeStyles((theme, dimensions) => ({
  modal: {marginHorizontal: 0, marginBottom: 0, paddingTop: DEVICE_HEIGHT / 6},
  animation: {height: 150, alignSelf: 'center'},
  centeredView: {
    //  flex: 1,
    justifyContent: 'flex-end',
  },
  wrapper: {
    //flex: 1,
    //flexGrow: 1,
    justifyContent: 'space-between',
    // height: DEVICE_HEIGHT - DEVICE_HEIGHT / 6,
  },
  container: {},
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
  text: {paddingVertical: spacing.S},
}));
