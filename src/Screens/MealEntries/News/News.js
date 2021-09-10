import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, makeStyles, Text } from 'react-native-elements';
import { deviceWidth } from '../../../utils/deviceHeight';
import HTML from 'react-native-render-html';
import openLink from '../../../Common/InAppBrowser';
import LocalizationContext from '../../../../LanguageContext';
import { CALENDAR_URL } from '@env';
import FadeInView from '../../../Common/FadeInView';

const News = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [showNews, setShowNews] = useState(false);
  useEffect(() => {
    const url = CALENDAR_URL + 'de&start_date=2021-09-01';
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
          backgroundColor: '#21276f',
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
                <Text h3 h3Style={{ fontSize: 17 }}>
                  {events.title}
                </Text>
                {!showNews && (
                  <Button
                    title={'lesen'}
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
                    title={'schließen'}
                    type={'outline'}
                    containerStyle={{ width: '40%', margin: 5 }}
                    buttonStyle={{ paddingHorizontal: 18, backgroundColor: 'transparent' }}
                    onPress={() => setShowNews(false)}
                  />

                  <Button
                    title={'mehr'}
                    containerStyle={{ width: '40%', margin: 5 }}
                    onPress={() => openLink(events.url)}
                  />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/*)}*/}
      </FadeInView>
    )
  );
};

export default News;

const useStyles = makeStyles(theme => ({}));
