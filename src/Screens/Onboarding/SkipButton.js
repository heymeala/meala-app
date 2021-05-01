import React from 'react';
import {View} from 'react-native';
import {makeStyles} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalizationContext from '../../../LanguageContext';

const SkipButton = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View
      style={styles.skip}
      accessible={true}
      accessibilityLabel={t('Accessibility.Onboarding.skip')}
      accessibilityRole="button">
      <Icon
        name="ios-arrow-forward"
        color="rgba(255, 255, 255, .9)"
        size={24}
        style={{backgroundColor: 'transparent'}}
      />
    </View>
  );
};

export default SkipButton;

const useStyles = makeStyles(theme => ({
  skip: {
    width: 300,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
