import React from 'react';
import {View} from 'react-native';
import {makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../LanguageContext';

const RecipeDetails = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};

export default RecipeDetails;

const useStyles = makeStyles(theme => ({}));
