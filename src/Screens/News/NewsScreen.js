import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, Icon, makeStyles, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { CALENDAR_URL } from '@env';
import moment from 'moment';
import LocalizationContext from '../../../LanguageContext';
import FadeInView from '../../Common/FadeInView';
import openLink from '../../Common/InAppBrowser';
import LoadingSpinner from "../../Common/LoadingSpinner";

const NewsScreen = ( props) => {
  const { t, locale } = React.useContext(LocalizationContext);

  const styles = useStyles();
  const [calendarEvents, setCalendarEvents] = useState(null);
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
    <SafeAreaView style={{ flex: 1 }}>
      <Text h1>News</Text>
      {calendarEvents ? (
        <View
          style={{
            backgroundColor: 'rgba(219,219,219,0.87)',
            paddingVertical: 2,
          }}>
          {/*      {!showNews ? (
          <FAB placement={'right'} onPress={() => setShowNews(true)} title={'news'} />
        ) : (*/}
          <ScrollView
            contentContainerStyle={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            {calendarEvents.map((events, i) => (
              <View
                key={i}
                style={{
                  padding: 8,
                  backgroundColor: '#f7f7f7',
                  borderRadius: 10,
                  marginVertical: 8,
                  justifyContent: 'space-between',
                  marginHorizontal: 14,
                }}>
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
                </View>
                {events.excerpt ? (
                  <HTML
                    tagsStyles={{
                      p: { color: 'black', fontSize: 16 },
                    }}
                    source={{ html: events.excerpt }}
                  />
                ) : null}

                <View style={{}}>
                  <Button
                    title={t('General.more')}
                    containerStyle={{ margin: 5, borderRadius: 50 }}
                    onPress={() => openLink(events.website ? events.website : events.url)}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ): <LoadingSpinner/>}
      <View style={{ margin: 8, position: 'absolute', bottom: 0, right: 0, left: 0 }}>
      {/*  <Button title={t('General.close')} onPress={() => navigation.navigate('Home')} />*/}
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;

const useStyles = makeStyles(theme => ({}));
