import React from 'react';
import { makeStyles, Slider, Text, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { View } from 'react-native';

const ReminderSlider = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { value, setValue } = props;
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text>{t('AddMeal.reminder', { hours: value })}</Text>
      <Slider
        step={0.5}
        minimumValue={1.5}
        maximumValue={7}
        value={value}
        onValueChange={num => setValue(num)}
        thumbTintColor={theme.colors.primary}
        thumbStyle={{ height: 20, width: 20 }}
      />
    </View>
  );
};

export default ReminderSlider;

const useStyles = makeStyles(theme => ({
  container: { width: '80%', margin: theme.spacing.L, marginBottom: 80 },
}));
