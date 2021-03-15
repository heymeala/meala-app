import React from 'react';
import Geolocation from '@react-native-community/geolocation';

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        const currentLongitude = Math.abs(
          JSON.stringify(position.coords.longitude),
        );
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        const geoPosition = position;

        resolve(geoPosition);
      },
      // TODO: NO GPS ENABLES
      (error) => {
        return reject(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  });
}
