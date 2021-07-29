import React from 'react';
import { Platform } from 'react-native';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import { Badge, Divider, Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import openLink from '../../Common/InAppBrowser';
import { useNavigation } from '@react-navigation/core';
import { HEALTHKIT, LIBRETWOAPP, NIGHTSCOUT } from './glucoseSourceConstants';

const SettingsListItem = props => {
  const navigation = useNavigation();
  const { data } = props;
  const styles = useStyles();

  const successGlucoseData =
    data.active === true && data.id === NIGHTSCOUT
      ? 'success'
      : data.active === true && data.id === HEALTHKIT
      ? 'success'
      : data.active === true && data.id === LIBRETWOAPP
      ? 'success'
      : data.active === false
      ? 'error'
      : null;

  const screenReaderEnabled = useScreenReader();

  return Platform.OS !== 'ios' ? (
    data.name !== 'Health Kit' ? (
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
