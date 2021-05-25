import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import data from '../License/licenses.json';
import { formatLicenses } from './getLicense';
import { Avatar, ListItem, makeStyles } from 'react-native-elements';
import openLink from '../../../Common/InAppBrowser';

const Licenses = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const licenses = useRef(data);
  const n = formatLicenses(licenses.current);
  console.log(n);
  return (
    <ScrollView style={styles.root}>
      {n &&
        n.map((data, i) => (
          <View key={i}>
            <ListItem onPress={() => openLink(data.licenseUrl)}>
              <Avatar rounded={true} source={{ uri: data.image }} />
              <ListItem.Content>
                <ListItem.Title h4>{data.name}</ListItem.Title>
                <ListItem.Subtitle>
                  {data.version} {data.licenses} {data.username}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>
        ))}
    </ScrollView>
  );
};

export default Licenses;

const useStyles = makeStyles(theme => ({}));
