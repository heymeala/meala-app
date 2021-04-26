import React, {useEffect, useState} from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import {database} from '../../Common/database_realm';
import {Badge, ListItem, SearchBar} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SearchByDate from './SearchByDate';
import SearchLatestMeals from './SearchLatestMeals';
import {EmptyListComponent} from './Common/EmtyList';
import {useFocusEffect} from '@react-navigation/core';

const SearchRestaurants = ({navigation}, props) => {
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {t, locale} = React.useContext(LocalizationContext);

  const handleIndexChange = index => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      database.deleteMeal();
      database.deleteRestaurant();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      if (isMounted) {
        showRestaurants(search);
      }
      return () => {
        isMounted = false;
      };
    }, []),
  );

  const updateSearch = search => {
    setSearch(search);
    showRestaurants(search);
  };

  const showRestaurants = async text => {
    try {
      const allRestaurant = await database.fetchRestaurantsWithFilter(text);
      const allRestaurantsIsDeleted = allRestaurant.filter(
        restaurants => restaurants.isDeleted === false,
      );
      setRestaurants(allRestaurantsIsDeleted);
    } catch (e) {}
  };

  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => (
    <View>
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate('MealListView', {restaurant: item})}>
        <ListItem.Content>
          <ListItem.Title>{item.restaurant_name}</ListItem.Title>
        </ListItem.Content>
        <Badge
          value={item.food.filter(item => item.isDeleted === false).length}
          badgeStyle={{backgroundColor: '#bfbfb4'}}
          textStyle={{color: 'black'}}
          containerStyle={{marginTop: 0}}
        />
        <ListItem.Chevron />
      </ListItem>
    </View>
  );

  function segmentedController() {
    return (
      <View style={{padding: 5, flex: 1, backgroundColor: '#fff'}}>
        <SegmentedControlTab
          values={[t('Entries.Meals'), t('Entries.Places'), t('Entries.Date')]}
          accessibilityLabels={[
            `${t('Entries.Meals')} ${t('Accessibility.Home.button')}`,
            `${t('Entries.Places')} ${t('Accessibility.Home.button')}`,
            `${t('Entries.Date')} ${t('Accessibility.Home.button')}`,
          ]}
          borderRadius={45}
          tabsContainerStyle={{
            height: 40,
            backgroundColor: '#ffffff',
          }}
          tabStyle={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#154d80',
          }}
          activeTabStyle={{
            backgroundColor: '#154d80',
            borderWidth: 1,
            borderColor: '#154d80',
          }}
          tabTextStyle={{color: '#154d80'}}
          activeTabTextStyle={{color: '#fff'}}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
        />
      </View>
    );
  }

  return selectedIndex === 0 ? (
    <SearchLatestMeals controlBar={segmentedController()} />
  ) : selectedIndex === 1 ? (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <>
          {segmentedController()}
          <SearchBar
            platform={Platform.OS}
            placeholder={t('Entries.Search')}
            onChangeText={updateSearch}
            value={search}
          />
        </>
      }
      data={restaurants}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyListComponent navigation={navigation} />}
    />
  ) : selectedIndex === 2 ? (
    <SearchByDate navigation={navigation} controlBar={segmentedController()} />
  ) : null;
};

export default SearchRestaurants;
