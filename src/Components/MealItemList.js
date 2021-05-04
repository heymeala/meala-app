import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {Avatar, Badge, Divider, ListItem} from 'react-native-elements';
import generateColor from '../Common/generateColor';
import moment from 'moment';
import ProgressBar from 'react-native-progress/Bar';
import {analyseTimeInRange} from '../Common/analyseTimeInRange';
import {useNavigation} from '@react-navigation/core';
import LocalizationContext from '../../LanguageContext';
import {useScreenReader} from '../hooks/useScreenReaderEnabled';

const MealItemsList = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const screenReaderEnabled = useScreenReader();
  moment.locale(locale);

  const timeInRange =
    props.item.cgmData !== null || props.item.cgmData
      ? analyseTimeInRange(JSON.parse(props.item.cgmData))
      : null;
  let curTime = new Date();



  const LatestMealSubtitle = () => {
    if (props.item) {
      let timeFromLatestMeal = new Date(
        moment(props.item.date).format(),
      ).getTime();
      let nowMinusThree = new Date(
        moment(curTime).subtract(3, 'hours').format(),
      ).getTime();
      let progressTime = Math.abs(timeFromLatestMeal - curTime);
      if (timeFromLatestMeal < nowMinusThree) {
        const cabs =
          props.item.carbs > 0
            ? '\n' + t('General.Carbs') + ' ' + props.item.carbs + 'g'
            : '';
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
              <Text style={{paddingTop: 8}}>
                {t('Accessibility.Home.wait')}

                {locale === 'de'
                  ? ' – Letzter Eintrag vor ' +
                    moment.duration(progressTime).hours() +
                    ' Stunden und ' +
                    moment.duration(progressTime).minutes() +
                    ' Minuten. '
                  : moment.duration(progressTime).hours() +
                    ' hours and ' +
                    moment.duration(progressTime).minutes() +
                    ' minutes ago '}
              </Text>
            ) : (
              <View>
                <View>
                  <Text style={{paddingTop: 8}}>
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

                <View style={{paddingTop: 5}}>
                  <ProgressBar
                    color="#F9DE1C"
                    progress={moment.duration(progressTime) / 100000 / 60 / 3}
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

  const badge = !screenReaderEnabled
    ? timeInRange !== null
      ? timeInRange + '%'
      : null
    : timeInRange !== null
    ? timeInRange + '%' + ' \n Zeit im Zielbereich'
    : null;
  return (
    <View key={props.item.id}>
      <ListItem
        onPress={() =>
          navigation.navigate('MealDataCollector', {mealId: props.item.id})
        }>
        <Avatar
          rounded
          title={props.item.food[0]}
          source={props.item.picture ? {uri: props.item.picture} : null}
          size={'large'}
          overlayContainerStyle={{backgroundColor: '#f9de1c'}}
        />
        <ListItem.Content>
          <ListItem.Title>{props.item.food}</ListItem.Title>
          <ListItem.Subtitle>
            <LatestMealSubtitle />
          </ListItem.Subtitle>
        </ListItem.Content>
        <Badge
          value={badge}
          badgeStyle={{
            backgroundColor: generateColor(
              timeInRange !== null ? timeInRange : '#fff',
            ),
          }}
          textStyle={{color: 'black'}}
          containerStyle={{marginTop: 0}}
        />
        <ListItem.Chevron />
      </ListItem>
      <Divider />
    </View>
  );
};

export default MealItemsList;
