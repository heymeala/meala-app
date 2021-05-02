import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Button,
  Card,
  CheckBox,
  FAB,
  Input,
  ListItem,
  makeStyles,
  Text, useTheme,
} from "react-native-elements";
import {database} from '../../Common/database_realm';
import Clipboard from '@react-native-community/clipboard';
import LocalizationContext from '../../../LanguageContext';
import {spacing} from '../../theme/styles';

const NightscoutSettingsScreen = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {theme} = useTheme();
  const [nightscoutUrl, setNightscoutUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nightscoutVersion, setNightscoutVersion] = useState('');
  const [nightscoutStatus, setNightscoutStatus] = useState('');
  const [nightscoutToken, setNightscoutToken] = useState('');
  const [
    nightscoutTreatmentsUpload,
    setNightscoutTreatmentsUpload,
  ] = useState();
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(2);

  useEffect(() => {
    database.getSettings().then(data => {
      if (data) {
        setNightscoutUrl(data.nightscoutUrl);
        setNightscoutVersion(data.nightscoutVersion);
        setNightscoutStatus(data.nightscoutStatus);
        setNightscoutToken(data.nightscoutToken);
        setNightscoutTreatmentsUpload(data.nightscoutTreatmentsUpload);
      }
    });
    database
      .getGlucoseSource()
      .then(glucoseSource =>
        glucoseSource ? setSelectedId(glucoseSource) : null,
      );
  }, []);

  const readFromClipboard = async () => {
    //To get the text from clipboard
    const clipboardContent = await Clipboard.getString();
    setNightscoutUrl(prevState => clipboardContent);
  };

  function validate() {
    if (nightscoutUrl) {
      const checkUrl =
        nightscoutUrl.slice(-1) === '/'
          ? nightscoutUrl.slice(0, -1)
          : nightscoutUrl;
      setNightscoutUrl(checkUrl);
      const url = `${checkUrl}/api/v1/status.json?token=${nightscoutToken}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setNightscoutStatus(data.status);
          setNightscoutVersion(data.version);

          const dot1 = data.version.indexOf('.');
          const dot2 = data.version.indexOf('.', dot1 + 1);
          const nightscoutVersionManipulate = data.version.substring(0, dot2);
          if (parseFloat(nightscoutVersionManipulate) >= 0.12) {
            console.log('up to date - version greater than 0.12');
          }
          database
            .saveSettings(
              checkUrl,
              data.status,
              nightscoutVersionManipulate,
              nightscoutToken,
              nightscoutTreatmentsUpload,
            )
            .catch(err => {
              console.log('There was an error:' + err);
            });
          database.saveGlucoseSource(2);
          setErrorMessage(null);
          props.navigation.goBack();
        })
        .catch(err => {
          console.log('There was an error:' + err);
          setErrorMessage(t('Settings.wrongUrl'));
        });
    } else {
      setErrorMessage(t('Settings.urlMissing'));
    }
  }

  const onPress = () => {
    database.saveGlucoseSource(selectedId);
    setIsVisible(!isVisible);
  };

  const saveButton = nightscoutUrl
    ? {
        borderRadius: 5,
        backgroundColor: theme.colors.secondary,
      }
    : {borderRadius: 5, backgroundColor: '#999'};

  return (
    <>
      <ScrollView style={styles.container}>
        <View>
          <Button
            title={t('Settings.whatNightscout')}
            onPress={() => Linking.openURL(t('Settings.nsLink'))}
          />
          <Text h2 style={{padding: 20, paddingBottom: 10}}>
            {t('Settings.enter-nightscout-link')}
          </Text>

          <TouchableOpacity
            style={{paddingLeft: 20}}
            onPress={readFromClipboard}>
            <Text style={styles.link}>{t('Settings.clipboard')}</Text>
          </TouchableOpacity>
          <Input
            containerStyle={{paddingTop: 25}}
            value={nightscoutUrl}
            leftIcon={{
              type: 'ionicon',
              name: 'ios-link',
              containerStyle: {paddingRight: 10},
              iconStyle: {color: '#154d80'},
            }}
            onChangeText={text => setNightscoutUrl(text)}
            errorMessage={errorMessage ? errorMessage : null}
          />
          <Text style={{padding: 20, paddingBottom: 10}}>
            {t('Settings.token')}
          </Text>
          <Input
            containerStyle={{paddingTop: 25}}
            value={nightscoutToken}
            leftIcon={{
              type: 'ionicon',
              name: 'ios-key',
              containerStyle: {paddingRight: 10},
              iconStyle: {color: '#154d80'},
            }}
            onChangeText={text => setNightscoutToken(text)}
          />
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>{t('Settings.advanced')}</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}>
            <CheckBox
              center
              disabled={!nightscoutToken}
              iconRight
              title={t('Settings.uploadTreatmentsCheckbox')}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={nightscoutTreatmentsUpload}
              onPress={() =>
                setNightscoutTreatmentsUpload(!nightscoutTreatmentsUpload)
              }
            />
            <Text style={{padding: 20, paddingBottom: 10}}>
              {t('Settings.uploadTreatmentsInfo')}
            </Text>
          </ListItem.Accordion>

          <Card>
            <Text>{t('Settings.Info')}</Text>
            <Text>
              {t('General.eg')}
              {t('Settings.exampleLink')}
            </Text>
            <Text>
              {t('General.eg')} {t('Settings.exampleLink2')}
            </Text>
            <Text>
              {t('General.eg')}
              {t('Settings.exampleLink3')}
            </Text>
          </Card>
          <View style={{paddingTop: 20}}>
            <View style={{padding: 20}}>
              <Text>Nightscout-Version: {nightscoutVersion}</Text>
              <Text>Nightscout-Status: {nightscoutStatus}</Text>
            </View>
          </View>
        </View>
        {Platform.OS === 'ios' ? (
          <View style={{padding: 20}}>
            <Text style={{paddingBottom: 5}}>
              {t('Settings.nightscoutRecommendation')}
            </Text>
          </View>
        ) : null}
      </ScrollView>
      <FAB
        title={t('General.Save')}
        placement={'right'}
        buttonStyle={saveButton}
        onPress={() => validate()}
      />
    </>
  );
};

export default NightscoutSettingsScreen;

const useStyles = makeStyles(theme => ({
  link:{color: theme.colors.primary},
  container: {padding: spacing.S},
  center: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bottom: {
    padding: 10,
    paddingTop: 20,
  },
}));
