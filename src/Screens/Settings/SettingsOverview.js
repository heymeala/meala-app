import React from 'react';
import { SafeAreaView, SectionList, Text, View } from 'react-native';
import { makeStyles } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import { spacing } from '../../theme/styles';
import SettingsListItem from './SettingsListItem';
import SettingsFooter from './Footer';
import { useUserSettings } from '../../hooks/useUserSettings';
import { HEALTHKIT, NIGHTSCOUT } from './glucoseSourceConstants';

const SettingsOverview = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const screenReaderEnabled = useScreenReader();
  const { userSettings } = useUserSettings();
  const styles = useStyles();

  const SettingsMenuData = [
    {
      title: 'Profil',
      data: [
        {
          name: t('Settings.SettingsTitle'),
          link: 'ProfilSettings',
          icon: 'settings',
        },
      ],
    },
    {
      title: t('Settings.source'),
      data: [
        {
          name: t('Settings.healthKit.name'),
          link: 'HealthKitScreen',
          icon: 'heart',
          active: userSettings.glucoseSource === HEALTHKIT,
        },
        {
          name: 'Nightscout',
          icon: 'nightscout',
          iconType: 'meala',
          link: 'DataSourceScreen',
          active: userSettings.glucoseSource === NIGHTSCOUT,
        },
        {
          name: 'FatSecret',
          icon: 'link',
          link: 'FatSecretSettings',
        },
        /*        {
                    name: "Tidepool",
                    icon: "link",
                    link: "Tidepool",
                },*/
        {
          name: t('Settings.Dexcom.name'),
          icon: 'dexcom',
          iconType: 'meala',
          link: 'Dexcom',
        },
        {
          name: t('Settings.Libre.name'),
          icon: 'libre',
          iconType: 'meala',
          link: 'Libre',
        },
      ],
    },
    {
      title: 'E-Learning',
      data: [
        {
          name: t('Quiz.name'),
          icon: 'einstein',
          iconType: 'meala',
          link: 'Quiz',
        },
        {
          name: t('Knowledge.name'),
          icon: 'archive',
          iconType: 'EvilIcons',
          link: 'Knowledge',
        },
        {
          name: t('GI.NavigationBarTitle'),
          icon: 'rise_arrow',
          iconType: 'meala',
          link: 'SearchGiScreen',
        },
      ],
    },
    {
      title: t('Settings.about'),

      data: [
        {
          name: t('Settings.aboutmeala'),
          icon: 'about',
          iconType: 'meala',
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
          weblink: 'https://www.meal-advisor.com/policies/meala_datenschutz.pdf',
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
          renderItem={({ item }) => <SettingsListItem data={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text accessibilityRole={'header'} style={styles.header}>
              {title}
            </Text>
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
  wrapper: { backgroundColor: theme.colors.background },
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
    fontFamily: "SecularOne-Regular",
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
  },
}));
