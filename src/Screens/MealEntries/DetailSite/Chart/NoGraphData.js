import React from 'react';
import {TouchableOpacity, View, Dimensions, Button} from 'react-native';
import {Image, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../../../LanguageContext';
import {useNavigation} from '@react-navigation/core';

const NoGraphData = () => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        onPress={() => navigation.navigate('SettingsStack')}>
        <Image
          source={require('../../../../assets/meala_graph.png')}
          placeholderStyle={{backgroundColor: '#fff'}}
          style={{width: Dimensions.get('window').width, height: 350}}
        />
        <Text h3 style={styles.noSource}>{t('Entries.noDataSource')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoGraphData;
const useStyles = makeStyles(theme => ({
  container: {padding: 20, margin: 'auto', flex: 1, alignItems: 'center'},
  noSource: {
    color: theme.colors.primary,
    textAlign: 'left',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
}));
