import React from 'react';
import {makeStyles, Text} from 'react-native-elements';

const AccessibleFoodInfoText = props => {
  const styles = useStyles();
  const {value, unit, infoText} = props;

  return (
    <>
      <Text style={styles.text}>
        {value}
        {unit}
        {infoText}
      </Text>
    </>
  );
};

export default AccessibleFoodInfoText;

const useStyles = makeStyles(theme => ({
  text: {
    textAlign: 'center',
    fontSize: 17,
    color: theme.colors.primary,
  },
}));
