import React, {useRef, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {ListItem, makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import FatSecretQuiz from './FatSecretQuiz';
import {shuffle} from '../../utils/shuffel';
import {quizServings} from './loadQuestionRecipes';

const Quiz = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [quizType, setQuizType] = useState(null);
  console.log(quizType);
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
  const fsRecipeIds = shuffle(locale === 'de' ? fatSecretRecipesDE : fatSecretRecipesEN);
  const slicedIds = useRef(fsRecipeIds.slice(0, 3));

  if (quizType !== null) {
    return (
      <SafeAreaView>
        <ScrollView style={styles.root}>
          <FatSecretQuiz fsRecipeIds={slicedIds.current} quizType={quizType} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.root}>
        <ListItem onPress={() => setQuizType(quizServings.carbohydrate)}>
          <ListItem.Title>{t('Quiz.carbohydrates_game')}</ListItem.Title>
        </ListItem>
        <ListItem onPress={() => setQuizType(quizServings.calories)}>
          <ListItem.Title>{t('Quiz.calories_game')}</ListItem.Title>
        </ListItem>
        <ListItem onPress={() => setQuizType(quizServings.fat)}>
          <ListItem.Title>{t('Quiz.fat_game')}</ListItem.Title>
        </ListItem>
        <ListItem onPress={() => setQuizType(quizServings.protein)}>
          <ListItem.Title>{t('Quiz.protein_game')}</ListItem.Title>
        </ListItem>
        <ListItem onPress={() => setQuizType(quizServings.fpe)}>
          <ListItem.Title>{t('Quiz.fpe_game')}</ListItem.Title>
        </ListItem>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

const useStyles = makeStyles(theme => ({}));
