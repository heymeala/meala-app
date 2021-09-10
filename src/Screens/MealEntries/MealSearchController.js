import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import { database } from '../../Common/database_realm';
import { Button, makeStyles, Text } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DateList from './DateList';
import MealList from './MealList';
import { spacing } from '../../theme/styles';
import FirstOpenDialog from '../FirstOpenDialog';
import RestaurantList from './RestaurantList';
import messaging from '@react-native-firebase/messaging';
import { CALENDAR_URL } from '@env';
import HTML from 'react-native-render-html';
import openLink from '../../Common/InAppBrowser';
import { deviceWidth } from '../../utils/deviceHeight';
import Icon from 'react-native-vector-icons/Ionicons';

const MealSearchController = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [calendarEvents, setCalendarEvents] = useState(null);
  const [showNews, setShowNews] = useState(false);
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const mealsByName = 0;
  const mealsByPlaces = 1;
  const mealsByDate = 2;

  const handleIndexChange = index => {
    setSelectedIndex(index);
  };

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  useEffect(() => {
    //  getFcmToken();

    let isMounted = true;

    if (isMounted) {
      database.deleteMeal();
      database.deleteRestaurant();
    }
    fetch(CALENDAR_URL + 'lang=de&start_date=2021-09-01')
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

    return () => {
      isMounted = false;
    };
  }, []);

  const SegmentedController = function () {
    return (
      <View style={styles.container}>
        {calendarEvents &&
          (!showNews ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"center", height:60 }}>
              <Icon name="newspaper-outline" style={{ paddingRight: 10 }} type="ionicon" size={25} />
              <Button
                buttonStyle={{ backgroundColor: 'transparent' }}
                title={'Show news'}
                onPress={() => setShowNews(true)}
              />
            </View>
          ) : (
            <ScrollView horizontal contentContainerStyle={{ flexDirection: 'row' }}>
              {calendarEvents.map((events, i) => (
                <View
                  key={i}
                  style={{
                    padding: 8,
                    backgroundColor: '#ffd420',
                    width: deviceWidth - 50,
                    borderRadius: 10,
                    marginVertical: 8,
                    marginHorizontal: 8,
                    height: 200,
                    justifyContent: 'space-between',
                  }}>
                  <Text h2>{events.title}</Text>
                  {events.excerpt ? <HTML source={{ html: events.excerpt }} /> : null}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                      title={'Später'}
                      type={'outline'}
                      containerStyle={{ width: '40%', margin: 5 }}
                      buttonStyle={{ paddingHorizontal: 18, backgroundColor: 'transparent' }}
                      onPress={() => setShowNews(false)}
                    />

                    <Button
                      title={'Mehr'}
                      containerStyle={{ width: '40%', margin: 5 }}
                      buttonStyle={{ backgroundColor: '#fff' }}
                      onPress={() => openLink(events.url)}
                    />
                  </View>
                </View>
              ))}
            </ScrollView>
          ))}
        <SegmentedControlTab
          values={[t('Entries.Meals'), t('Entries.Places'), t('Entries.Date')]}
          accessibilityLabels={[
            `${t('Entries.Meals')} ${t('Accessibility.Home.button')}`,
            `${t('Entries.Places')} ${t('Accessibility.Home.button')}`,
            `${t('Entries.Date')} ${t('Accessibility.Home.button')}`,
          ]}
          borderRadius={45}
          tabsContainerStyle={styles.tabContainer}
          tabStyle={styles.inactiveTab}
          activeTabStyle={styles.activeTab}
          tabTextStyle={styles.inactiveTabText}
          activeTabTextStyle={styles.activeTabText}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
        />
      </View>
    );
  };

  if (selectedIndex === mealsByName) {
    return (
      <>
        <FirstOpenDialog />
        <MealList controlBar={<SegmentedController />} />
      </>
    );
  } else if (selectedIndex === mealsByPlaces) {
    return <RestaurantList controlBar={<SegmentedController />} />;
  } else if (selectedIndex === mealsByDate) {
    return <DateList controlBar={<SegmentedController />} />;
  } else {
    return null;
  }
};

export default MealSearchController;
const useStyles = makeStyles(theme => ({
  container: {
    padding: spacing.XS,
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  activeTab: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  inactiveTab: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  activeTabText: { color: theme.colors.white },
  inactiveTabText: {
    color: theme.colors.primary,
  },
  tabContainer: {
    height: 40,
    backgroundColor: theme.colors.white,
  },
}));
