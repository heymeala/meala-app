import React, { useEffect, useRef, useState } from "react";
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import {Image, makeStyles, Text, Button} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {getRecipeDetails} from '../../Common/fatsecret/fatsecretApi';
import FatSecretQuiz from './FatSecretQuiz';
import { shuffle } from "../../utils/shuffel";

const Quiz = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const fatSecretRecipes = [
    '8866808',
    '8307492',
    '5373738',
    '8953356',
    '11736480',
    '9216766',
    '8447633',
    '8289890',
    '8285578',
    '13291554',
    '12119207',
    '9661813',
    '8215434',
    '7536700',
  ];
  const fsRecipeIds = useRef(shuffle(fatSecretRecipes));

  return (
    <SafeAreaView>
      <ScrollView style={styles.root}>
        <FatSecretQuiz fsRecipeIds={fsRecipeIds.current} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

const useStyles = makeStyles(theme => ({
}));
