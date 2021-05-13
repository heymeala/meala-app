import React from 'react';
import {View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import NutritionDetailItem from '../NutritionDetailItem';
import LocalizationContext from '../../../../LanguageContext';

const NutritionDetails = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {data, index} = props;
  return (
    <View style={styles.container}>
      {data.food_entry_name ? (
        <View style={styles.titleContainer}>
          <Text style={[styles.nutritionText, styles.text]}>{data.food_entry_name}</Text>
          <Text style={styles.ccal}>
            , {data.calories} {t('AddMeal.nutritionData.calories')}
          </Text>
        </View>
      ) : null}
      <NutritionDetailItem data={data.carbohydrate} text={t('AddMeal.nutritionData.carbohydrate')} />
      <NutritionDetailItem data={data.fat} text={t('AddMeal.nutritionData.fat')} />
      <NutritionDetailItem data={data.protein} text={t('AddMeal.nutritionData.protein')} />
    </View>
  );
};

export default NutritionDetails;

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing.M,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing.XS,
  },
  icon: {paddingLeft: 0, paddingRight: theme.spacing.M},
  title: {
    fontWeight: 'bold',
  },
  ccal: {fontSize: 10},
  text: {
    fontWeight: 'bold',
  },
  nutritionText: {paddingVertical: theme.spacing.XS},
}));
