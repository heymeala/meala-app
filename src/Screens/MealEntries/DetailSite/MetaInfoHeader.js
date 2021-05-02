import React from 'react';
import {ScrollView, View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import {spacing} from '../../../theme/styles';

const MetaInfoHeader = props => {
  const styles = useStyles();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.date}>{props.date}</Text>
        <Text h2 style={styles.mealTitle}>
          {props.food}
        </Text>
      </View>
      <View style={styles.restaurantContainer}>
        <Text style={styles.restaurantName}>{props.restaurantName}</Text>
      </View>
    </>
  );
};

export default MetaInfoHeader;

const useStyles = makeStyles(theme => ({
  container: {flex: 1, paddingTop: spacing.S, paddingBottom: spacing.XS},
  restaurantName: {textAlign: 'center', alignItems: 'center'},
  mealTitle: {
    alignItems: 'center',
    fontWeight: 'bold',
    paddingBottom: 0,
    textAlign: 'center',
  },
  restaurantContainer: {
    paddingBottom: spacing.XS,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    alignItems: 'center',
    paddingBottom: 12,
    textAlign: 'center',
    color: theme.colors.grey2,
  },
}));
