import {Button, Divider, Input, Text} from 'react-native-elements';
import {
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LocalizationContext from '../../../../LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {database} from '../../../Common/database_realm';
import {useScreenReader} from '../../../hooks/useScreenReaderEnabled';
import {GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS} from '@env';

const RestaurantInputField = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [toggleFocus, setToggleFocus] = useState(false);
  const [isLoadingGooglePlaces, setIsLoadingGooglePlaces] = useState(true);
  const [isLoadingDatabase, setIsLoadingDatabase] = useState(true);

  const apiKey =
    Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

  //todo: loading indicator
  const [placesFiltered, setPlacesFiltered] = useState([]);
  const [googlePlaces, setGooglePlaces] = useState([]);
  const [googlePlacesFiltered, setGooglePlacesFiltered] = useState([]);
  const [token, setToken] = useState(null);

  const screenReaderEnabled = useScreenReader();
  const RestaurantInput = useRef();

  const handleFocus = () => setToggleFocus((prevState) => !prevState);

  function getAllRestaurants(text) {
    if (text.length > 0) {
      return database
        .fetchRestaurantsWithFilterLimit(text)
        .then((allRestaurant) => {
          if (allRestaurant.length > 0) {
            const allRestaurantsIsDeleted = allRestaurant.filter(
              (restaurants) => restaurants.isDeleted === false,
            );
            console.log(allRestaurantsIsDeleted);
            setPlacesFiltered((prevState) => allRestaurantsIsDeleted);
          }
          setIsLoadingDatabase((prevState) => false);
        });
    } else {
      return setIsLoadingDatabase(false);
    }
  }

  const getAllPlaces = (searchString) => {
    fetch(
      'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' +
        searchString +
        '&location=' +
        props.lat +
        ',' +
        props.lng +
        '&radius=1000&types=food|restaurant|cafe|meal_takeaway|bar|bakery&key=' +
        apiKey,
    )
      .then((response) => response.json())
      .then((data) => {
        setGooglePlaces((prevState) => data.results);
        setGooglePlacesFiltered((prevState) => data.results);
        setToken((prevState) => data.next_page_token);
        setIsLoadingGooglePlaces((prevState) => false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loadMoreRestaurants = () => {
    const refreshToken =
      'https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=' +
      token +
      '&key=' +
      apiKey;

    fetch(refreshToken)
      .then((response) => response.json())
      .then((data) => {
        setGooglePlaces(googlePlaces.concat(data.results));
        setGooglePlacesFiltered(googlePlacesFiltered.concat(data.results));
        setToken(data.next_page_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchFilterFunction = (text) => {
    getAllRestaurants(text);
    props.handleRestaurantName(text);
    text.length > 3 ? getAllPlaces(text) : null;
    if (googlePlaces > 0) {
      const googlePlacesFiltered = googlePlaces.filter((item) => {
        const itemData = `${item.name.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setGooglePlacesFiltered(googlePlacesFiltered);
    }
  };

  const icon = {
    type: 'ionicon',
    name: 'location-sharp',
    containerStyle: {paddingRight: 10},
    iconStyle: {color: '#154d80'},
  };
  return (
    <View>
      {props.gpsEnabled ? null : (
        <TouchableOpacity onPress={() => Linking.openSettings()}>
          <Text style={{color: 'red', padding: 8}}>
            {t('AddMeal.gpsPermission')}
          </Text>
        </TouchableOpacity>
      )}
      <Input
        ref={RestaurantInput}
        onFocus={handleFocus}
        renderErrorMessage={!screenReaderEnabled}
        // accessibilityLabel={t('Accessibility.EnterMeal.restaurant')}
        autoCorrect={false}
        inputContainerStyle={style.inputPadding}
        inputStyle={{fontSize: 20}}
        placeholder={t('AddMeal.RestaurantInput')}
        leftIcon={!screenReaderEnabled && icon}
        onChangeText={(text) => searchFilterFunction(text)}
        value={props.restaurantName}
        onBlur={handleFocus}
        errorMessage={props.errorMessage ? props.errorMessage : null}
      />
      <View style={{paddingBottom: 20}}>
        {toggleFocus &&
          placesFiltered.map((items, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() =>
                  props.handleRestaurantPress(
                    items.restaurant_name,
                    items.id,
                    'Own',
                  )
                }>
                <View style={{flexDirection: 'row', padding: 5}}>
                  <Icon
                    style={{paddingTop: 3}}
                    color="#F9DE1C"
                    name="ios-add"
                    size={20}
                  />
                  <Text style={{padding: 5}}>{items.restaurant_name}</Text>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        {toggleFocus &&
          googlePlacesFiltered.map((items) => (
            <View key={items.place_id}>
              <TouchableOpacity
                onPress={() =>
                  props.handleRestaurantPress(
                    items.name,
                    items.place_id,
                    'GOOGLE',
                  )
                }>
                <View style={{flexDirection: 'row', padding: 5}}>
                  <Icon
                    style={{paddingTop: 3}}
                    color="#F9DE1C"
                    name="logo-google"
                    size={20}
                  />
                  <Text style={{padding: 5}}>{items.name} </Text>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 10, padding: 5}}>
                      {items.formatted_address}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          ))}
        <View style={{alignItems: 'center'}}>
          {toggleFocus && props.restaurantName.length > 0 && token ? (
            <Button
              type="clear"
              titleStyle={{fontSize: 12, color: '#171f33'}}
              onPress={() => loadMoreRestaurants()}
              title="weitere Restaurants laden"
            />
          ) : null}

          {googlePlacesFiltered.length > 0 && toggleFocus ? (
            <Image
              style={{margin: 5}}
              source={require('../../../assets/powered_by_google_on_white.png')}
              placeholderStyle={{backgroundColor: '#fff'}}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};
export default RestaurantInputField;

const style = StyleSheet.create({
  inputPadding: {
    borderRadius: 6,
    height: 56,
  },
});
