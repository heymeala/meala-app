import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { makeStyles } from 'react-native-elements';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import LocalizationContext from '../../../LanguageContext';
import moment from 'moment';
import { database } from '../../Common/realm/database';

const DateListHeader = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const today = moment();
  const [whiteListDataBaseDates, setWhiteListDataBaseDates] = useState([]);
  const { chosenDateStart, setChosenDateStart, controlBar } = props;
  useEffect(() => {
    dates();
  }, []);

  async function dates() {
    const white = await database.fetchMealDates();
    const purDates = white.map(date => moment(date.date));
    setWhiteListDataBaseDates(
      purDates.map(dates => {
        return { date: dates, dots: [{ color: 'blue' }] };
      }),
    );
  }

  return (
    <>
      <View style={styles.container}>
        {controlBar}

        <ReactNativeCalendarStrip
          scrollable={true}
          daySelectionAnimation={{
            type: 'border',
            duration: 200,
            borderWidth: 2,
            borderHighlightColor: 'blue',
          }}
          maxDate={today}
          // calendarAnimation={{Type:"parallel"}}
          // scrollerPaging={true}
          markedDates={whiteListDataBaseDates}
          selectedDate={chosenDateStart}
          onDateSelected={setChosenDateStart}
          style={{ height: 150, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: 'black' }}
          calendarColor={'#f9de1c'}
          dateNumberStyle={{ color: 'black' }}
          dateNameStyle={{ color: 'black' }}
          highlightDateNumberStyle={{ color: 'black' }}
          highlightDateNameStyle={{ color: 'black' }}
          disabledDateNameStyle={{ color: 'grey' }}
          disabledDateNumberStyle={{ color: 'grey' }}
        />
      </View>
    </>
  );
};

export default DateListHeader;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
  },
}));
