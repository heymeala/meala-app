import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../../LanguageContext';

const EmptyMealName = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text>{t('AddMeal.MealName.noSearchText')}</Text>
    </View>
  );
};

export default EmptyMealName;

const useStyles = makeStyles(theme => ({
  container: { padding: theme.spacing.S },
}));
