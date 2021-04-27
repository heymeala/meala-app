import React from 'react';
import {View} from 'react-native';
import {Image, makeStyles, Text} from 'react-native-elements';
import RoundInfoItem from './RoundInfoItem';
import AccessibleFoodInfoText from '../Accessability/AccessibleFoodInfoText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LocalizationContext from '../../../../LanguageContext';
import {useScreenReader} from '../../../hooks/useScreenReaderEnabled';

const CircleGroup = props => {
  const {t} = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();

  const styles = useStyles();
  const {carbSumme, insulinSumme} = props;
  return (
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
              props.selectedFood.picture && {
                uri: props.selectedFood.picture,
              }
            }
            borderRadius={42.5}
          />
        </View>
      ) : null}
      {insulinSumme > 0 ? (
        <View style={styles.insulinContainer}>
          {!screenReaderEnabled ? (
            <RoundInfoItem
              value={insulinSumme}
              unit={'u'}
              infoText={t('Entries.circles.insulin')}
            />
          ) : (
            <AccessibleFoodInfoText
              value={insulinSumme}
              unit={''}
              infoText={t('Accessibility.MealDetails.insulin')}
            />
          )}
        </View>
      ) : null}
      {carbSumme > 0 ? (
        !screenReaderEnabled ? (
          <View style={styles.carbContainer}>
            <Text style={{textAlign: 'center', fontSize: 17, color: '#37619C'}}>
              {carbSumme}g
            </Text>
            <Text style={{textAlign: 'center', fontSize: 10, color: '#37619C'}}>
              Carbs
            </Text>
            <View style={{left: 60, top: -0, position: 'absolute'}}>
              <View style={styles.carbIconContainer}>
                <FontAwesome5 name="pizza-slice" size={17} color="#fff" />
              </View>
            </View>
          </View>
        ) : (
          <AccessibleFoodInfoText
            value={carbSumme}
            unit={'g'}
            infoText={t('Accessibility.MealDetails.carbs')}
          />
        )
      ) : null}
    </View>
  );
};

export default CircleGroup;

const useStyles = makeStyles(theme => ({
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
}));
