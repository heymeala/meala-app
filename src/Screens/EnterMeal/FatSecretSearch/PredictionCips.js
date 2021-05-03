import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const PredictionsChips = props => {
  const {chipsArray, setSearch, setChipSearch} = props;
  return chipsArray.map(data => {
    return (
      <View
        key={data.id}
        style={{
          padding: 4,
          marginHorizontal: 2,
          borderRadius: 15,
          backgroundColor: data.active ? '#ffe109' : '#e5e5e5',
        }}>
        <TouchableOpacity
          onPress={() => {
            setSearch(data.name);
            setChipSearch(data.name);
          }}>
          <Text style={{borderRadius: 15}}>{` ${data.name} ${
            data.active ? data.nutritionData + 'g Carbs' : ''
          } `}</Text>
        </TouchableOpacity>
      </View>
    );
  });
};

export default PredictionsChips;
