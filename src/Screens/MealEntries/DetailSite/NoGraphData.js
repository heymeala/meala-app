import React from 'react';
import { TouchableOpacity, View, Dimensions, Button } from "react-native";
import {Image, Text} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import {useNavigation} from '@react-navigation/core';

const NoGraphData = () => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  return (
    <View style={{padding: 20, margin: 'auto', flex: 1, alignItems: 'center'}}>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        onPress={() => navigation.navigate('SettingsStack')}>
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            paddingBottom: 20,
          }}>
          {t('Entries.noDataSource')}
        </Text>
        <Image
          source={require('../../../assets/meala_graph.png')}
          placeholderStyle={{backgroundColor: '#fff'}}
          style={{width: Dimensions.get('window').width, height: 350}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NoGraphData;
