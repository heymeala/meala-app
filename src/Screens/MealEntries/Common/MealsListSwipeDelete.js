import React from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import MealItemList from '../../../Components/MealItemList';
import {EmptyListHome} from './EmtyListHome';
import {useNavigation} from '@react-navigation/core';
import {useScreenReader} from '../../../hooks/useScreenReaderEnabled';
import LotteHomeAnimation from './LotteHomeAnimation';
import HiddenSwipeItem from './HiddenSwipeItem';

const MealsListSwipeDelete = ({searchComponent, mealDataSoftDelete, value, update}) => {
  const navigation = useNavigation();
  const screenReaderEnabled = useScreenReader();
  const listLength = mealDataSoftDelete.length;

  return (
    <SwipeListView
      contentInsetAdjustmentBehavior={'automatic'}
      contentContainerStyle={{flexGrow: 1}}
      disableRightSwipe={true}
      ListEmptyComponent={<EmptyListHome value={value} navigation={navigation} />}
      ListHeaderComponent={searchComponent}
      data={mealDataSoftDelete}
      renderItem={({item}) => <MealItemList item={item} />}
      keyExtractor={(item, index) => item.id}
      closeOnRowPress={true}
      closeOnScroll={true}
      ListFooterComponent={<LotteHomeAnimation value={value} listLength={listLength} />}
      renderHiddenItem={
        !screenReaderEnabled ? rowData => <HiddenSwipeItem rowData={rowData} update={update} /> : null
      }
      rightOpenValue={-150}
      leftOpenValue={75}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};
export default MealsListSwipeDelete;
