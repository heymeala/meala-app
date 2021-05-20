import React, { useState } from 'react';
import { FlatList, Platform, View } from 'react-native';
import { Badge, ListItem, makeStyles, SearchBar } from 'react-native-elements';
import { EmptyListPlaces } from './Common/EmtyListPlaces';
import LocalizationContext from '../../../LanguageContext';
import { spacing } from '../../theme/styles';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import { database } from '../../Common/database_realm';

const RestaurantList = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

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

  const showRestaurants = async text => {
    try {
      const allRestaurant = await database.fetchRestaurantsWithFilter(text);
      const allRestaurantsIsDeleted = allRestaurant.filter(restaurants => restaurants.isDeleted === false);
      console.log(allRestaurantsIsDeleted);

      setRestaurants(allRestaurantsIsDeleted);
    } catch (e) {}
  };
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => (
    <View>
      <ListItem
        containerStyle={{ paddingVertical: spacing.L }}
        bottomDivider
        onPress={() =>
          navigation.navigate('MealListView', {
            restaurant_id: item.id,
          })
        }>
        <ListItem.Content>
          <ListItem.Title>{item.restaurant_name}</ListItem.Title>
        </ListItem.Content>
        <Badge
          value={item.food.filter(item => item.isDeleted === false).length}
          badgeStyle={{ backgroundColor: '#bfbfb4' }}
          textStyle={{ color: 'black' }}
          containerStyle={{ marginTop: 0 }}
        />
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
  const updateSearch = search => {
    setSearch(search);
    showRestaurants(search);
  };
  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <>
          {props.controlBar}
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
      ListEmptyComponent={<EmptyListPlaces value={search} navigation={navigation} />}
    />
  );
};

export default RestaurantList;

const useStyles = makeStyles(theme => ({}));
