import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, makeStyles } from 'react-native-elements';
import { EDIT_MODE, useEnterMealType } from '../../../hooks/useEnterMealState';
import { useNavigation } from '@react-navigation/core';

const HiddenSwipeItem = props => {
  const styles = useStyles();
  const { rowData, deleteMeal } = props;
  const { changeType } = useEnterMealType();
  const navigation = useNavigation();

  return (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          changeType({ mode: EDIT_MODE, meal_id: rowData.item.userMealId });
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              meal_id: rowData.item.userMealId,
            },
          });
        }}>
        <View key={rowData.item.userMealId}>
          <Icon name={'edit'} color={'#fff'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backRightBtn}
        onPress={() => deleteMeal(rowData.item.userMealId)}>
        <View key={rowData.item.userMealId}>
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
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    top: 2,
    right: 0,
    width: 75,
    height: 100,
    backgroundColor: '#ac000a',
  },
  backRightBtnLeft: {
    backgroundColor: theme.colors.warning,
    right: 75,
  },
}));
