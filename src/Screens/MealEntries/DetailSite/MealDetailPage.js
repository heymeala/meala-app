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

const MealDetailsComponent = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { userSettings } = useUserSettings();

  moment.locale(locale);
  const { selectedFood } = props;
  const foodDatumMoment = moment(selectedFood.date).format();
  const foodDatum = moment(foodDatumMoment).format('lll');
  const dimension = Dimensions.get('window');
  const styles = useStyles(dimension);
  const navigation = useNavigation();
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

          {props.heartRate &&
            props.heartRate['activities-heart-intraday'].dataset.map(data => (
              <ListItem containerStyle={styles.list}>
                <Icon name={'bedtime'} />
                <ListItem.Title style={styles.text}>{data.time} : {data.value}</ListItem.Title>
              </ListItem>
            ))}
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
