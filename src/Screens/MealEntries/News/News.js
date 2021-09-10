import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, Icon, makeStyles, Text } from 'react-native-elements';
import { deviceWidth } from '../../../utils/deviceHeight';
import HTML from 'react-native-render-html';
import openLink from '../../../Common/InAppBrowser';
import LocalizationContext from '../../../../LanguageContext';
import { CALENDAR_URL } from '@env';
import FadeInView from '../../../Common/FadeInView';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';

const News = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const navigation = useNavigation();

  const [calendarEvents, setCalendarEvents] = useState(null);
  const [showNews, setShowNews] = useState(false);
  useEffect(() => {
    const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
    const language = locale === 'de' ? 'de' : 'en';
    const url = CALENDAR_URL + language + '&start_date=' + startOfMonth;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.events.length > 0) {
          const eventData = data.events;
          //   const isBetweenDates = moment().isBetween(eventData.start_date, eventData.end_date);
          //if (isBetweenDates) {
          setCalendarEvents(eventData);
          //  }
        }
      });
  }, []);

  return (
    calendarEvents && (
      <FadeInView
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(219,219,219,0.87)',
          paddingVertical: 2,
        }}>
        {/*      {!showNews ? (
          <FAB placement={'right'} onPress={() => setShowNews(true)} title={'news'} />
        ) : (*/}
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            height: showNews ? 220 : 60,
            justifyContent: 'space-between',
          }}>
          {calendarEvents.map((events, i) => (
            <TouchableOpacity
              key={i}
              style={{
                padding: 8,
                backgroundColor: '#f7f7f7',
                width: deviceWidth - 60,
                borderRadius: 10,
                marginVertical: 8,
                justifyContent: 'space-between',
                marginHorizontal: 4,
              }}
              disabled={showNews}
              onPress={() => setShowNews(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="newspaper-outline" style={{ paddingRight: 10 }} type="ionicon" size={25} />
                  <Text h3 h3Style={{ fontSize: 17 }}>
                    {events.title}
                  </Text>
                </View>
                {!showNews && (
                  <Button
                    title={t('General.read')}
                    containerStyle={{ borderRadius: 50 }}
                    buttonStyle={{ backgroundColor: 'transparent', padding: 2 }}
                    onPress={() => setShowNews(true)}
                  />
                )}
              </View>
              {events.excerpt && showNews ? (
                <HTML
                  tagsStyles={{
                    p: { color: 'black', fontSize: 16 },
                  }}
                  source={{ html: events.excerpt }}
                />
              ) : null}
              {showNews && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Button
                    title={t('General.close')}
                    containerStyle={{ width: '40%', margin: 5, borderRadius: 50 }}
                    buttonStyle={{ paddingHorizontal: 18, backgroundColor: 'transparent' }}
                    onPress={() => setShowNews(false)}
                  />

                  <Button
                    title={t('General.more')}
                    containerStyle={{ width: '40%', margin: 5, borderRadius: 50 }}
                    onPress={() => openLink(events.website ? events.website : events.url)}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
          <View style={{ justifyContent: 'center' }}>
            <Button title={'see all'} onPress={() => navigation.navigate('NewsScreen')} />
          </View>
        </ScrollView>
        {/*)}*/}
      </FadeInView>
    )
  );
};

export default News;

const useStyles = makeStyles(theme => ({}));
