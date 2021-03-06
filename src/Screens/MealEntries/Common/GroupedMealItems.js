import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import { Icon, ListItem, makeStyles, Tooltip, useTheme, Text } from 'react-native-elements';
import { spacing } from '../../../theme/styles';
import NutritionDetailItem from '../NutritionDetailItem';
import NutritionDetails from './NutritionDetails';

const GroupedMealItems = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { data, sum } = props;
  const [expanded, setExpanded] = useState(false);
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <>
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
              <Icon name={props.icon} size={props.iconSize || 20} style={styles.icon} type={'meala'} />
              <ListItem.Content>
                <ListItem.Title>
                  <Text h4>{props.title}</Text>
                </ListItem.Title>
                <ListItem.Subtitle>
                  <Text>
                    {props.carbohydrates}g {t('AddMeal.nutritionData.carbohydrate')} |{t('Entries.fpu')}{' '}
                    {props.fpe}
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
              <View key={i}>
                <NutritionDetails data={data} />
              </View>
            );
          })}
        </ListItem.Accordion>
      </Tooltip>
    </>
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
  accordion: { backgroundColor: theme.colors.grey5 },
  icon: { paddingLeft: 0, paddingRight: theme.spacing.M },
  title: {
    fontWeight: 'bold',
  },
  ccal: { fontSize: 10 },
  text: {
    fontWeight: 'bold',
  },
  nutritionText: { paddingVertical: theme.spacing.XS },
}));
