import React, {useState} from 'react';
import {Platform, ScrollView, View} from 'react-native';
import GItwo from '../../Common/gi';
import {Image, SearchBar, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const SearchGiScreen = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
    searchFilterFunction(search);
  };

  const searchFilterFunction = (text) => {
    if (text.length > 1) {
      const newData = GItwo.filter((item) => {
        const itemData = `${item[locale].toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
    }
  };

  return (
    <ScrollView>
      <SearchBar
        placeholder={t('GI.Search')}
        platform={Platform.OS}
        onChangeText={updateSearch}
        value={search}
      />
      <Text style={{padding: 20}}>{t('GI.IntroText')}</Text>
      {data.map((list, i) => (
        <Text style={{paddingLeft: 10}} key={i}>
          <Text style={{padding: 5, fontWeight: 'bold'}}> {list[locale]}</Text>
          <Text>
            {' '}
            {'\n'} GI = {list.GI}
            {'\n'}
          </Text>
        </Text>
      ))}

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {data.length < 1 ? (
          <Image
            source={require('../../assets/sugar.png')}
            placeholderStyle={{backgroundColor: '#fff'}}
            style={{width: 200, height: 200}}
          />
        ) : null}
      </View>
    </ScrollView>
  );
};

export default SearchGiScreen;
