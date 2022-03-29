import React, { useEffect, useState } from 'react';
import { Linking, Platform, SafeAreaView, ScrollView, Share, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Image, makeStyles, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import { CALENDAR_URL } from '@env';
import moment from 'moment';
import LocalizationContext from '../../../LanguageContext';
import openLink from '../../Common/InAppBrowser';
import LoadingSpinner from '../../Common/LoadingSpinner';

const NewsScreen = ({ navigation }, props) => {
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

  const onShare = async (url, title) => {
    try {
      const result = await Share.share(
        Platform.OS === 'ios'
          ? {
              url: url,
            }
          : {
              message: title + ' – ' + url + '?utm_source=meala',
            },
      );
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //  alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ alignItems: 'center', margin: 6 }}>
        <Text h1>{t('News.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={{}}>
        {calendarEvents ? (
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.87)',
              paddingVertical: 2,
              marginBottom: 20,
            }}>
            {/*      {!showNews ? (
          <FAB placement={'right'} onPress={() => setShowNews(true)} title={'news'} />
        ) : (*/}

            {calendarEvents.map((events, i) => (
              <View
                key={i}
                style={{
                  padding: 8,
                  backgroundColor: '#ffffff',
                  borderRadius: 10,
                  marginVertical: 8,
                  justifyContent: 'space-between',
                  marginHorizontal: 14,
                  elevation: 5,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
                {events.image && (
                  <TouchableOpacity onPress={() => openLink(events.website ? events.website : events.url)}>
                    <Image
                      style={{
                        height: 220,
                        width: '100%',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        marginBottom: 8,
                      }}
                      source={{ uri: events.image.sizes.medium.url }}
                    />
                  </TouchableOpacity>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                    <Icon name="newspaper-outline" style={{ paddingRight: 10 }} type="ionicon" size={25} />
                    <Text h3 h3Style={{ fontSize: 17 }}>
                      {events.title}
                    </Text>
                  </View>
                </View>
                {events.description ? (
                  <HTML
                    tagsStyles={{
                      p: { color: 'black', fontSize: 16 },
                    }}
                    source={{ html: events.description }}
                  />
                ) : null}
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{ marginHorizontal: 8 }}
                    onPress={() => onShare(events.url, events.title)}>
                    <Icon name={'ios-share'} />
                  </TouchableOpacity>
                  <Button
                    title={t('General.more')}
                    icon={
                      <Icon name={'ios-earth-sharp'} type={'ionicon'} containerStyle={{ marginRight: 8 }} />
                    }
                    containerStyle={{ margin: 12, borderRadius: 50 }}
                    buttonStyle={{ paddingHorizontal: 18 }}
                    onPress={() => openLink(events.website ? events.website : events.url)}
                  />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <LoadingSpinner />
        )}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderRadius: 20,
            width: 40,
            height: 40,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#264F9F',
          }}
          onPress={() => Linking.openURL('mailto:mail@heymeala.com')}>
          <Icon name={'mail'} color={'#264F9F'} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL('mailto:mail@heymeala.com')}
          style={{ marginBottom: 70, paddingTop: 10, padding: 12, backgroundColor: '#ffffff' }}>
          <Text>{t('News.addEvent')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={{ alignItems: 'center', margin: 8, position: 'absolute', bottom: 0, right: 0, left: 0 }}>
        <Button title={t('General.close')} onPress={() => navigation.navigate('Home')} />
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;

const useStyles = makeStyles(theme => ({}));
