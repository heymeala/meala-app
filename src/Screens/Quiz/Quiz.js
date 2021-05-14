import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {Image, makeStyles, Text, Button} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {getRecipeDetails} from '../../Common/fatsecret/fatsecretApi';
import FatSecretQuiz from './FatSecretQuiz';

const Quiz = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <SafeAreaView>
      <ScrollView style={styles.root}>
        <FatSecretQuiz />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

const useStyles = makeStyles(theme => ({
  root: {minHeight: 700},
  image: {width: '100%', height: 250, borderRadius: 10, marginBottom: theme.spacing.L},
  desc: {paddingVertical: theme.spacing.S},
}));
