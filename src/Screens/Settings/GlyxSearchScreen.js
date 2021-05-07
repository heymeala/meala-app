import React, {useState} from 'react';
import {Dimensions, Platform, ScrollView, View} from 'react-native';
import GItwo from '../../Common/gi';
import {ListItem, makeStyles, SearchBar, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {spacing} from '../../theme/styles';
import LottieView from 'lottie-react-native';
import {mapNumber} from '../../utils/map';
const GlyxSearchScreen = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const dimensions = Dimensions.get('window');
  const styles = useStyles(dimensions);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const updateSearch = search => {
    setSearch(search);
    searchFilterFunction(search);
  };

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

      {data.map((list, i) => (
        <View
          key={i}
          style={{...styles.giList, backgroundColor: colorCode(list.GI)}}>
          <Text h3 style={{fontFamily: 'SecularOne-Regular'}}>
            {list[locale]}
          </Text>
          <Text h3>GI = {list.GI}</Text>
        </View>
      ))}

      {data.length < 1 ? (
        <View style={styles.infoContainer}>
          <View style={styles.animationContainer}>
            <LottieView
              style={styles.animation}
              source={require('../../assets/animations/food_carousel.json')}
              autoPlay
              loop
            />
          </View>
          <Text h4 style={styles.text}>
            {t('GI.IntroText')}
          </Text>
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
      ) : null}
    </ScrollView>
  );
};

export default GlyxSearchScreen;

const useStyles = makeStyles((theme, dimensions) => ({
  container: {padding: spacing.S},
  center: {},
  animationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: spacing.M,
  },
  animation: {width: 150},
  knowledgeContainer: {marginVertical: spacing.L},
  listItem: {flex: 1, flexGrow: 1},
  infoContainer: {},
  giList: {padding: spacing.S, marginVertical: 4, borderRadius: 5},
  text: {padding: spacing.S},
  infoText: {padding: spacing.S},
}));
