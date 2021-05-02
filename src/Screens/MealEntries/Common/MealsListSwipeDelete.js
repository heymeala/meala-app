import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import {SwipeListView} from 'react-native-swipe-list-view';
import MealItemList from '../../../Components/MealItemList';
import {EmptyListHome} from './EmtyListHome';
import {Icon} from 'react-native-elements';
import {wait} from '../../../Common/wait';
import {useNavigation} from '@react-navigation/core';
import {useScreenReader} from '../../../hooks/useScreenReaderEnabled';
import LotteHomeAnimation from './LotteHomeAnimation';

const MealsListSwipeDelete = (
  {searchComponent, mealDataSoftDelete, value, mealData, update},
  props,
) => {
  const {t} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const screenReaderEnabled = useScreenReader();
  const listLength = mealDataSoftDelete.length;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    mealData(value);
    wait(1300).then(() => setRefreshing(false));
  }, []);

  return (
    <SwipeListView
      contentInsetAdjustmentBehavior={'automatic'}
      contentContainerStyle={{flexGrow: 1}}
      /*     refreshControl={
                           <RefreshControl title={"MADE WITH LOVE"} refreshing={refreshing} onRefresh={onRefresh} />}*/
      disableRightSwipe={true}
      ListEmptyComponent={
        <EmptyListHome value={value} navigation={navigation} />
      }
      ListHeaderComponent={searchComponent}
      data={mealDataSoftDelete}
      renderItem={({item}) => <MealItemList item={item} />}
      keyExtractor={(item, index) => item.id}
      closeOnRowPress={true}
      closeOnScroll={true}
      ListFooterComponent={
        <LotteHomeAnimation value={value} listLength={listLength} />
      }
      renderHiddenItem={
        !screenReaderEnabled &&
        ((rowData, rowMap) => (
          <View style={styles.backRightBtn} key={rowData.item.id}>
            <TouchableOpacity
              style={styles.rowBack}
              onPress={() => {
                update(rowData.item.userMealId);
              }}>
              <Icon name={'trash-outline'} type={'ionicon'} color={'#fff'} />
            </TouchableOpacity>
          </View>
        ))
      }
      rightOpenValue={-75}
      leftOpenValue={75}
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
    />
  );
};
export default MealsListSwipeDelete;

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 5,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 75,
    backgroundColor: '#ac000a',
  },
});
