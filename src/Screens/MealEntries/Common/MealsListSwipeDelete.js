import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import { EmptyListHome } from './EmtyListHome';
import { useNavigation } from '@react-navigation/core';
import { useScreenReader } from '../../../hooks/useScreenReaderEnabled';
import LotteHomeAnimation from './LotteHomeAnimation';
import HiddenSwipeItem from './HiddenSwipeItem';
import { MealItemsList } from '../../../Components/MealItemList';

const MealsListSwipeDelete = ({ searchComponent, mealDataSoftDelete, value, deleteMeal }) => {
  const navigation = useNavigation();
  const screenReaderEnabled = useScreenReader();
  const listLength = mealDataSoftDelete.length;

  return (
    <SwipeListView
      contentInsetAdjustmentBehavior={'automatic'}
      contentContainerStyle={{ flexGrow: 1 }}
      disableRightSwipe={true}
      ListEmptyComponent={<EmptyListHome value={value} navigation={navigation} />}
      ListHeaderComponent={searchComponent}
      data={mealDataSoftDelete}
      renderItem={({ item }) => <MealItemsList item={item} />}
      keyExtractor={(item, index) => item.userMealId}
      closeOnRowPress={true}
      closeOnScroll={true}
      ListFooterComponent={<LotteHomeAnimation value={value} listLength={listLength} />}
      renderHiddenItem={
        !screenReaderEnabled ? rowData => <HiddenSwipeItem rowData={rowData} deleteMeal={deleteMeal} /> : null
      }
      rightOpenValue={-150}
      leftOpenValue={75}
      previewRowKey={mealDataSoftDelete[0] ? mealDataSoftDelete[0].id : null}
      previewOpenValue={-30}
      previewOpenDelay={2000}
    />
  );
};
export default MealsListSwipeDelete;
