import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Avatar, Badge, Divider, ListItem, Text } from 'react-native-elements';
import { gradientPercentageColor, textColor } from '../Common/generateColor';
import moment from 'moment';
import ProgressBar from 'react-native-progress/Bar';
import { analyseTimeInRange } from '../Common/analyseTimeInRange';
import { useNavigation } from '@react-navigation/core';
import LocalizationContext from '../../LanguageContext';
import { useScreenReader } from '../hooks/useScreenReaderEnabled';
import AccessibleListItem from '../Screens/MealEntries/Accessability/AccessibleListItem';
import { WAITING_TIME } from '../Common/Constants/waitingTime';
import { badgeValue } from './badgeValue';
import { getImagePath } from '../utils/getImagePath';

export const MealItemsList = React.forwardRef((props, ref) => {
  const { t, locale } = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const screenReaderEnabled = useScreenReader();
  moment.locale(locale);
  const [tir, setTir] = useState(null);

  useEffect(() => {
    // ToDo: Fetch glucose values
    if (props.item.cgmData) {
      const parsedData = JSON.parse(props.item.cgmData);
      const timeInRange = analyseTimeInRange(parsedData, props.item.date); // string with tir description and calculation
      setTir(timeInRange); // string with tir description and calculation
    }
  }, [props.item.cgmData]);

  let curTime = new Date();

  const LatestMealSubtitle = () => {
    if (props.item) {
      let timeFromLatestMeal = new Date(moment(props.item.date).format()).getTime();
      let nowMinusThree = new Date(moment(curTime).subtract(WAITING_TIME, 'hours').format()).getTime();
      let progressTime = Math.abs(timeFromLatestMeal - curTime);
      if (timeFromLatestMeal < nowMinusThree) {
        const cabs = props.item.carbs > 0 ? '\n' + t('General.Carbs') + ' ' + props.item.carbs + 'g' : '';
        return (
          <Text>
            {moment(props.item.date).format('lll')}
            {cabs}
          </Text>
        );
      } else {
        return (
          <>
            {screenReaderEnabled ? (
              <AccessibleListItem progressTime={progressTime} />
            ) : (
              <View>
                <View>
                  <Text style={{ paddingTop: 8 }}>
                    {locale === 'de'
                      ? 'Vor ' +
                      moment.duration(progressTime).hours() +
                      ' Stunden und ' +
                      moment.duration(progressTime).minutes() +
                      ' Minuten. '
                      : moment.duration(progressTime).hours() +
                      ' hours and ' +
                      moment.duration(progressTime).minutes() +
                      ' minutes ago '}
                  </Text>
                </View>

                <View style={{ paddingTop: 5 }}>
                  <ProgressBar
                    color="#F9DE1C"
                    progress={moment.duration(progressTime) / 1000 / 60 / 60 / 3}
                    width={Dimensions.get('window').width / 1.6}
                  />
                </View>
              </View>
            )}
          </>
        );
      }
    } else {
      return <Text>No Item</Text>;
    }
  };

  return (
    <View style={{ height: 110 }} key={props.item._id} ref={ref}>
      <ListItem onPress={() => navigation.navigate('MealDataCollector', { mealId: props.item._id })}>
        <Avatar
          rounded
          title={props.item.food[0]}
          source={props.item.picture ? { uri: getImagePath(props.item.picture) } : null}
          size={'large'}
          overlayContainerStyle={{ backgroundColor: '#f9de1c' }}
        />
        <ListItem.Content>
          <ListItem.Title>{props.item.food}</ListItem.Title>
          <ListItem.Subtitle>
            <LatestMealSubtitle />
          </ListItem.Subtitle>
        </ListItem.Content>

        <Badge
          value={badgeValue(screenReaderEnabled, tir)}
          badgeStyle={{
            backgroundColor: gradientPercentageColor(tir),
          }}
          textStyle={{ color: textColor(tir) }}
          containerStyle={{ marginTop: 0 }}
        />

        <ListItem.Chevron />
      </ListItem>
      <Divider />
    </View>
  );
});
