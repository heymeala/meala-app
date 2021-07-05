import React, { useEffect, useState } from 'react';
import { makeStyles } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import LocalizationContext from '../../../LanguageContext';
import { View } from 'react-native';
import { getCurrentPosition } from '../../Common/geolocation';
import { database } from '../../Common/database_realm';

const Maps = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [restaurants, setRestaurants] = useState();
  const [region, setRegion] = useState({
    latitude: 48.129449937300365,
    latitudeDelta: 45.430191040185434,
    longitude: 1.9822446629405022,
    longitudeDelta: 74.28584933280945,
  });

  useEffect(() => {
    getCurrentPosition().then(position => {
      console.log(position.coords.latitude);
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.048483043464437,
        longitudeDelta: 0.006705448031425,
      });
    });

    database.fetchRestaurantsWithFilter('').then(data => {
      console.log(data);
      setRestaurants(data);
    });
  }, []);

  const data = [{ latlng: { latitude: 52, longitude: 13 }, title: 'Test', description: 'Woo' }];

  return (
    <View style={styles.container}>
      <MapView onRegionChange={event => console.log(event)} style={styles.map} region={region}>
        {restaurants &&
          restaurants
            .filter(data => data.lat && data.long)
            .map((restaurant, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
                  title={restaurant.restaurant_name}
                  description={restaurant.id}
                />
              );
            })}
      </MapView>
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
}));
