import React from 'react';
import {View} from 'react-native';
import {Divider, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {spacing} from '../../theme/styles';

const NutritionDetailItem = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <>
      <View style={styles.root}>
        <Text style={styles.nutritionText}>{props.text}</Text>
        <Text>{props.data}</Text>
      </View>
      <Divider style={styles.space} />
    </>
  );
};

export default NutritionDetailItem;

const useStyles = makeStyles(theme => ({
  root: {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: theme.spacing.M},
  nutritionText: {paddingVertical: theme.spacing.XS},
  space: {marginVertical: theme.spacing.XS},
}));
