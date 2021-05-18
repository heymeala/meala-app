import React, {useRef, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Badge, Divider, Icon, ListItem, makeStyles, Text} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import FatSecretQuiz from './FatSecretQuiz';
import {shuffle} from '../../utils/shuffel';
import {quizServings} from './loadQuestionRecipes';
import {badgeValue} from '../../Components/badgeValue';
import {gradientPercentageColor, textColor} from '../../Common/generateColor';
import CategoryListItem from './CategoryListItem';

const Quiz = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [quizType, setQuizType] = useState(null);
  const totalQuestions = 5;
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
  const slicedIds = useRef(fsRecipeIds.slice(0, totalQuestions));

  if (quizType !== null) {
    return (
      <SafeAreaView>
        <ScrollView style={styles.root}>
          <FatSecretQuiz fsRecipeIds={slicedIds.current} quizType={quizType} setQuizType={setQuizType} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.root}>
        <View style={styles.container}>
          <Text h2>{t('Quiz.guess_question')}</Text>
          <Text>{t('Quiz.guess_subtitle')}</Text>
        </View>
        <CategoryListItem
          setQuizType={setQuizType}
          quizServings={quizServings.carbohydrate}
          title={t('Quiz.carbohydrates_game')}
          subtitle={''}
          badge={totalQuestions}
        />
        <CategoryListItem
          setQuizType={setQuizType}
          quizServings={quizServings.calories}
          title={t('Quiz.calories_game')}
          subtitle={''}
          badge={totalQuestions}
        />
        <CategoryListItem
          setQuizType={setQuizType}
          quizServings={quizServings.fat}
          title={t('Quiz.fat_game')}
          subtitle={''}
          badge={totalQuestions}
        />
        <CategoryListItem
          setQuizType={setQuizType}
          quizServings={quizServings.protein}
          title={t('Quiz.protein_game')}
          subtitle={''}
          badge={totalQuestions}
        />
        <CategoryListItem
          setQuizType={setQuizType}
          quizServings={quizServings.fpe}
          title={t('Quiz.fpe_game')}
          subtitle={''}
          badge={totalQuestions}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Quiz;

const useStyles = makeStyles(theme => ({
  container: {padding: theme.spacing.M},
}));
