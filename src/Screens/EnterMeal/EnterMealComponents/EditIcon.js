import React from 'react';
import { View } from 'react-native';
import { Icon, makeStyles } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';

const EditIcon = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.editIconContainer}>
      <Icon color={'#fff'} name={'edit'} />
    </View>
  );
};

export default EditIcon

const useStyles = makeStyles(theme => ({
  editIconContainer: {
    padding: theme.spacing.S,
    marginRight: theme.spacing.M,
    marginLeft: theme.spacing.S,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
  },
}));
