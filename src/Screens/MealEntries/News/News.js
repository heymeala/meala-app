import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, makeStyles, Text } from 'react-native-elements';
import { deviceWidth } from '../../../utils/deviceHeight';
import HTML from 'react-native-render-html';
import openLink from '../../../Common/InAppBrowser';
import LocalizationContext from '../../../../LanguageContext';
import { CALENDAR_URL } from '@env';

const News = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [showNews, setShowNews] = useState(false);
  useEffect(() => {
    const url = CALENDAR_URL + 'lang=de'
    console.log(url)
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
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor:'#2638ff' }}>
        {/*      {!showNews ? (
          <FAB placement={'right'} onPress={() => setShowNews(true)} title={'news'} />
        ) : (*/}
        <ScrollView
          horizontal
          contentContainerStyle={{
            flexDirection: 'row',
            height: showNews ? 200 : 70,
            justifyContent: 'space-between',
          }}>
          {calendarEvents.map((events, i) => (
            <View
              key={i}
              style={{
                padding: 8,
                backgroundColor: '#f7f7f7',
                width: deviceWidth - 80,
                borderRadius: 10,
                marginVertical: 8,
                marginHorizontal: 8,
                borderColor: '#2638ff',
                borderStyle: 'solid',
                borderWidth: 1,
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text h3 h3Style={{ fontSize: 17 }}>
                  {events.title}
                </Text>
                {!showNews && (
                  <Button
                    title={'lesen'}
                    buttonStyle={{ backgroundColor: 'transparent' }}
                    onPress={() => setShowNews(true)}
                  />
                )}
              </View>
              {events.excerpt && showNews ? <HTML source={{ html: events.excerpt }} /> : null}
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
            </View>
          ))}
        </ScrollView>
        {/*)}*/}
      </View>
    )
  );
};

export default News;

const useStyles = makeStyles(theme => ({}));
