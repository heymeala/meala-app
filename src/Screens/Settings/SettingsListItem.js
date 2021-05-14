import React from 'react';
import {Platform} from 'react-native';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import {Badge, Divider, Icon, ListItem, makeStyles, Text} from 'react-native-elements';
import openLink from '../../Common/InAppBrowser';
import {useNavigation} from '@react-navigation/core';

const SettingsListItem = props => {
  const navigation = useNavigation();
  const {data} = props;
  const styles = useStyles();

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
        style={styles.item}
        accessible={true}
        accessibilityRole="button"
        onPress={() => (data.weblink ? openLink(data.weblink) : navigation.push(data.link))}>
        <Icon name={data.icon} type={data.iconType || 'ionicon'} />
        <ListItem.Title>{data.name}</ListItem.Title>
        <Badge status={successGlucoseData} />
        <Divider />
      </ListItem>
    ) : null
  ) : (
    <ListItem
      style={styles.item}
      accessible={true}
      accessibilityRole="button"
      onPress={() => (data.weblink ? openLink(data.weblink) : navigation.push(data.link))}>
      <Icon name={data.icon} type={data.iconType || 'ionicon'} />
      <ListItem.Title>{data.name}</ListItem.Title>
      {!screenReaderEnabled ? (
        <Badge status={successGlucoseData} />
      ) : (
        <Text>
          {successGlucoseData === 'success'
            ? 'Aktiviert'
            : successGlucoseData === 'error'
            ? 'Nicht aktiviert'
            : null}
        </Text>
      )}
      <Divider />
    </ListItem>
  );
};

export default SettingsListItem;

const useStyles = makeStyles(theme => ({
  item: {},
}));
