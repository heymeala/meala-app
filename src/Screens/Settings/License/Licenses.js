import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import data from '../License/licenses.json';
import { formatLicenses } from './getLicense';
import { Avatar, Divider, ListItem, makeStyles, Text } from 'react-native-elements';
import openLink from '../../../Common/InAppBrowser';

const Licenses = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const licenses = useRef(data);
  const formattedLicenseData = formatLicenses(licenses.current);
  return (
    <ScrollView>
      <Text h2 style={styles.root}>
        Animations
      </Text>
      <ListItem onPress={() => openLink('https://lottiefiles.com/59100-confetti-felyx')}>
        <ListItem.Title>Thiago Andrade</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/19411-ramen-noodles')}>
        <ListItem.Title>Sarah Marcant</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/33050-youre-a-winner-xd')}>
        <ListItem.Title>Ged Jurga</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/21652-delivery-guy-waiting')}>
        <ListItem.Title>Rishabh Goel</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/4698-wrong-answer')}>
        <ListItem.Title>Pedro Silva</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/4762-food-carousel')}>
        <ListItem.Title>Tu Nguyen</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/5066-meeting-and-stuff')}>
        <ListItem.Title>Caracolor</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/6519-cooking')}>
        <ListItem.Title>Aravind Chowdary</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://lottiefiles.com/36895-healthy-or-junk-food')}>
        <ListItem.Title>Akash Ranjan </ListItem.Title>
      </ListItem>
      <Text h2 style={styles.root}>
        Sounds
      </Text>
      <ListItem onPress={() => openLink('https://freesound.org/people/Bertrof/')}>
        <ListItem.Title>Bertrof</ListItem.Title>
      </ListItem>
      <ListItem onPress={() => openLink('https://freesound.org/people/Fupicat/')}>
        <ListItem.Title>Fupicat</ListItem.Title>
      </ListItem>
      <Text h2 style={styles.root}>
        Libraries
      </Text>
      {formattedLicenseData &&
      formattedLicenseData.map((data, i) => (
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

const useStyles = makeStyles(theme => ({ root: { padding: theme.spacing.M } }));
