import React from 'react';
import { View } from 'react-native';
import { Icon, makeStyles } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';

const IconView = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { iconName, iconType, size } = props;
  return (
    <View style={styles.touchContainer}>
      <Icon name={iconName} type={iconType} size={size} />
    </View>
  );
};

export default IconView;

const useStyles = makeStyles(theme => ({
  touchContainer: {
    marginLeft: theme.spacing.M,
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    alignItems: 'center',
    padding: theme.spacing.S,
    textAlignVertical: 'center',
    width: 65,
    height: 65,
  },
}));
