import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import LocalizationContext from '../../../LanguageContext';
import { View } from 'react-native';
import { getCurrentPosition } from '../../Common/geolocation';
import { COMMUNITY_RESTAURANTS } from '@env';
import { database } from '../../Common/database_realm';
import InfoModal from './InfoModal';
import LoadingSpinner from '../../Common/LoadingSpinner';
import { makeStyles } from 'react-native-elements';
import { checkAPI } from '../../utils/checkAPI';

const Maps = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [restaurants, setRestaurants] = useState();
  const [ownRestaurants, setOwnRestaurants] = useState();
  const [open, setOpen] = useState(false);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    getCurrentPosition()
      .then(position => {
        //  console.log(position.coords.latitude);
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.048483043464437,
          longitudeDelta: 0.006705448031425,
        });
      })
      .catch(() => {
        console.log('GPS no access');
        setRegion({
          latitude: 48.129449937300365,
          latitudeDelta: 45.430191040185434,
          longitude: 1.9822446629405022,
          longitudeDelta: 74.28584933280945,
        });
      });

    database.fetchRestaurantsWithFilter('').then(data => {
      console.log(data);
      setOwnRestaurants(data);
    });

    checkAPI('COMMUNITY_RESTAURANTS', COMMUNITY_RESTAURANTS);
    fetch(COMMUNITY_RESTAURANTS)
      .then(response => response.json())
      .then(data => {
        setRestaurants(data);
      });
  }, []);

  const data = [{ latlng: { latitude: 52, longitude: 13 }, title: 'Test', description: 'Woo' }];

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <MapView style={styles.map} initialRegion={region}>
            {ownRestaurants &&
              ownRestaurants
                .filter(item => {
                  return item.lat != null && item.long != null;
                })
                .map((restaurant, index) => {
                  return (
                    <Marker
                      onPress={() => setOpen(true)}
                      key={index}
                      tracksViewChanges={false}
                      coordinate={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                      }}
                      title={restaurant.restaurant_name}>
                      <View style={styles.ownMarker} />
                    </Marker>
                  );
                })}
            {restaurants &&
              restaurants
                .filter(data => {
                  return data.lat != null && data.lng != null;
                })
                .map((restaurant, index) => {
                  const latitude = parseFloat(restaurant.lat);
                  const longitude = parseFloat(restaurant.lng);
                  return (
                    <Marker
                      onPress={() => setOpen(true)}
                      key={index}
                      tracksViewChanges={false}
                      coordinate={{
                        latitude: latitude,
                        longitude: longitude,
                      }}
                      title={restaurant.restaurant_name}>
                      <View style={styles.marker} />
                    </Marker>
                  );
                })}
          </MapView>
          <InfoModal open={open} setOpen={setOpen} />
        </>
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
};

export default Maps;

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  marker: { width: 20, height: 20, borderRadius: 10, opacity: 0.7, backgroundColor: theme.colors.primary },
  ownMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.7,
    backgroundColor: theme.colors.secondary,
  },
}));
