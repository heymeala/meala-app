import React from 'react';
import {View} from 'react-native';
import {makeStyles} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalizationContext from '../../../LanguageContext';

const NextButton = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View
      style={styles.buttonCircle}
      accessible={true}
      accessibilityLabel={t('Accessibility.Onboarding.next')}
      accessibilityRole="button">
      <Icon
        name="ios-arrow-forward"
        color="rgba(255, 255, 255, .9)"
        size={24}
      />
    </View>
  );
};

export default NextButton;

const useStyles = makeStyles(theme => ({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
