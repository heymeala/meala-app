import React from 'react';
import { makeStyles } from 'react-native-elements';
import MapView from 'react-native-maps';
import LocalizationContext from '../../../LanguageContext';
import { View } from 'react-native';

const Maps = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <MapView
        style={{width: 400, height:400}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
};

export default Maps;

const useStyles = makeStyles(theme => ({
  container: { width: 400, height: 400 , backgroundColor:'#000'},
}));
