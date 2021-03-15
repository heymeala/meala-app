import React, {useEffect, useState} from 'react';
import {Linking, Platform, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {Badge, Divider, ListItem, SocialIcon} from 'react-native-elements';
import openLink from '../../Common/InAppBrowser';
import LocalizationContext from '../../../LanguageContext';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/core';
import {database} from '../../Common/database_realm';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';

const Item = ({data, navigation}) => {
    const successGlucoseData =
        data.active === true && data.name === 'Nightscout'
            ? 'success'
            : data.active === true && data.name === 'HealthKit'
            ? 'success'
            : data.active === false
                ? 'error'
                : null;
    const screenReaderEnabled = useScreenReader();

    return Platform.OS !== 'ios' ? (
        data.name !== 'HealthKit' ? (
            <ListItem
                accessible={true}
                accessibilityRole="button"
                onPress={() =>
                    data.weblink ? openLink(data.weblink) : navigation.push(data.link)
                }>
                <Icon name={data.icon}/>
                <ListItem.Title>{data.name}</ListItem.Title>
                <Badge status={successGlucoseData}/>

                <Divider/>
            </ListItem>
        ) : null
    ) : (
        <ListItem
            accessible={true}
            accessibilityRole="button"
            onPress={() =>
                data.weblink ? openLink(data.weblink) : navigation.push(data.link)
            }>
            <Icon name={data.icon}/>
            <ListItem.Title>{data.name}</ListItem.Title>
            {!screenReaderEnabled ? (
                <Badge status={successGlucoseData}/>
            ) : (
                <Text>
                    {successGlucoseData === 'success'
                        ? 'Aktiviert'
                        : successGlucoseData === 'error'
                            ? 'Nicht aktiviert'
                            : null}
                </Text>
            )}
            <Divider/>
        </ListItem>
    );
};

function SettingsOverview(props) {
    const {t, locale} = React.useContext(LocalizationContext);
    const screenReaderEnabled = useScreenReader();
    const [selectedId, setSelectedId] = useState(0);

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
            .then((glucoseSource) =>
                glucoseSource ? setSelectedId(glucoseSource) : 0,
            );
    };

    const DATA = [
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
                    name: "Dexcom USA",
                    icon: "link",
                    link: "Dexcom",
                },    {
                    name: "Libre",
                    icon: "link",
                    link: "Libre",
                },
            ]
        },
        {
            title: "E-Learning",
            data: [  {

                name: !screenReaderEnabled ?  "Carb Quiz" : "Kohlenhydrate Quiz. Noch nicht Barrierefrei",
                icon: "md-game-controller-sharp",
                link: "DataSourceScreen",
                weblink: locale === "de" ? "https://quiz.heymeala.com?sh=meala_app&lng=de" : "https://quiz.heymeala.com?sh=meala_app&lng=en"
            }, {name: t("GI.NavigationBarTitle"), icon: "ios-pizza-sharp", link: "SearchGiScreen"},
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
            <View style={{backgroundColor: '#fff', marginHorizontal: 16}}>
                <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({item}) => (
                        <Item data={item} navigation={props.navigation}/>
                    )}
                    renderSectionHeader={({section: {title}}) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    ListFooterComponent={
                        <View style={{padding: 20}}>
                            <TouchableOpacity
                                onPress={() => Linking.openURL('mailto:mail@heymeala.com')}>
                                <Text>{t('Settings.feedback')}</Text>
                            </TouchableOpacity>
                            {!screenReaderEnabled &&
                            <View
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    paddingTop: 20,
                                }}>
                                <SocialIcon
                                    light
                                    onPress={() =>
                                        Linking.openURL('instagram://user?username=heymeala').catch(
                                            () => {
                                                Linking.openURL('https://www.instagram.com/heymeala');
                                            },
                                        )
                                    }
                                    type="instagram"
                                />
                                <SocialIcon
                                    light
                                    onPress={() =>
                                        Linking.openURL('https://www.facebook.com/heymeala')
                                    }
                                    type="facebook"
                                />
                                <SocialIcon
                                    light
                                    onPress={() =>
                                        Linking.openURL(
                                            'twitter://user?screen_name=heymeala',
                                        ).catch(() => {
                                            Linking.openURL('https://www.twitter.com/heymeala');
                                        })
                                    }
                                    type="twitter"
                                />
                            </View>
                            }
                        </View>
                    }
                />
            </View>
        </SafeAreaView>
    );
}

export default SettingsOverview;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#ffd420',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        paddingTop: 20,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
    },
});
