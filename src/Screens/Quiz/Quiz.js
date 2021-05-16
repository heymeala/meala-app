import React, {useRef} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import FatSecretQuiz from './FatSecretQuiz';
import {shuffle} from '../../utils/shuffel';

const Quiz = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const fatSecretRecipesDE = [
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
    '13673494',
    '12365528',
    '12260350',
    '9790373',
    '9210174',
    '8583758',
    '7913319',
    '7529192',
    '6906467',
    '5803093',
    '5444848',
  ];

  const fatSecretRecipesEN = [
    '8956150',
    '7160796',
    '22594555',
    '5143006',
    '7046402',
    '197356',
    '4779131',
    '8281604',
    '5973094',
    '11046680',
    '5760302',
    '268436',
    '1254025',
    '778742',
    '614',
    '4492179',
    '8937887',
    '4244734',
    '1586500',
    '8016123',
  ];
  const testData = ['6906467', '5803093', '5444848'];
  const fsRecipeIds = useRef(shuffle(locale === 'de' ? testData : fatSecretRecipesEN));

  return (
    <SafeAreaView>
      <ScrollView style={styles.root}>
        <FatSecretQuiz fsRecipeIds={fsRecipeIds.current} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

const useStyles = makeStyles(theme => ({}));
