import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon, makeStyles} from 'react-native-elements';
import {EDIT_MODE, useEnterMealType} from '../../../hooks/useEnterMealState';
import {useNavigation} from '@react-navigation/core';

const HiddenSwipeItem = props => {
  const styles = useStyles();
  const {rowData, update} = props;
  const {changeType} = useEnterMealType();
  const navigation = useNavigation();

  return (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          changeType({mode: EDIT_MODE, meal_id: rowData.item.id});
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              meal_id: rowData.item.id,
            },
          });
        }}>
        <View key={rowData.item.id}>
          <Icon name={'edit'} color={'#fff'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => {
          update(rowData.item.userMealId);
        }}>
        <View key={rowData.item.id}>
          <Icon name={'trash-outline'} type={'ionicon'} color={'#fff'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HiddenSwipeItem;

const useStyles = makeStyles(theme => ({
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
  backRightBtnLeft: {
    backgroundColor: theme.colors.warning,
    right: 75,
  },
}));
