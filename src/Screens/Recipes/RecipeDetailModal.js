import React from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {FAB, makeStyles} from 'react-native-elements';
import Modal from 'react-native-modal';
import {DEVICE_HEIGHT} from '../../utils/deviceHeight';
import {spacing} from '../../theme/styles';
import RecipeDetails from './RecipeDetails';
import LocalizationContext from '../../../LanguageContext';
import PoweredByFatSecret from '../../Common/fatsecret/PoweredByFatSecret';

const RecipeDetailModal = props => {
  const {t} = React.useContext(LocalizationContext);
  const dimension = Dimensions.get('window');
  const styles = useStyles(dimension);
  const {open, setOpen, recipe} = props;

  function acceptDialog() {
    setOpen(false);
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
              <View onStartShouldSetResponder={() => true} style={styles.container}>
                <RecipeDetails recipe={recipe} />
              </View>
              <PoweredByFatSecret />
            </View>
          </ScrollView>
          <FAB placement={'right'} title={'Okay'} onPress={() => acceptDialog()} />
        </View>
      </View>
    </Modal>
  );
};

export default RecipeDetailModal;

const useStyles = makeStyles((theme, dimensions) => ({
  modal: {marginHorizontal: 0, marginBottom: 0, paddingTop: DEVICE_HEIGHT / 6},
  animation: {height: 150, alignSelf: 'center'},
  centeredView: {
    //  flex: 1,
    //justifyContent: 'flex-end',
  },
  wrapper: {
    //flex: 1,
    //flexGrow: 1,
    //  justifyContent: 'space-between',
    // height: DEVICE_HEIGHT - DEVICE_HEIGHT / 6,
  },
  container: {},
  modalView: {
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  text: {paddingVertical: spacing.S},
}));
