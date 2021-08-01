import React from 'react';
import { makeStyles, Slider, Text, useTheme } from "react-native-elements";
import LocalizationContext from '../../../../LanguageContext';
import { View } from 'react-native';
import { EDIT_MODE, useEnterMealType } from '../../../hooks/useEnterMealState';
import { useScreenReader } from '../../../hooks/useScreenReaderEnabled';

const ReminderSlider = props => {
  const { t } = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();

  const styles = useStyles();
  const { value, setValue } = props;
  const { theme } = useTheme();
  const { type } = useEnterMealType();

  return type.mode !== EDIT_MODE ? (
    <View style={styles.container}>
      {!screenReaderEnabled ? (
        <>
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
        </>
      ) : null}
    </View>
  ) : null;
};

export default ReminderSlider;

const useStyles = makeStyles(theme => ({
  container: { width: '80%', margin: theme.spacing.L, marginBottom: 80 },
}));
