import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, makeStyles} from 'react-native-elements';

const HiddenSwipeItem = props => {
  const styles = useStyles();
  const {rowData, update} = props;

  return (
    <View style={styles.backRightBtn} key={rowData.item.id}>
      <TouchableOpacity
        style={styles.rowBack}
        onPress={() => {
          update(rowData.item.userMealId);
        }}>
        <Icon name={'trash-outline'} type={'ionicon'} color={'#fff'} />
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
}));
