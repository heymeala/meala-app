import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Image, makeStyles, Text} from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/de';
import LocalizationContext from '../../../../LanguageContext';
import GeneralChartView from './ChartView';
import NoGraphData from './NoGraphData';
import MetaInfoHeader from './MetaInfoHeader';
import CircleGroup from './CircleGroupe';
import MealNote from './MealNote';
import NightScoutTreatmentDetails from './NightScoutTreatmentDetails';
import FatSecretNutritionInfo from './FatSecretNutritionInfo';
import EditSpeedDialGroup from './EditSpeedDailGroup';
import {carbSum, getDuration, getInsulinInfo, getSEA} from './InsulinCarbSum';

const MealDetailsComponent = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  moment.locale(locale);
  const {selectedFood} = props;
  const foodDatumMoment = moment(selectedFood.date).format();
  const foodDatum = moment(foodDatumMoment).format('lll');
  const dimension = Dimensions.get('window');
  const styles = useStyles(dimension);

  const duration = React.useMemo(
    () => getDuration(props.treatments, foodDatumMoment),
    [props.treatments, foodDatumMoment],
  );
  const insulinSumme = React.useMemo(() => getInsulinInfo(props.treatments), [
    props.treatments,
  ]);
  const carbSumme = React.useMemo(() => carbSum(props.carbs), [props.carbs]);
  const spritzEssAbstandText = React.useMemo(
    () => getSEA(props.checkSettings, t, duration, insulinSumme),
    [props.checkSettings, t, duration, insulinSumme],
  );

  return (
    <>
      <ScrollView style={styles.wrapper}>
        <MetaInfoHeader
          date={foodDatum}
          food={props.food}
          restaurantName={props.restaurantName}
        />
        <CircleGroup
          insulinSumme={insulinSumme}
          carbSumme={carbSumme}
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
              style={styles.image}
            />
          ) : null}
        </View>
        {props.checkSettings === 'Nightscout' && (
          <NightScoutTreatmentDetails
            treatments={props.treatments}
            insulinSumme={insulinSumme}
            carbSumme={carbSumme}
          />
        )}
        <MealNote selectedFood={props.selectedFood} />
        <FatSecretNutritionInfo selectedFood={selectedFood} />
      </ScrollView>
      <EditSpeedDialGroup selectedFood={selectedFood} />
    </>
  );
};

export default MealDetailsComponent;

const useStyles = makeStyles((theme, dimension) => ({
  wrapper: {backgroundColor: '#fbfbfb'},
  image: {
    width: dimension.width - 20,
    height: dimension.height / 1.5,
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },
}));
