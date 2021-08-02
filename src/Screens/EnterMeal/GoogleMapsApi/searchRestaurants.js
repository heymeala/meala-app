import { GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS } from '@env';
import { Platform } from 'react-native';

const apiKey = Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

export const fetchGoogleRestaurants = (searchString, lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchString}&location=${lat},${lng}&radius=1000&types=food|restaurant|cafe|meal_takeaway|bar|bakery&key=${apiKey}`;
  console.log(url);
  if (searchString && searchString.length > 2) {
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data.results;
      })
      .catch(error => {
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
