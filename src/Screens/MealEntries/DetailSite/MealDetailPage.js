import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Card, Image, SpeedDial, Text} from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/de';
import LocalizationContext from '../../../../LanguageContext';
import {getFoodByDateFromUser} from '../../../Common/fatsecret/fatsecretApi';
import PoweredByFatSecret from '../../../Common/fatsecret/PoweredByFatSecret';
import GeneralChartView from './ChartView';
import NoGraphData from './NoGraphData';
import MetaInfoHeader from './MetaInfoHeader';
import CircleGroup from './CircleGroupe';
import MealNote from './MealNote';
import NightScoutTreatmentDetails from './NightScoutTreatmentDetails';
import FatSecretNutritionInfo from './FatSecretNutritionInfo';
import EditSpeedDialGroup from './EditSpeedDailGroup';

//https://github.com/oblador/react-native-vector-icons
const MealDetailsComponent = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  moment.locale(locale);
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

  let InsulinArray = [0];

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
    <>
      <ScrollView
        style={{backgroundColor: '#fbfbfb'}}
        contentContainerStyle={{flexGrow: 1}}>
        <MetaInfoHeader
          date={foodDatum}
          food={props.food}
          restaurantName={props.restaurantName}
        />
        <CircleGroup
          InsulinSumme={InsulinSumme}
          CarbSumme={CarbSumme}
          selectedFood={props.selectedFood}
        />
        {props.checkSettings !== 'Error' ? (
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
          <NightScoutTreatmentDetails
            treatments={props.treatments}
            InsulinSumme={InsulinSumme}
            CarbSumme={CarbSumme}
          />
        ) : null}

        <MealNote selectedFood={props.selectedFood} />
        <FatSecretNutritionInfo selectedFood={selectedFood} />
      </ScrollView>
      <EditSpeedDialGroup selectedFood={selectedFood} />
    </>
  );
};

export default MealDetailsComponent;

const styles = StyleSheet.create({
  wrapper: {flex: 1},
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
});
