import React from 'react';
import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import LottieView from 'lottie-react-native';
const RenderItem = props => {
  const { t } = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles(dimensions);
  const { item, info, index } = props;
  return (
    <SafeAreaView
      accessible={true}
      style={{
        ...styles.wrapper,
        backgroundColor: item.backgroundColor,
      }}>
      <View style={styles.container}>
        <Text h1 style={styles.title}>
          {item.title}
        </Text>
        {item.image && <Image source={item.image} style={styles.image} />}
        {item.animation && <LottieView style={styles.animation} source={item.animation} autoPlay loop />}
        <Text h3 style={styles.text}>
          {item.text}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default RenderItem;

const useStyles = makeStyles((theme, dimensions) => ({
  wrapper: {
    height: dimensions.height,
  },
  container: {
    paddingVertical: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: dimensions.height - 80,
  },
  image: {
    //width: null,
    height: 320,
    marginVertical: 0,
  },
  flex: {},
  animation: { height: null },
  text: {
    //flexGrow: 1,
    color: theme.colors.black,
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
  },

  title: {
    paddingVertical: 12,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
}));
