import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import IconView from '../IconView';
import EditIcon from '../EditIcon';
import LocalizationContext from '../../../../../LanguageContext';

const CustomMealEditButton = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { setOpen } = props;
  return (
    <TouchableOpacity
      accessibilityRole={'button'}
      onPress={() => {
        setOpen(true);
      }}>
      <View style={styles.container}>
        <IconView iconName={'eat'} iconType={'meala'} size={35} />
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{t('AddMeal.MealName.name')}</Text>
          <Text>{props.mealName}</Text>
        </View>
        <EditIcon />
      </View>
    </TouchableOpacity>
  );
};

export default CustomMealEditButton;

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing.L,
    marginBottom: theme.spacing.L,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  textWrapper: { flexShrink: 1, paddingLeft: 24, width: '100%' },
  text: { textAlign: 'left', fontFamily: 'SecularOne-Regular' },
}));
