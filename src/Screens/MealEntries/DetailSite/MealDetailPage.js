import React from 'react';
import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import { Image, makeStyles, Text } from 'react-native-elements';
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
import { DEFAULT, NIGHTSCOUT } from '../../Settings/glucoseSourceConstants';
import { useNavigation } from '@react-navigation/core';
import { spacing } from '../../../theme/styles';

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

  const duration = React.useMemo(() => getDuration(props.treatments, foodDatumMoment), [
    props.treatments,
    foodDatumMoment,
  ]);
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
        <View style={{ alignItems: 'center' }}>
          {userSettings.glucoseSource === NIGHTSCOUT && insulinSumme.length > 0 && (
            <View>
              <Text style={styles.space}>{spritzEssAbstandText}</Text>
            </View>
          )}
          {props.stepsPerDay !== null && (
            <Text style={styles.space}>
              {t('Settings.healthKit.totalStepsToday', {
                steps: props.stepsPerDay,
              })}
            </Text>
          )}

          {props.selectedFood.picture ? (
            <Image
              source={props.selectedFood.picture ? { uri: props.selectedFood.picture } : null}
              style={styles.image}
            />
          ) : null}
        </View>
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
  image: {
    width: dimension.width - 20,
    height: dimension.height / 1.5,
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
  },
  space: { paddingBottom: spacing.S },
}));
