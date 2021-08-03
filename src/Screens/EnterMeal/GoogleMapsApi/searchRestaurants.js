import { GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS } from '@env';
import { Platform } from 'react-native';
import { database } from '../../../Common/database_realm';

const apiKey = Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

export const getLocalDatabaseRestaurants = text => {
  if (text && text.length > 0) {
    return database.fetchRestaurantsWithFilterLimit(text).then(restaurant => {
      if (restaurant.length > 0) {
        const allRestaurantsIsDeleted = restaurant.filter(restaurants => restaurants.isDeleted === false);
        console.log(allRestaurantsIsDeleted);
        return allRestaurantsIsDeleted;
      }
    });
  }
};

export const fetchGoogleRestaurants = (searchString, lat, lng, setLoading) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchString}&location=${lat},${lng}&radius=1000&types=food|restaurant|cafe|meal_takeaway|bar|bakery&key=${apiKey}`;
  console.log(url);
  if (searchString && searchString.length > 3) {
    setLoading(true);
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        return data.results;
      })
      .catch(error => {
        setLoading(false);

        console.log(error);
      });
  }
};
const loadMoreRestaurants = token => {
  const url =
    'https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=' + token + '&key=' + apiKey;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
};
