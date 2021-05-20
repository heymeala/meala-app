import React from 'react';
import { SafeAreaView, FlatList, Text, View, TouchableHighlight } from 'react-native';

function Item({ title, onPress }) {
  return (
    <TouchableHighlight onPress={() => onPress}>
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
}

function GetPlacesNearby(props) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.places}
        renderItem={({ item }) => <Item onPress={props.onPress} title={item.name} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

export default GetPlacesNearby;
