import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {database} from '../../Common/database_realm';
import moment from 'moment';
import MealItemList from '../../Components/MealItemList';
import {EmptyListComponent} from './Common/EmtyList';
import LocalizationContext from '../../../LanguageContext';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import * as Keychain from 'react-native-keychain';
import {getFoodByDateFromUser} from '../../Common/fatsecret/fatsecretApi';
import FatSecretDateData from './FatSecretDateData';

const SearchByDate = ({controlBar, navigation}, props) => {
    const {t, locale} = React.useContext(LocalizationContext);

    moment.locale(locale);
    const [restaurants, setRestaurants] = useState(undefined);
    const [chosenDateStart, setChosenDateStart] = useState(moment(new Date()));

    useEffect(() => {
        showRestaurants(
            chosenDateStart.startOf('day').toDate(),
            chosenDateStart.endOf('day').toDate(),
        );

        return () => {
            //todo: clean up function
            //your cleanup code codes here
        };
    }, []);

    function showRestaurants(startDate, endDate) {
        database
            .fetchMealWithDateTime(startDate, endDate)
            .then((allRestaurant) => setRestaurants(allRestaurant));
    }

    const keyExtractor = (item, index) => item.id;
    const renderItem = ({item}) => (
        <MealItemList item={item} navigation={props.navigation}/>
    );

    const [whiteListDataBaseDates, setWhiteListDataBaseDates] = useState([]);

    async function dates() {
        const white = await database.fetchMealDates();
        const purDates = white.map((date) => moment(date.date));
        setWhiteListDataBaseDates(purDates);
    }

    const [fatSecretData, setFatSecretData] = useState();

    useEffect(() => {

    }, [chosenDateStart]);

    useEffect(() => {
        dates();
    }, []);
    useEffect(
        function () {
          Keychain.hasInternetCredentials(
              'https://www.fatsecret.com/oauth/authorize',
          ).then((result) => {
            if (result !== false) {
              // get Date from DatePicker and Calculate days since epoch
              var myEpoch = Math.trunc(
                  chosenDateStart.valueOf() / 1000.0 / 60 / 60 / 24,
              );
              getFoodByDateFromUser(myEpoch, null).then((data) => {
                if (data.food_entries) {
                  if (data.food_entries.food_entry.length >= 0) {
                    const checkedData = data.food_entries.food_entry.map((data) => {
                      return {...data};
                    });
                    setFatSecretData(checkedData);
                  } else if (data.food_entries.food_entry) {
                    setFatSecretData([
                      {...data.food_entries.food_entry},
                    ]);
                  }
                } else {
                  setFatSecretData();
                  console.log('no data');
                }
              });
            }
          });

            showRestaurants(
                chosenDateStart.startOf('day').toDate(),
                chosenDateStart.endOf('day').toDate(),
            );
        },
        [chosenDateStart],
    );

    const markedDates = whiteListDataBaseDates.map((dates) => {
        return {date: dates, dots: [{color: 'blue'}]};
    });

    function headerComponent() {
        return (
            <>


                <View style={styles.container}>
                    {controlBar}
                    <ReactNativeCalendarStrip
                        markedDates={markedDates}
                        maxDate={moment()}

                       // calendarAnimation={{Type:"parallel"}}
                        scrollable={true}
                       // scrollerPaging={true}
                        selectedDate={chosenDateStart}
                        onDateSelected={function (date) {
                            setChosenDateStart(date);
                        }}
                        style={{height: 150, paddingTop: 20, paddingBottom: 10}}
                        daySelectionAnimation={{
                            type: 'border',
                            duration: 200,
                            borderWidth: 2,
                            borderHighlightColor: 'blue',
                        }}
                        calendarHeaderStyle={{color: 'black'}}
                        calendarColor={'#f9de1c'}
                        dateNumberStyle={{color: 'black'}}
                        dateNameStyle={{color: 'black'}}
                        highlightDateNumberStyle={{color: 'black'}}
                        highlightDateNameStyle={{color: 'black'}}
                        disabledDateNameStyle={{color: 'grey'}}
                        disabledDateNumberStyle={{color: 'grey'}}
                    />
                </View>
            </>
        );
    }

    return (
        <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            extraData={chosenDateStart}
            contentInsetAdjustmentBehavior="automatic"
            ListHeaderComponent={headerComponent()}
            ListFooterComponent={fatSecretData && <FatSecretDateData fatSecretData={fatSecretData}/>}
            data={restaurants}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={!fatSecretData &&<EmptyListComponent navigation={navigation}/>}
        />
    );
};

export default SearchByDate;

const styles = StyleSheet.create({
container:
{
    flex: 1
},
});
