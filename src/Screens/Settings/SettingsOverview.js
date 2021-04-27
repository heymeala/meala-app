import React, {useEffect, useState} from 'react';
import {SafeAreaView, SectionList, Text, View} from 'react-native';
import {makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {useFocusEffect} from '@react-navigation/core';
import {database} from '../../Common/database_realm';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import {spacing} from '../../theme/styles';
import SettingsListItem from './SettingsListItem';
import SettingsFooter from './Footer';

const SettingsOverview = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();
  const [selectedId, setSelectedId] = useState(0);
  const styles = useStyles();

  useEffect(() => {
    load();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, []),
  );

  const load = () => {
    database
      .getGlucoseSource()
      .then(glucoseSource =>
        glucoseSource ? setSelectedId(glucoseSource) : 0,
      );
  };

  const SettingsMenuData = [
    {
      title: 'Profil',
      data: [
        {
          name: 'Einstellungen',
          link: 'ProfilSettings',
          icon: 'settings',
        },
      ],
    },
    {
      title: t('Settings.source'),
      data: [
        {
          name: 'HealthKit',
          link: 'HealthKitScreen',
          icon: 'heart',
          active: selectedId === '1',
        },
        {
          name: 'Nightscout',
          icon: 'link',
          link: 'DataSourceScreen',
          active: selectedId === '2',
        },
        /*        {
                    name: "Tidepool",
                    icon: "link",
                    link: "Tidepool",
                },*/
        {
          name: 'Dexcom USA',
          icon: 'link',
          link: 'Dexcom',
        },
        {
          name: 'Libre',
          icon: 'link',
          link: 'Libre',
        },
      ],
    },
    {
      title: 'E-Learning',
      data: [
        {
          name: !screenReaderEnabled
            ? 'Carb Quiz'
            : 'Kohlenhydrate Quiz. Noch nicht Barrierefrei',
          icon: 'md-game-controller-sharp',
          link: 'DataSourceScreen',
          weblink:
            locale === 'de'
              ? 'https://quiz.heymeala.com?sh=meala_app&lng=de'
              : 'https://quiz.heymeala.com?sh=meala_app&lng=en',
        },
        {
          name: t('GI.NavigationBarTitle'),
          icon: 'ios-pizza-sharp',
          link: 'SearchGiScreen',
        },
        {
          name: 'FatSecret',
          icon: 'link',
          link: 'FatSecretSettings',
        },
      ],
    },
    {
      title: t('Settings.about'),

      data: [
        {
          name: t('Settings.aboutmeala'),
          icon: 'ios-person-add-sharp',
          link: 'AboutScreen',
        },
        {
          name: t('Settings.statistics'),
          icon: 'pie-chart',
          link: 'StatisticScreen',
        },
        {
          name: t('Settings.privacy'),
          icon: 'md-lock-closed-sharp',
          weblink:
            'https://www.meal-advisor.com/policies/meala_datenschutz.pdf',
        },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <SectionList
          sections={SettingsMenuData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <SettingsListItem data={item} />}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
          ListFooterComponent={<SettingsFooter />}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsOverview;

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  wrapper: {backgroundColor: theme.colors.background},
  item: {
    backgroundColor: theme.colors.primary,
    padding: spacing.M,
    marginVertical: spacing.S,
    paddingHorizontal: spacing.S,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: spacing.S,
    fontSize: 16,
    fontFamily: 'SecularOne-Regular',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
  },
}));
