import React from 'react';
import { Dimensions, View } from 'react-native';
import { Icon, makeStyles, Text } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import { spacing } from '../../../theme/styles';
import LocalizationContext from '../../../../LanguageContext';

const LottieHomeAnimation = props => {
  const dimensions = Dimensions.get('window');
  const { t } = React.useContext(LocalizationContext);

  const styles = useStyles(dimensions);
  const { listLength } = props;
  const first = listLength > 0 && listLength <= 2;
  const second = listLength === 3;
  const third = listLength > 3;
  if (first) {
    return (
      <LottieView
        style={styles.animation}
        source={require('../../../assets/animations/wok-pan-food.json')}
        autoPlay
        loop
      />
    );
  } else if (second) {
    return (
      <LottieView
        style={styles.animation}
        source={require('../../../assets/animations/ramen-noodles.json')}
        autoPlay
        loop
      />
    );
  } else if (third) {
    return (
      <View style={styles.container}>
        <Icon type={'meala'} name={'community'} size={50} />
        <Text style={styles.text}>{t('Entries.community')}</Text>
      </View>
    );
  } else {
    return null;
  }
};

export default LottieHomeAnimation;

const useStyles = makeStyles((theme, dimensions) => ({
  animation: { width: dimensions.width },
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 150,
    alignItems: 'center',
  },
  text: { padding: spacing.M },
}));
