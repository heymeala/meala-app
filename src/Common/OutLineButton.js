import React from 'react';
import { Button, makeStyles } from 'react-native-elements';
import { View } from 'react-native';

const OutLineButton = props => {
  const styles = useStyles();
  return (
    <View style={styles.wrapper}>
      <Button
        type={'outline'}
        {...props}
        style={styles.buttonContainer}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default OutLineButton;

const useStyles = makeStyles(theme => ({
  wrapper:{margin:theme.spacing.S},
  buttonContainer: { borderRadius: 50, },
  button: { backgroundColor: 'transparent',  },
}));
