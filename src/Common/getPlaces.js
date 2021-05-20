import React from 'react';
import { getCurrentPosition } from './geolocation';
import { GOOGLE_API_KEY_IOS, GOOGLE_API_KEY_ANDROID } from '@env';
import { Platform } from 'react-native';
export default function getPlaces() {
  const apiKey = Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;
  getCurrentPosition()
    .then(position =>
      fetch(
        'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
          JSON.stringify(position.coords.latitude) +
          ',' +
          JSON.stringify(position.coords.longitude) +
          '&radius=200&types=food|restaurant|cafe|meal_takeaway|bar|bakery&key=' +
          apiKey,
      ),
    )
    .then(response => response.json())
    .then(data => {
      return data.results;
    })
    .catch(message => {
      console.warn('GPS', message);
    });
}
