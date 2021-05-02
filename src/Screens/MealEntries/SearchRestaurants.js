import React, {useEffect, useState} from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import {database} from '../../Common/database_realm';
import {Badge, ListItem, makeStyles, SearchBar} from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SearchByDate from './SearchByDate';
import SearchLatestMeals from './SearchLatestMeals';
import {EmptyListHome} from './Common/EmtyListHome';
import {useFocusEffect} from '@react-navigation/core';
import {spacing} from '../../theme/styles';
import FirstOpenDialog from '../FirstOpenDialog';
import {EmptyListPlaces} from './Common/EmtyListPlaces';

const SearchRestaurants = ({navigation}, props) => {
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

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
        containerStyle={{paddingVertical:spacing.L}}
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

  const SegmentedController = function () {
    return (
      <View style={styles.container}>
        <SegmentedControlTab
          values={[t('Entries.Meals'), t('Entries.Places'), t('Entries.Date')]}
          accessibilityLabels={[
            `${t('Entries.Meals')} ${t('Accessibility.Home.button')}`,
            `${t('Entries.Places')} ${t('Accessibility.Home.button')}`,
            `${t('Entries.Date')} ${t('Accessibility.Home.button')}`,
          ]}
          borderRadius={45}
          tabsContainerStyle={styles.tabContainer}
          tabStyle={styles.inactiveTab}
          activeTabStyle={styles.activeTab}
          tabTextStyle={styles.inactiveTabText}
          activeTabTextStyle={styles.activeTabText}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
        />
      </View>
    );
  };

  return selectedIndex === 0 ? (
    <>
      <FirstOpenDialog />
      <SearchLatestMeals controlBar={<SegmentedController />} />
    </>
  ) : selectedIndex === 1 ? (
    <FlatList
      contentContainerStyle={{flexGrow: 1}}
      contentInsetAdjustmentBehavior="automatic"
      ListHeaderComponent={
        <>
          <SegmentedController />
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
  ) : selectedIndex === 2 ? (
    <SearchByDate
      navigation={navigation}
      controlBar={<SegmentedController />}
    />
  ) : null;
};

export default SearchRestaurants;
const useStyles = makeStyles(theme => ({
  container: {
    padding: spacing.XS,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  inactiveTab: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  activeTabText: {color: theme.colors.white},
  inactiveTabText: {
    color: theme.colors.primary,
  },
  tabContainer: {
    height: 40,
    backgroundColor: theme.colors.white,
  },
}));
