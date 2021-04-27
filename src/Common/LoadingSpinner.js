import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import React from 'react';
import {makeStyles} from 'react-native-elements';

const LoadingSpinner = () => {
  const styles = useStyles();

  return (
    <SafeAreaView>
      <View style={styles.loadingSpinner}>
        <ActivityIndicator />
      </View>
    </SafeAreaView>
  );
};
export default LoadingSpinner;
const useStyles = makeStyles(theme => ({
  loadingSpinner: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
  },
}));
