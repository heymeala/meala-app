import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Divider, Text} from 'react-native-elements';
import React from 'react';

export const ExistingRestaurants = () => {
  this.state.Restaurant !== '' ? (
    !this.state.isLoadingDatabase ? (
      props.placesFiltered != null ? (
        props.placesFiltered.map((items) => (
          <View key={items.id}>
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
        ))
      ) : null
    ) : (
      <ActivityIndicator />
    )
  ) : null;
};
