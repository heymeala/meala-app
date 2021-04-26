import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, Text} from 'react-native-elements';
import LocalizationContext from '../../../../../LanguageContext';
import {useNavigation} from '@react-navigation/core';
import NutritionItem from './NutritionItem';

const ScannerResults = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();

  const {data} = props;
  const uri = data.image_front_url;
  const keywords = data._keywords;

  const NutriScoreImage = () => {
    const nutriScore = data.nutriscore_grade && data.nutriscore_grade;

    function getScoreImage() {
      switch (nutriScore) {
        case 'a':
          return require('../../../../assets/nutri/nutri_a.png');
        case 'b':
          return require('../../../../assets/nutri/nutri_b.png');
        case 'c':
          return require('../../../../assets/nutri/nutri_c.png');
        case 'd':
          return require('../../../../assets/nutri/nutri_c.png');
        case 'e':
          return require('../../../../assets/nutri/nutri_e.png');
        default:
          return null;
      }
    }

    const nutriScoreUri = getScoreImage();
    return (
      nutriScoreUri && (
        <Image style={{width: 120, height: 65}} source={nutriScoreUri} />
      )
    );
  };
  return (
    <>
      {uri && (
        <View>
          <Image
            style={{
              height: 130,
              resizeMode: 'cover',
              borderRadius: 5,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }}
            PlaceholderContent={<ActivityIndicator />}
            source={uri && uri}
          />
          {data.creator && (
            <View
              style={{
                height: 20,
                backgroundColor: '#000',
                marginTop: -20,
                opacity: 0.7,
              }}>
              <Text
                style={{textAlign: 'right', paddingRight: 4, color: '#fff'}}>
                cc by {data.creator}
              </Text>
            </View>
          )}
        </View>
      )}
      <ScrollView style={styles.content}>
        <Text style={styles.centerText}>
          {data.product_name} {data.brands && '- ' + data.brands}
        </Text>
        {data.serving_size ? (
          <Text style={{fontWeight: 'bold', ...styles.text}}>
            {data.serving_size} = {t('BarCode.onePortion')}
          </Text>
        ) : null}
        {data.serving_size ? (
          data.nutriments ? (
            <View style={{flexDirection: 'row'}}>
              <View>
                <Text style={{fontWeight: 'bold', ...styles.text}}>
                  {data.nutriments.carbohydrates_serving
                    ? data.nutriments.carbohydrates_serving
                    : null}
                </Text>
              </View>
              <View>
                <Text style={{fontWeight: 'bold', ...styles.text}}>
                  {t('BarCode.gPortion')}
                </Text>
              </View>
            </View>
          ) : null
        ) : null}
        <NutritionItem
          data={data}
          nutrition={data.nutriments.carbohydrates_100g}
          unit={data.nutriments.carbohydrates_unit}
          text={t('BarCode.g100', {
            nutrition: t('AddMeal.nutritionData.carbohydrate'),
          })}
        />
        <NutritionItem
          data={data}
          nutrition={data.nutriments.fat_100g}
          unit={data.nutriments.fat_unit}
          text={t('BarCode.g100', {nutrition: t('AddMeal.nutritionData.fat')})}
        />
        <NutritionItem
          data={data}
          nutrition={data.nutriments.energy_value}
          unit={data.nutriments.energy_unit}
          text={t('BarCode.g100', {
            nutrition: t('AddMeal.nutritionData.calories'),
          })}
        />
        {data.allergens_from_ingredients ? (
          <>
            <Text style={styles.text}>{t('BarCode.allergens')}</Text>
            <Text style={styles.text}>{data.allergens_from_ingredients}</Text>
          </>
        ) : data.nutriments ? (
          data.allergens_tags ? (
            <>
              <Text style={styles.text}>{t('BarCode.allergens')}</Text>
              <Text style={styles.text}>{data.allergens_tags}</Text>
            </>
          ) : null
        ) : null}
        <View
          style={{
            paddingTop: 12,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
          }}>
          <NutriScoreImage />

          <View style={{}}>
            <TouchableOpacity
              style={styles.licence}
              onPress={() => {
                navigation.navigate('FoodFacts');
              }}>
              <Text style={{textAlign: 'right', paddingTop: 10}}>
                {t('BarCode.licence')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default ScannerResults;
const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  text: {
    color: '#000',
    padding: 4,
    fontSize: 16,
  },
  content: {padding: 10},
  openButton: {
    backgroundColor: '#154d80',
    color: '#fff',
    borderRadius: 25,
    padding: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  licence: {padding: 4},
});
