import React from 'react';
import {View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import {spacing} from '../../../theme/styles';

const NoResultsText = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.noResultsContainer}>
      <Text h1>
        {props.text} {props.value}
      </Text>
    </View>
  );
};

export default NoResultsText;

const useStyles = makeStyles(theme => ({
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 150,
    alignItems: 'center',
    padding: spacing.L,
  },
}));
