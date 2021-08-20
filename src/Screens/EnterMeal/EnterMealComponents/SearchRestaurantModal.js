import React, { useRef, useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { fetchGoogleRestaurants, getLocalDatabaseRestaurants } from '../GoogleMapsApi/searchRestaurants';
import FadeInView from '../../../Common/FadeInView';
import EmptyPlacesButtons from './EmptyPlacesButtons';
import OutLineButton from '../../../Common/OutLineButton';
import Modal from 'react-native-modal';
import EditIcon from './EditIcon';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import IconView from './IconView';

const SearchRestaurantModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [autoFocus, setAutoFocus] = useState(false);
  const [googleRestaurantList, setGoogleRestaurantList] = useState();
  //useAutoFocus(autoFocus, inputRef);

  const searchForRestaurants = async (text, googleSearch) => {
    setSearchText(text);
    const localDatabaseRestaurants = await getLocalDatabaseRestaurants(text);
    const googleRestaurants =
      text && text.length > 3 ? await fetchGoogleRestaurants(text, props.lat, props.lng, setLoading) : null;

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
    setGoogleRestaurantList(
      googleRestaurants &&
        googleRestaurants.map(item => {
          return {
            id: item.place_id,
            name: item.name,
            type: 'GOOGLE',
            lat: item.lat,
            lng: item.long,
            address: item.formatted_address,
            rating: item.rating,
          };
        }),
    );

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

    const googleDividerItem = [{ id: 'googleDivider', name: 'Google Places', type: 'divider' }];
    const localDividerItem = [{ id: 'localDivider', name: 'Eigene Orte', type: 'divider' }];

    const mergeLists = (newName, localList, googleList, googleDivider, localDividerItem) => {
      return [
        ...((text && text.length > 0 && newName) || []),
        ...(localList || []),
        ...(googleList || []),
      ];
    };
    const restaurantsList = mergeLists(
      createRestaurant,
      createLocalRestaurantList,
      googleRestaurantList,
      googleDividerItem,
      localDividerItem,
    );
    console.log('list', restaurantsList);
    setRestaurants(restaurantsList);
  };

  const FlatListItem = ({ item, index }) => (
    <TouchableOpacity
      accessibilityRole={'button'}
      disabled={item.type === 'divider'}
      onPress={() => {
        props.handleRestaurantPress(item.name, item.id, item.type);
        setOpen(false);
      }}>
      <ListItem
        containerStyle={item.type === 'divider' ? { backgroundColor: '#e2e2e2' } : null}
        bottomDivider>
        <View>
          {item.type !== 'divider' ? (
            <Icon
              accessibilityLabel={
                item.type === 'local'
                  ? t('Accessibility.EnterMeal.ownEntry')
                  : t('Accessibility.EnterMeal.googlePlace')
              }
              size={14}
              name={item.type === 'local' ? 'eat' : 'logo-google'}
              type={item.type === 'local' ? 'meala' : 'ionicon'}
            />
          ) : null}
          {item.rating && item.type !== 'divider' ? (
            <Text
              accessibilityLabel={item.rating + t('Accessibility.EnterMeal.rating')}
              style={{ fontSize: 10 }}>
              {item.rating}
            </Text>
          ) : null}
        </View>
        <ListItem.Content>
          <ListItem.Title h4>{item.name}</ListItem.Title>
          {item.address || index === 0 ? (
            <ListItem.Subtitle>
              {index === 0 ? t('AddMeal.SearchRestaurant.newPlace') : item.address}
            </ListItem.Subtitle>
          ) : null}
        </ListItem.Content>
        {index === 0 ? <Icon name={'add-circle'} type={'ionicon'} /> : null}
      </ListItem>
    </TouchableOpacity>
  );
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      <TouchableOpacity
        accessibilityRole={'button'}
        disabled={props.editMode}
        onPress={() => {
          setOpen(true);
        }}>
        <View style={props.editMode ? { ...styles.container, opacity: 0.3 } : { ...styles.container }}>
          <IconView iconName={'map'} iconType={'meala'} size={35} />

          <View style={{ flexShrink: 1, paddingLeft: 24, width: '100%' }}>
            <Text style={{ textAlign: 'left', fontFamily: 'SecularOne-Regular' }}>
              {t('AddMeal.SearchRestaurant.name')}
            </Text>
            <Text>{props.restaurantName}</Text>
          </View>
          <EditIcon />
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
              {t('AddMeal.SearchRestaurant.name')}
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
                      accessibilityLabel={t('Accessibility.EnterMeal.search')}
                      loading={loading}
                      buttonStyle={{ paddingHorizontal: 16 }}
                      onPress={() => inputRef.current.blur()}
                      containerStyle={{ borderRadius: 50 }}
                      icon={<Icon size={17} name={'search'} />}
                    />
                  </FadeInView>
                ) : null}
              </View>
            </View>
            <FlatList
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <EmptyPlacesButtons handleRestaurantPress={props.handleRestaurantPress} setOpen={setOpen} />
              }
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
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
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
    marginLeft: 20,
    flex: 1,
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
