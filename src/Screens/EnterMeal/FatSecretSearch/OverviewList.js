import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {searchFatSecret} from './searchFatSecretHelper';
import LocalizationContext from '../../../../LanguageContext';

const FatSecretOverviewList = props => {
  const {t} = React.useContext(LocalizationContext);

  const {data, toggleList, setFoodDetailData} = props;
  return (
    <TouchableOpacity
      style={{padding: 8}}
      key={data.food_id}
      accessibilityRole={'button'}
      onPress={() =>
        searchFatSecret(data.food_id, toggleList, t, setFoodDetailData)
      }>
      <View style={{paddingBottom: 5}}>
        <Text accessibilityRole={'header'} style={{fontWeight: 'bold'}}>
          {data.food_name}
          {data.brand_name && ' – ' + data.brand_name}
        </Text>
        <Text>{data.food_description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FatSecretOverviewList;
