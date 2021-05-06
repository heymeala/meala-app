import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import {Icon, ListItem, makeStyles, Tooltip, useTheme, Text} from 'react-native-elements';
import {spacing} from '../../../theme/styles';
import NutritionDetailItem from '../NutritionDetailItem';

const GroupedMealItems = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const {data, sum} = props;
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();
  const {theme} = useTheme();

  return (
    <View>
      <Tooltip
        backgroundColor={theme.colors.secondary}
        width={250}
        height={80}
        popover={
          <>
            <Text>{t('Entries.fpu_long')}</Text>
            <Text>{t('Entries.calculation')}</Text>
            <Text> {t('Entries.fpu_formula')} </Text>
          </>
        }>
        <ListItem.Accordion
          containerStyle={styles.accordion}
          content={
            <>
              <Icon
                name={props.icon}
                size={props.iconSize || 20}
                style={styles.icon}
                type={'meala'}
              />
              <ListItem.Content>
                <ListItem.Title>
                  <Text h4>{props.title}</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text>
                    {props.carbohydrates}g {t('AddMeal.nutritionData.carbohydrate')} |
                    {t('Entries.fpu')} {props.fpe}
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}>
          {data.map((data, i) => {
            return (
              <View key={i} style={styles.container}>
                <View style={styles.titleContainer}>
                  <Text style={[styles.nutritionText, styles.text]}>{data.food_entry_name}</Text>
                  <Text style={styles.ccal}>
                    , {data.calories} {t('AddMeal.nutritionData.calories')}
                  </Text>
                </View>
                <NutritionDetailItem
                  data={data.carbohydrate}
                  text={t('AddMeal.nutritionData.carbohydrate')}
                />
                <NutritionDetailItem data={data.fat} text={t('AddMeal.nutritionData.fat')} />
                <NutritionDetailItem
                  data={data.protein}
                  text={t('AddMeal.nutritionData.protein')}
                />
              </View>
            );
          })}
        </ListItem.Accordion>
      </Tooltip>
    </View>
  );
};

export default GroupedMealItems;

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
  accordion: {backgroundColor: theme.colors.grey5},
  icon: {padding: theme.spacing.M},
  title: {
    fontWeight: 'bold',
  },
  ccal: {fontSize: 10},
  text: {
    fontWeight: 'bold',
  },
  nutritionText: {paddingVertical: theme.spacing.XS},
}));
