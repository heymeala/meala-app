import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import React from 'react';
import {makeStyles, useTheme} from 'react-native-elements';

const LoadingSpinner = () => {
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <SafeAreaView>
      <View style={styles.loadingSpinner}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
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
