import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, makeStyles, Text } from 'react-native-elements';
import PoweredByFatSecret from '../../../Common/fatsecret/PoweredByFatSecret';
import LocalizationContext from '../../../../LanguageContext';
import { getFoodByDateFromUser } from '../../../Common/fatsecret/fatsecretApi';

const FatSecretNutritionInfo = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [fatSecretData, setFatSecretData] = useState();
  const { selectedFood } = props;

  useEffect(() => {
    selectedFood.fatSecretUserFoodEntryIds &&
      selectedFood.fatSecretUserFoodEntryIds.map(entries =>
        getFoodByDateFromUser(null, entries.foodEntryId).then(data => {
          if (data.food_entries) {
            setFatSecretData(prevState => {
              if (prevState) {
                return [{ ...data.food_entries.food_entry }, ...prevState];
              } else {
                return [{ ...data.food_entries.food_entry }];
              }
            });
          } else {
            console.log('no data');
          }
        }),
      );
  }, []);

  return fatSecretData ? (
    <View>
      <PoweredByFatSecret />
      {fatSecretData.map((data, i) => {
        return (
          <View key={i}>
            <Card>
              <View key={data.food_entry_id}>
                <Text>{data.food_entry_name}</Text>
                <Text>
                  {t('AddMeal.nutritionData.calories')}: {data.calories}
                </Text>
                <Text>
                  {t('AddMeal.nutritionData.carbohydrate')}: {data.carbohydrate}
                </Text>
              </View>
            </Card>
          </View>
        );
      })}
    </View>
  ) : null;
};

export default FatSecretNutritionInfo;

const useStyles = makeStyles(theme => ({}));
