import React, { useRef, useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import Modal from 'react-native-modal';
import { fetchGoogleRestaurants, getLocalDatabaseRestaurants } from '../GoogleMapsApi/searchRestaurants';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import useAutoFocus from '../../../hooks/useAutoFocus';
import FadeInView from '../../../Common/FadeInView';
import OutLineButton from '../../../Common/OutLineButton';
import EmptyPlacesButtons from './EmptyPlacesButtons';

const SearchRestaurantModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [autoFocus, setAutoFocus] = useState(false);
  useAutoFocus(autoFocus, inputRef);

  const searchForRestaurants = async (text, googleSearch) => {
    setSearchText(text);
    const localDatabaseRestaurants = await getLocalDatabaseRestaurants(text);
    const googleRestaurants =
      googleSearch && (await fetchGoogleRestaurants(text, props.lat, props.lng, setLoading));

    const createLocalRestaurantList =
      localDatabaseRestaurants &&
      localDatabaseRestaurants.map(item => {
        return {
          id: item.id,
          name: item.restaurant_name,
          type: item.scope || 'local',
          lat: item.lat,
          lng: item.long,
          address: item.address,
          rating: null,
        };
      });
    const createGoogleRestaurantList =
      googleRestaurants &&
      googleRestaurants.map(item => {
        return {
          id: item.place_id,
          name: item.name,
          type: 'GOOGLE',
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng,
          address: item.formatted_address,
          rating: item.rating,
        };
      });

    let createRestaurant = [
      {
        id: text,
        name: text,
        type: 'local',
        lat: props.lat,
        lng: props.lng,
        address: '',
        rating: '',
      },
    ];

    const mergeLists = (newName, localList, googleList) => {
      if (localList && googleList) {
        return [...newName, ...localList, ...googleList];
      } else if (localList) {
        return [...newName, ...localList];
      } else if (googleList) {
        return [...newName, ...googleList];
      } else if (text && text.length > 0) {
        return [...newName];
      }
    };
    const restaurantsList = mergeLists(
      createRestaurant,
      createLocalRestaurantList,
      createGoogleRestaurantList,
    );
    console.log('list', restaurantsList);
    setRestaurants(restaurantsList);
  };

  const FlatListItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <View>
        <Icon
          size={16}
          name={item.type === 'local' ? 'eat' : 'logo-google'}
          type={item.type === 'local' ? 'meala' : 'ionicon'}
        />
        <Text>{item.rating}</Text>
      </View>
      <ListItem.Content>
        <ListItem.Title h4>{item.name}</ListItem.Title>
        <ListItem.Subtitle>
          {index === 0 ? t('AddMeal.SearchRestaurant.newPlace') : item.address}
        </ListItem.Subtitle>
      </ListItem.Content>
      <Button
        onPress={() => {
          props.handleRestaurantPress(item.name, item.id, item.type);
          setOpen(false);
        }}
        iconRight
        titleStyle={{ fontSize: 10 }}
        icon={<Icon name={'add-circle'} type={'ionicon'} />}
      />
    </ListItem>
  );
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      <TouchableOpacity
        disabled={props.editMode}
        onPress={() => {
          setOpen(true);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={styles.touchContainer}>
            <Icon name={'map'} type={'meala'} size={35} />
          </View>
          <View style={{ flexShrink: 1, paddingLeft: 24, width: '100%' }}>
            <Text style={{ textAlign: 'left', fontFamily: 'SecularOne-Regular' }}>
              {t('AddMeal.SearchRestaurant.where')}
            </Text>
            <Text>{props.restaurantName}</Text>
          </View>
          <View style={styles.editIconContainer}>
            <Icon accessibilityLabel={t('AddMeal.edit')} name={'edit'} />
          </View>
        </View>
      </TouchableOpacity>

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
            <Text h2 style={styles.headline}>
              {t('AddMeal.SearchRestaurant.where')}
            </Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                textContentType={'location'}
                ref={inputRef}
                clearButtonMode={'unless-editing'}
                style={styles.input}
                onBlur={() => {
                  searchForRestaurants(searchText, true);
                }}
                returnKeyType={'search'}
                placeholder={t('AddMeal.SearchRestaurant.searchPlaceHolder')}
                returnKeyLabel={t('AddMeal.SearchRestaurant.search')}
                value={searchText}
                onChangeText={text => searchForRestaurants(text, false)}
              />
              <View style={styles.searchIcon}>
                {searchText && searchText.length > 0 ? (
                  <FadeInView>
                    <Button
                      loading={loading}
                      onPress={() => inputRef.current.blur()}
                      containerStyle={{ borderRadius: 50 }}
                      icon={<Icon size={14} name={'search'} />}
                    />
                  </FadeInView>
                ) : null}
              </View>
            </View>
            <FlatList
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={<EmptyPlacesButtons setOpen={setOpen} />}
              ListFooterComponent={
                loading ? (
                  <LoadingSpinner />
                ) : restaurants && restaurants.length > 1 ? (
                  <Image
                    style={{ margin: 12 }}
                    source={require('../../../assets/powered_by_google_on_white.png')}
                    placeholderStyle={{ backgroundColor: '#fff' }}
                  />
                ) : null
              }
              keyExtractor={keyExtractor}
              data={restaurants}
              renderItem={FlatListItem}
            />
            <OutLineButton type={'clear'} title={t('General.close')} onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchRestaurantModal;

const useStyles = makeStyles(theme => ({
  headline: { margin: theme.spacing.S },
  touchContainer: {
    marginLeft: theme.spacing.M,
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    alignItems: 'center',
    padding: theme.spacing.S,
    textAlignVertical: 'center',

    width: 65,
    height: 65,
  },
  editIconContainer: {
    padding: theme.spacing.S,
    marginRight: theme.spacing.M,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
  modal: { marginHorizontal: 4 },
  searchInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingLeft: 20,
  },
  searchIcon: { margin: 10, height: 30 },
  centeredView: {
    //flex: 1,
    // height:300,
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
