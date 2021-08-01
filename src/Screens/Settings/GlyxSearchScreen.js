import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, ScrollView, View } from 'react-native';
import GItwo from '../../Common/gi';
import { Chip, ListItem, makeStyles, SearchBar, Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import { spacing } from '../../theme/styles';
import LottieView from 'lottie-react-native';
import { mapNumber } from '../../utils/map';
import LoadingSpinner from '../../Common/LoadingSpinner';

const GlyxSearchScreen = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles(dimensions);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const updateSearch = search => {
    setSearch(search);
    searchFilterFunction(search);
  };
  useEffect(() => {
    setData(GItwo);
    setLoading(false);
  }, []);

  const searchFilterFunction = text => {
    if (text.length >= 1) {
      const newData = GItwo.filter(item => {
        const itemData = `${item[locale].toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      setData(newData);
    } else {
      setData([]);
    }
  };

  function colorCode(value) {
    const low = [0, 40];
    const medium = [40, 70];
    const high = [70, 100];

    if (value >= low[0] && value <= low[1]) {
      const color = mapNumber(value, 0, 40, 0, 255);
      return `rgba(${color},255,0,0.5)`;
    }
    if (value > medium[0] && value <= medium[1]) {
      const color = mapNumber(value, 40, 70, 255, 200);
      return `rgba(255,${color},0,0.5)`;
    }
    if (value > high[0] && value <= high[1]) {
      const color = mapNumber(value, 0, 40, 200, 0);
      return `rgba(255,${color},0,0.5)`;
    }
  }

  return (
    <ScrollView style={styles.container}>
      <SearchBar
        placeholder={t('GI.Search')}
        platform={Platform.OS}
        onChangeText={updateSearch}
        value={search}
      />
      <View style={{ flexDirection: 'row' }}>
        <Chip onPress={() => updateSearch(t('GI.rice'))} containerStyle={styles.chip} title={t('GI.rice')} />
        <Chip
          onPress={() => updateSearch(t('GI.apple'))}
          containerStyle={styles.chip}
          title={t('GI.apple')}
        />
        <Chip
          onPress={() => updateSearch(t('GI.noodles'))}
          containerStyle={styles.chip}
          title={t('GI.noodles')}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.animationContainer}>
          <View>
            <LottieView
              style={styles.animation}
              source={require('../../assets/animations/food_carousel.json')}
              autoPlay
              loop
            />
          </View>
          <View>
            <Text h4 style={styles.text}>
              {t('GI.IntroText')}
            </Text>
            <Text style={styles.text}>{t('GI.example')}</Text>
          </View>
        </View>

        <View style={styles.knowledgeContainer}>
          <ListItem.Accordion
            content={
              <Text h3 style={styles.listItem}>
                {t('GI.NavigationBarTitle')}
              </Text>
            }
            isExpanded={expanded}
            onPress={() => {
              setExpanded(!expanded);
            }}>
            <Text h3 style={styles.infoText}>
              {t('GI.glyx_description')}
            </Text>
          </ListItem.Accordion>
        </View>
      </View>

      {!loading ? (
        data.map((list, i) => (
          <View key={i} style={{ ...styles.giList, backgroundColor: colorCode(list.GI) }}>
            <Text h3 style={{ fontFamily: 'SecularOne-Regular' }}>
              {list[locale]}
            </Text>
            <Text h3>GI = {list.GI}</Text>
          </View>
        ))
      ) : (
        <LoadingSpinner />
      )}
    </ScrollView>
  );
};

export default GlyxSearchScreen;

const useStyles = makeStyles((theme, dimensions) => ({
  container: { padding: spacing.S },
  center: {},
  animationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing.M,
  },
  chip: { padding: theme.spacing.S },
  animation: { width: 90, height: 90, justifyContent: 'center', marginRight: theme.spacing.S },
  knowledgeContainer: { marginVertical: spacing.L },
  listItem: { flex: 1, flexGrow: 1 },
  infoContainer: {},
  giList: { padding: spacing.S, marginVertical: 4, borderRadius: 5 },
  text: { padding: theme.spacing.S, width: 200, textAlignVertical: 'center' },
  infoText: { padding: theme.spacing.S },
}));
