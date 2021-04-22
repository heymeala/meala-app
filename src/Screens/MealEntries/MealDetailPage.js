import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Card, Image, Text} from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import 'moment/locale/de';
import LocalizationContext from '../../../LanguageContext';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import {getFoodByDateFromUser} from '../../Common/fatsecret/fatsecretApi';
import PoweredByFatSecret from '../../Common/fatsecret/PoweredByFatSecret';
import SaveButton from '../../Common/SaveButton';
import GeneralChartView from './ChartView';
import NoGraphData from './NoGraphData';

//https://github.com/oblador/react-native-vector-icons
const MealDetailsComponent = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  moment.locale(locale);
  const screenReaderEnabled = useScreenReader();
  const {selectedFood} = props;

  const foodDatumMoment = moment(selectedFood.date).format();
  const foodDatum = moment(foodDatumMoment).format('lll');
  const treatmentsData = props.treatments;
  const firstInsulin = treatmentsData
    ? treatmentsData
        .map(data =>
          data.insulin > 0
            ? data.timestamp
              ? data.timestamp
              : data.date
              ? data.date
              : data.created_at
              ? data.created_at
              : null
            : null,
        )
        .filter(data => data)
    : null;

  const startTime = moment(firstInsulin[0]);
  const stopTime = moment(foodDatumMoment);
  const duration = moment.duration(startTime.diff(stopTime));

  let eventType, enteredinsulin, carbsCal, insuliCal;
  let InsulinArray = [0];
  const [fatSecretData, setFatSecretData] = useState();

  useEffect(() => {
    selectedFood.fatSecretUserFoodEntryIds &&
      selectedFood.fatSecretUserFoodEntryIds.map(entries =>
        getFoodByDateFromUser(null, entries.foodEntryId).then(data => {
          if (data.food_entries) {
            setFatSecretData(prevState => {
              if (prevState) {
                return [{...data.food_entries.food_entry}, ...prevState];
              } else {
                return [{...data.food_entries.food_entry}];
              }
            });
          } else {
            console.log('no data');
          }
        }),
      );
  }, []);

  const add = (a, b) => a + b;

  const imgWidth = Dimensions.get('window').width;
  const imgHeight = Dimensions.get('window').height;

  // remove smb – settings in android aps
  props.treatments
    .filter(data => (data.isSMB ? data.isSMB === false : data))
    .map(treatments => {
      if (treatments.insulin) {
        InsulinArray.push(parseFloat(treatments.insulin.toFixed(2)));
      }
    });

  const InsulinSumme = InsulinArray.reduce(add).toFixed(2);
  const CarbSumme =
    props.carbs.length > 0 ? props.carbs.reduce(add).toFixed(0) : '0';
  const InsulinCarbDetails = () =>
    props.treatments.map((treatments, i) => {
      eventType = null;
      if (treatments.insulin) {
        insuliCal = t('Entries.directBolus') + treatments.insulin.toFixed(2);
      } else {
        insuliCal = null;
      }
      if (treatments.carbs) {
        carbsCal = t('Entries.carbs') + treatments.carbs.toFixed(2);
      } else {
        carbsCal = null;
      }
      if (treatments.eventType) {
        if (!i) {
          return true;
        }
        if (treatments.eventType !== props.treatments[i - 1].eventType) {
          eventType = t('Entries.event') + treatments.eventType;
        }
      } else {
        eventType = null;
      }
      if (treatments.enteredinsulin) {
        enteredinsulin = t('Entries.delay') + treatments.enteredinsulin;
      } else {
        enteredinsulin = null;
      }
      return (
        <View key={treatments._id}>
          {carbsCal || insuliCal || enteredinsulin ? (
            <View style={{padding: 5}}>
              <Text>{eventType}</Text>
              <Text>
                {carbsCal}
                {insuliCal}
                {enteredinsulin}{' '}
              </Text>
            </View>
          ) : null}
        </View>
      );
    });

  const spritzEssAbstandText =
    props.checkSettings === 'Nightscout'
      ? InsulinArray.length > 1
        ? duration.asMilliseconds() < 0
          ? t('Entries.youHave') +
            Math.abs(Math.round(duration.asMinutes())) +
            t('Entries.before')
          : t('Entries.youHave') +
            Math.abs(Math.round(duration.asMinutes())) +
            t('Entries.after')
        : t('Entries.calculating')
      : null;

  return (
    <ScrollView style={{backgroundColor: '#fbfbfb'}}>
      <View style={{flex: 1, paddingTop: 10, paddingBottom: 5}}>
        <Text style={styles.date}>{foodDatum}</Text>
        <Text h4 style={styles.mealTitle}>
          {props.food}
        </Text>
      </View>

      <View style={styles.restaurantContainer}>
        <Text style={styles.restaurantName}>{props.restaurantName}</Text>
      </View>

      <View style={styles.circleContainer}>
        {props.selectedFood.picture ? (
          <View style={styles.imageContainer}>
            <Image
              style={{width: 85, height: 85, borderRadius: 42.5}}
              placeholderStyle={{backgroundColor: '#3E3E3E'}}
              PlaceholderContent={
                <Text style={{color: '#fff'}}>{t('Entries.noImage')}</Text>
              }
              source={
                props.selectedFood.picture && {uri: props.selectedFood.picture}
              }
              borderRadius={42.5}
            />
          </View>
        ) : null}
        {InsulinSumme > 0 ? (
          <View style={styles.insulinContainer}>
            {!screenReaderEnabled ? (
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    color: '#34A990',
                  }}>
                  {InsulinSumme}u{' '}
                </Text>
                <Text
                  style={{textAlign: 'center', fontSize: 10, color: '#34A990'}}>
                  Insulin
                </Text>
                <View
                  accessible={false}
                  style={{left: 60, top: -0, position: 'absolute'}}>
                  <View style={styles.insulinIconContainer}>
                    <FontAwesome5 name="vial" size={17} color="#fff" />
                  </View>
                </View>
              </>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#34A990',
                }}>
                {InsulinSumme} {t('Accessibility.MealDetails.insulin')}
              </Text>
            )}
          </View>
        ) : null}
        {CarbSumme > 0 ? (
          !screenReaderEnabled ? (
            <View style={styles.carbContainer}>
              <Text
                style={{textAlign: 'center', fontSize: 17, color: '#37619C'}}>
                {CarbSumme}g
              </Text>
              <Text
                style={{textAlign: 'center', fontSize: 10, color: '#37619C'}}>
                Carbs
              </Text>
              <View style={{left: 60, top: -0, position: 'absolute'}}>
                <View style={styles.carbIconContainer}>
                  <FontAwesome5 name="pizza-slice" size={17} color="#fff" />
                </View>
              </View>
            </View>
          ) : (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  color: '#37619C',
                }}>
                {CarbSumme}g {t('Accessibility.MealDetails.carbs')}
              </Text>
            </>
          )
        ) : null}
      </View>
      {props.checkSettings ? (
        <GeneralChartView
          loading={props.loading}
          coordinates={props.coordiantes}
          selectedFood={props.selectedFood}
          insulinCoordinates={props.insulinCoordinates}
          carbCoordinates={props.carbCoordinates}
        />
      ) : (
        <NoGraphData />
      )}
      <View style={{alignItems: 'center'}}>
        <Text style={{paddingBottom: 5}}>{spritzEssAbstandText}</Text>
        {props.selectedFood.picture ? (
          <Image
            source={
              props.selectedFood.picture
                ? {uri: props.selectedFood.picture}
                : null
            }
            style={{
              width: imgWidth - 20,
              height: imgHeight / 1.5,
              borderRadius: 5,
              paddingBottom: 5,
              paddingTop: 5,
            }}
          />
        ) : null}
      </View>
      {props.checkSettings === 'Nightscout' ? (
        <View style={{padding: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Details</Text>
          <InsulinCarbDetails />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Insulin: {InsulinSumme}u
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {t('General.Carbs')}: {CarbSumme}g
          </Text>
        </View>
      ) : null}

      {props.selectedFood.note ? (
        <Card
          title="Notiz"
          containerStyle={{
            borderWidth: 0,
            borderRadius: 10,
            paddingBottom: 0,
            marginBottom: 15,
          }}>
          <Text style={{paddingBottom: 10}}>{props.selectedFood.note}</Text>
        </Card>
      ) : null}

      {fatSecretData && (
        <View>
          <PoweredByFatSecret />

          {fatSecretData.map(data => {
            return (
              <Card>
                <View key={data.food_entry_id}>
                  <Text>{data.food_entry_name}</Text>
                  <Text>
                    {t('AddMeal.nutritionData.calories')}: {data.calories}
                  </Text>
                  <Text>
                    {t('AddMeal.nutritionData.carbohydrate')}:{' '}
                    {data.carbohydrate}
                  </Text>
                </View>
              </Card>
            );
          })}
        </View>
      )}
      <SaveButton
        onPress={() =>
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              mealid: selectedFood.id,
            },
          })
        }
        title={t('Entries.copyMeal')}
      />
    </ScrollView>
  );
};

export default MealDetailsComponent;

const styles = StyleSheet.create({
  roundText: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingTop: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 35,
    height: 70,
    width: 70,
    flexDirection: 'column',
  },
  date: {
    fontSize: 10,
    alignItems: 'center',
    paddingBottom: 0,
    textAlign: 'center',
    color: '#787878',
  },
  mealTitle: {
    alignItems: 'center',
    fontWeight: 'bold',
    paddingBottom: 0,
    textAlign: 'center',
  },
  restaurantContainer: {
    paddingBottom: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantName: {textAlign: 'center', alignItems: 'center'},
  circleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 0,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#34A990',
    borderRadius: 42.5,
    height: 85,
    width: 85,
    flexDirection: 'column',
  },
  insulinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#34A990',
    borderRadius: 42.5,
    height: 85,
    width: 85,
    flexDirection: 'column',
  },
  insulinIconContainer: {
    backgroundColor: '#34A990',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
  },
  carbContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#37619C',
    justifyContent: 'center',
    borderRadius: 42.5,
    height: 85,
    width: 85,
    flexDirection: 'column',
  },
  carbIconContainer: {
    backgroundColor: '#37619C',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
  },
});
