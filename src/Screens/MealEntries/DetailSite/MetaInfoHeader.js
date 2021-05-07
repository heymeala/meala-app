import React from 'react';
import {View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import {spacing} from '../../../theme/styles';

const MetaInfoHeader = props => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
{/*
      <Text style={styles.date}>{props.date}</Text>
*/}
      <Text h2 style={styles.mealTitle}>
        {props.food}
      </Text>
      <Text style={styles.restaurantName}>{props.restaurantName}</Text>
    </View>
  );
};

export default MetaInfoHeader;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: spacing.S,
    paddingBottom: spacing.XS,
  },
  restaurantName: {},
  mealTitle: {
    fontWeight: 'bold',
  },
  restaurantContainer: {},
  date: {
    fontSize: 14,
    paddingVertical: 4,
    color: theme.colors.grey2,
  },
}));
