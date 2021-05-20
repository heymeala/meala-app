import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import CategoryListItem from './CategoryListItem';
import Questions from './Questions';
import { quizServings } from './quizServingTypes';

const Quiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const [quizType, setQuizType] = useState(null);
  const styles = useStyles();

  const totalQuestions = 5;

  return quizType !== null ? (
    <Questions totalQuestions={totalQuestions} quizType={quizType} setQuizType={setQuizType} />
  ) : (
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
  container: { padding: theme.spacing.M },
}));
