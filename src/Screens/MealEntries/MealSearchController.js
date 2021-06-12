import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import LocalizationContext from '../../../LanguageContext';
import { database } from '../../Common/database_realm';
import { Button, makeStyles } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DateList from './DateList';
import MealList from './MealList';
import { spacing } from '../../theme/styles';
import FirstOpenDialog from '../FirstOpenDialog';
import RestaurantList from './RestaurantList';
import messaging from '@react-native-firebase/messaging';

const MealSearchController = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  const mealsByName = 0;
  const mealsByPlaces = 1;
  const mealsByDate = 2;

  const handleIndexChange = index => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      database.deleteMeal();
      database.deleteRestaurant();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const SegmentedController = function () {
    return (
      <View style={styles.container}>
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
