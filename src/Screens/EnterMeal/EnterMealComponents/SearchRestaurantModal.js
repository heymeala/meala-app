import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { Button, Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import Modal from 'react-native-modal';
import { fetchGoogleRestaurants } from '../GoogleMapsApi/searchRestaurants';

const SearchRestaurantModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  const searchForRestaurants = async text => {
    const googleRestaurants = await fetchGoogleRestaurants(text, props.lat, props.lng);
    console.log(googleRestaurants);
    setRestaurants(googleRestaurants);
  };

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ backgroundColor: '#99ff88' }}>
          <Icon name={'search'} />
        </View>
        <View>
          <Text>Wo isst Du?</Text>
          <Text>Zuhause</Text>
        </View>
        <Button title={'Bearbeiten'} onPress={() => setOpen(true)} />
      </View>

      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={open}
        backdropOpacity={0.3}
        onBackdropPress={() => setOpen(false)}
        //  onSwipeComplete={() => setOpen(false)}
        //  swipeDirection={['down']}
        // propagateSwipe={true}
        style={styles.modal}
        onAccessibilityEscape={() => setOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              clearButtonMode={'while-editing'}
              style={styles.input}
              returnKeyType={'search'}
              returnKeyLabel={'Search'}
              //  enablesReturnKeyAutomatically={true}
              value={searchText}
              //   platform={Platform.OS}
              onChangeText={text => searchForRestaurants(text)}
            />
            <ScrollView>
              {restaurants && restaurants.length > 0 ? (
                restaurants.map((item, index) => (
                  <ListItem bottomDivider key={index}>
                    <ListItem.Content>
                      <ListItem.Title>{item.name}</ListItem.Title>
                      <ListItem.Subtitle>{item.formatted_address}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                ))
              ) : (
                <View>
                  <Text>Trage den Ort ein an dem Du isst</Text>
                </View>
              )}
            </ScrollView>
            <View style={styles.buttonsContainer}>
              <Button type={'clear'} title={t('General.close')} onPress={() => setOpen(false)} />
              <Button type={'clear'} title={t('AddMeal.save')} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchRestaurantModal;

const useStyles = makeStyles(theme => ({
  modal: { marginHorizontal: 4 },
  input: {
    height: 40,
    margin: 12,
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  centeredView: {
    //flex: 1,
    // height:300,
    justifyContent: 'center',
  },
  modalView: {
    margin: theme.spacing.S,
    backgroundColor: 'white',
    height: '90%',
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

  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    margin: theme.spacing.XS,
  },
}));
