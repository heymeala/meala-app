import React from 'react';
import {Dimensions, Image, SafeAreaView, View} from 'react-native';
import {makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { Text } from "react-native-elements";

const RenderItem = props => {
  const {t} = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles();
  const {item} = props;
  console.log(props.info);
  return (
    <SafeAreaView>
      <View
        accessible={true}
        style={{
          ...styles.wrapper,
          backgroundColor: item.backgroundColor,
          height: dimensions.height,
        }}>
        <View style={{...styles.container, height: dimensions.height - 80}}>
          <Text h1 style={styles.title}>{item.title}</Text>
          {item.image && <Image source={item.image} style={styles.image} />}
          <Text h3 style={styles.text}>{item.text}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RenderItem;

const useStyles = makeStyles(theme => ({
  wrapper: {justifyContent: 'space-around', alignItems: 'stretch'},
  container: {paddingBottom: 40, justifyContent: 'space-around'},
  image: {
    width: null,
    height: 320,
  },
  text: {
    color: 'rgba(0,0,0,0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
}));
