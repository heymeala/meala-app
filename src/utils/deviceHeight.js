import { Dimensions, Platform, StatusBar } from 'react-native';

export const deviceHeight = Dimensions.get('window').height;
export const deviceWidth = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Platform.select({
  ios: deviceHeight,
  android: deviceHeight - StatusBar.currentHeight,
});
