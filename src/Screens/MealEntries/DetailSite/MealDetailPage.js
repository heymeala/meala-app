import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { Icon, Image, ListItem, makeStyles } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/de';
import LocalizationContext from '../../../../LanguageContext';
import GeneralChartView from './Chart/ChartView';
import NoGraphData from './Chart/NoGraphData';
import MetaInfoHeader from './MetaInfoHeader';
import CircleGroup from './CircleGroupe';
import MealNote from './MealNote';
import NightScoutTreatmentDetails from './NightScoutTreatmentDetails';
import FatSecretNutritionInfo from './FatSecretNutritionInfo';
import EditSpeedDialGroup from './EditSpeedDailGroup';
import { carbSum, getDuration, getInsulinInfo, getSEA } from './InsulinCarbSum';
import { useUserSettings } from '../../../hooks/useUserSettings';
import { DEFAULT, HEALTHKIT, NIGHTSCOUT } from '../../Settings/glucoseSourceConstants';
import { useNavigation } from '@react-navigation/core';
import Tags from './Tags';
import AddLibreData from './AddLibreData';
import { getImagePath } from '../../../utils/getImagePath';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryScatter } from 'victory-native';

const MealDetailsComponent = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { userSettings } = useUserSettings();
  const window = Dimensions.get('window');

  moment.locale(locale);
  const { selectedFood } = props;
  const foodDatumMoment = moment(selectedFood.date).format();
  const foodDatum = moment(foodDatumMoment).format('lll');
  const dimension = Dimensions.get('window');
  const styles = useStyles(dimension);
  const navigation = useNavigation();
  console.log('rerender', '2');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: foodDatum,
    });
  }, [navigation]);

  const duration = React.useMemo(
    () => getDuration(props.treatments, foodDatumMoment),
    [props.treatments, foodDatumMoment],
  );
  const insulinSumme = getInsulinInfo(props.treatments);
  const carbSumme = React.useMemo(() => carbSum(props.carbs), [props.carbs]);
  const spritzEssAbstandText = React.useMemo(
    () => getSEA(userSettings.glucoseSource, t, duration, insulinSumme),
    [userSettings.glucoseSource, t, duration, insulinSumme],
  );

  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 },
  ];
  return (
    <>
      <ScrollView style={styles.wrapper}>
        <MetaInfoHeader
          date={foodDatum}
          food={props.selectedFood.food}
          restaurantName={props.restaurantName}
        />
        <CircleGroup insulinSumme={insulinSumme} carbSumme={carbSumme} selectedFood={props.selectedFood} />
        {userSettings.glucoseSource !== DEFAULT ? (
          <GeneralChartView
            loading={props.loading}
            coordinates={props.coordinates}
            selectedFood={props.selectedFood}
            insulinCoordinates={props.insulinCoordinates}
            carbCoordinates={props.carbCoordinates}
            fitbitSteps={props.fitbitSteps}
            heartRate={props.heartRate}
          />
        ) : (
          <NoGraphData />
        )}
        <AddLibreData
          date={foodDatumMoment}
          userMealId={props.selectedFood.userMealId}
          reloadData={props.reloadData}
          coordinates={props.coordinates}
        />
        <View>
          {(userSettings.glucoseSource === NIGHTSCOUT || userSettings.glucoseSource === HEALTHKIT) &&
            insulinSumme && (
              <ListItem containerStyle={styles.list}>
                <Icon name={'timelapse'} />
                <ListItem.Title style={styles.text}>{spritzEssAbstandText}</ListItem.Title>
              </ListItem>
            )}
          {props.stepsPerDay && (
            <ListItem containerStyle={styles.list}>
              <Icon name={'directions-run'} />
              <ListItem.Title style={styles.text}>
                {t('Settings.healthKit.totalStepsToday', {
                  steps: props.stepsPerDay,
                })}
              </ListItem.Title>
            </ListItem>
          )}
          {props.sleepAnalysis && (
            <ListItem containerStyle={styles.list}>
              <Icon name={'bedtime'} />
              <ListItem.Title style={styles.text}>
                {t('Settings.healthKit.sleep', {
                  sleep: props.sleepAnalysis,
                })}
              </ListItem.Title>
            </ListItem>
          )}

          {props.fitbitSteps && (
            <VictoryChart minDomain={{ y: 1 }} height={300} width={window.width + 20} scale={{ x: 'time' }}>
              <VictoryAxis
                tickFormat={
                  locale === 'de'
                    ? x =>
                        new Date(x).getHours() +
                        ':' +
                        (new Date(x).getMinutes() < 10 ? '0' : '') +
                        new Date(x).getMinutes()
                    : null
                }
              />
              <VictoryAxis dependentAxis tickFormat={y => y} />
              {props.heartRate && (
                <VictoryBar
                  style={{
                    data: { fill: 'rgba(255,0,0,0.25)' },
                  }}
                  data={props.heartRate}
                  x="time"
                  y="value"
                />
              )}

              <VictoryBar
                style={{
                  data: { fill: 'rgb(0,89,255)' },
                }}
                data={props.fitbitSteps}
                x="time"
                y="value"
              />
            </VictoryChart>
          )}

      {/*    {props.heartRate && (
            <VictoryChart height={200} minDomain={{ y: 50 }} width={window.width + 20} scale={{ x: 'time' }}>
              <VictoryAxis
                tickFormat={
                  locale === 'de'
                    ? x =>
                        new Date(x).getHours() +
                        ':' +
                        (new Date(x).getMinutes() < 10 ? '0' : '') +
                        new Date(x).getMinutes()
                    : null
                }
              />
              <VictoryAxis dependentAxis tickFormat={y => y} />
              <VictoryBar data={props.heartRate} x="time" y="value" />
            </VictoryChart>
          )}*/}

          {props.selectedFood.picture ? (
            <View style={styles.imageContainer}>
              <Image
                source={props.selectedFood.picture ? { uri: getImagePath(props.selectedFood.picture) } : null}
                style={styles.image}
              />
            </View>
          ) : null}
        </View>
        <Tags selectedFood={selectedFood} />
        {userSettings.glucoseSource === NIGHTSCOUT && (
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
  wrapper: { backgroundColor: '#fbfbfb' },
  imageContainer: { alignItems: 'center' },
  image: {
    width: dimension.width - 20,
    height: dimension.height / 1.5,
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: theme.spacing.S,
  },
  space: { paddingBottom: theme.spacing.S, paddingLeft: theme.spacing.L },
  list: {
    backgroundColor: theme.colors.grey5,
    marginBottom: theme.spacing.S,
  },
  text: { fontFamily: 'SecularOne-Regular', fontSize: 13, maxWidth: '90%' },
}));
