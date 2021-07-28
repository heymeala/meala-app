import React, { useEffect, useRef, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { Badge, ListItem, makeStyles, Text, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { quizCategoriesApi } from '../generalQuizApi';
import { useNavigation } from '@react-navigation/core';
import { database } from '../../../Common/database_realm';
import { calculateScore } from '../calculateScore';
import LoadingSpinner from '../../../Common/LoadingSpinner';

const QuizCategories = props => {
  const styles = useStyles();
  const { t, locale } = React.useContext(LocalizationContext);
  const quizData = useRef(null);
  const [loading, setLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(null);
  const { theme } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    CommunityQuiz();

    /*    quizCategoriesApi(locale).then(data => {
      quizData.current = data;
      console.log(quizData.current);
      setLoading(false);
    });*/
  }, []);

  const CommunityQuiz = async () => {
    const localQuizData = await database.getCommunityQuizAnswers();
    const remoteQuizData = await quizCategoriesApi(locale);

    const tries = localQuizData.map(data => data.tries);
    const score = calculateScore(tries);
    setTotalScore(score);

    const localCategoryIds = localQuizData.map(item => item.categoryId);
    const filteredRemoteQuizData = remoteQuizData.map(item => {
      if (localCategoryIds.includes(item.id.toString())) {
        const answeredQuestionsByCategory = localCategoryIds.filter(id => {
          return id.toString() === item.id.toString();
        });
        return { ...item, answered: answeredQuestionsByCategory.length };
      } else {
        return { ...item, answered: 0 };
      }
    });
    //  console.log(filteredRemoteQuizData);

    quizData.current = filteredRemoteQuizData;
    setLoading(false);
  };

  return !loading ? (
    <ScrollView>
      <Text h2 style={styles.title}>
        {t('Quiz.community.title')}
      </Text>
      <ListItem
        bottomDivider
        onPress={() =>
          navigation.navigate('GeneralQuiz', {
            categoryId: 'random',
          })
        }>
        <ListItem.Content>
          <ListItem.Title style={styles.text}>{t('Quiz.community.random')}</ListItem.Title>
        </ListItem.Content>
        <Badge value={'5'} />
        <ListItem.Chevron />
      </ListItem>
      {quizData.current
        .filter(data => data.count > 0)
        .map((item, i) => {
          return (
            <ListItem
              bottomDivider
              onPress={() =>
                navigation.navigate('GeneralQuiz', {
                  categoryId: item.id,
                })
              }
              key={i}>
              <ListItem.Content>
                <ListItem.Title style={styles.text}>{item.name}</ListItem.Title>
              </ListItem.Content>
              <Badge
                badgeStyle={
                  item.count - item.answered <= 0
                    ? { backgroundColor: theme.colors.white }
                    : { backgroundColor: theme.colors.primary }
                }
                value={item.count - item.answered <= 0 ? '🥳' : item.count - item.answered}
              />
              <ListItem.Chevron />
            </ListItem>
          );
        })}
      {totalScore > 0 && (
        <View style={styles.button}>
          <Text h4>Community Quiz </Text>
          <Text h4>Gesamtpunktzahl</Text>
          <Text h1 h1Style={styles.score}>
            {totalScore}
          </Text>
          <Button
            title={t('Quiz.community.reset')}
            onPress={() => {
              database.deleteCommunityQuizAnswers();
              navigation.goBack();
            }}
          />
        </View>
      )}
    </ScrollView>
  ) : (
    <LoadingSpinner />
  );
};
export default QuizCategories;

const useStyles = makeStyles(theme => ({
  title: { padding: theme.spacing.L },
  text: {
    fontFamily: 'SecularOne-Regular',
  },
  score: {
    fontFamily: 'SecularOne-Regular',
    padding: theme.spacing.S,
  },
  button: { marginTop: theme.spacing.L, display: 'flex', alignItems: 'center' },
}));
