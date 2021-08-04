import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { makeStyles } from 'react-native-elements';
import Modal from 'react-native-modal';
import OutLineButton from '../../../../Common/OutLineButton';
import LocalizationContext from '../../../../../LanguageContext';
import EmptyPlacesButtons from '../EmptyPlacesButtons';
import LoadingSpinner from '../../../../Common/LoadingSpinner';
import PoweredByFatSecret from '../../../../Common/fatsecret/PoweredByFatSecret';
import MealNameListItem from './List';
import CustomMealEditButton from './CustomMealEditButton';
import CustomMealSearchBar from './CustomMealSearchBar';

const EnterMealNameModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState(null);

  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      <CustomMealEditButton setOpen={setOpen} mealName={props.mealName} />
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={open}
        backdropOpacity={0.3}
        onModalShow={() => setAutoFocus(true)}
        onModalHide={() => setAutoFocus(false)}
        onBackdropPress={() => setOpen(false)}
        style={styles.modal}
        onAccessibilityEscape={() => setOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomMealSearchBar loading={loading} autoFocus={autoFocus} setMeals={setMeals} />
            <FlatList
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <EmptyPlacesButtons handleRestaurantPress={props.handleRestaurantPress} setOpen={setOpen} />
              }
              ListFooterComponent={
                loading ? <LoadingSpinner /> : meals && meals.length > 1 ? <PoweredByFatSecret /> : null
              }
              keyExtractor={keyExtractor}
              data={meals}
              renderItem={listInfo => (
                <MealNameListItem
                  listInfo={listInfo}
                  handleInputMealChange={props.handleInputMealChange}
                  setOpen={setOpen}
                />
              )}
            />
            <OutLineButton type={'clear'} title={t('General.close')} onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EnterMealNameModal;

const useStyles = makeStyles(theme => ({
  modal: { marginHorizontal: 4 },
  centeredView: {
    justifyContent: 'center',
  },
  modalView: {
    margin: theme.spacing.S,
    backgroundColor: 'white',
    height: '95%',
    borderRadius: 20,
    padding: theme.spacing.S,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}));
