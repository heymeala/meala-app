import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { spacing } from '../../../theme/styles';

const EditTagMissing = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>{t('AddMeal.tag.edit_mode')}</Text>
    </View>
  );
};

export default EditTagMissing;

const useStyles = makeStyles(theme => ({
  container: { marginBottom: 80, padding: spacing.M },
}));
