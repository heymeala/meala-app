import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import {Tooltip} from 'react-native-elements';

const GroupedMealItems = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const {data, sum} = props;
  return (
    <View>
      <Tooltip
        backgroundColor={'#f9de1c'}
        width={250}
        height={80}
        popover={
          <>
            <Text>{t('Entries.fpu_long')}</Text>
            <Text>{t('Entries.calculation')}</Text>
            <Text> {t('Entries.fpu_formula')} </Text>
          </>
        }>
        <>
          <Text style={styles.title}>{props.title}</Text>

          <Text style={{...styles.text, paddingLeft: 8, paddingBottom: 8}}>
            {props.carbohydrates}g {t('AddMeal.nutritionData.carbohydrate')} |
              {t('Entries.fpu')} {props.fpe}
          </Text>
        </>
      </Tooltip>
      {data.map((data, i) => {
        return (
          <View key={i} style={styles.container}>
            <View style={{padding: 20}}>
              <Text style={styles.text}>{data.food_entry_name}</Text>
              <Text>
                {t('AddMeal.nutritionData.calories')}: {data.calories}
              </Text>
              <Text>
                {t('AddMeal.nutritionData.carbohydrate')}: {data.carbohydrate}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default GroupedMealItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    padding: 8,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
  },
});
