import React from 'react';
import {View} from 'react-native';
import {makeStyles, Text, useTheme} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RoundInfoItem = props => {
  const styles = useStyles();
  const {value, unit, infoText} = props;
  const {theme} = useTheme();
  return (
    <>
      <Text style={styles.valueText}>
        {value}
        {unit}
      </Text>
      <Text style={styles.text}>{infoText}</Text>
      <View accessible={false} style={styles.container}>
        <View style={styles.insulinIconContainer}>
          <FontAwesome5 name="vial" size={17} color={theme.colors.white} />
        </View>
      </View>
    </>
  );
};

export default RoundInfoItem;

const useStyles = makeStyles(theme => ({
  container: {left: 60, top: -0, position: 'absolute'},
  text: {
    textAlign: 'center',
    fontSize: 10,
    color: '#34A990',
  },
  valueText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#34A990',
  },
}));
