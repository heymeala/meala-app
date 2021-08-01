import React, { useState } from 'react';
import { ScrollView, Share, View } from 'react-native';
import { Badge, Button, ListItem, makeStyles, Text, useTheme } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { quizCategoriesApi } from '../generalQuizApi';
import { useNavigation } from '@react-navigation/core';
import { database } from '../../../Common/database_realm';
import { calculateScore } from '../calculateScore';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import analytics from '@react-native-firebase/analytics';

const QuizCategories = props => {
  const styles = useStyles();
  const { t, locale } = React.useContext(LocalizationContext);
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalScore, setTotalScore] = useState(null);
  const { theme } = useTheme();
  const navigation = useNavigation();

  React.useEffect(() => {
    CommunityQuiz();
    const willFocusSubscription = navigation.addListener('focus', () => {
      CommunityQuiz();
    });

    return willFocusSubscription;
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: t('Quiz.community.shareMessage', { score: totalScore.score }),
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          analytics().logEvent('community_quiz_score_shared', {
            totalScore: totalScore.score,
            sharedAction: 'sharedAction',
          });
        } else {
          // shared
          analytics().logEvent('community_quiz_score_shared', {
            totalScore: totalScore.score,
            sharedAction: 'shared',
          });
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        analytics().logEvent('community_quiz_score_shared', {
          totalScore: totalScore.score,
          sharedAction: 'dismissed',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CommunityQuiz = async () => {
    const localQuizData = await database.getCommunityQuizAnswers();
    const remoteQuizData = await quizCategoriesApi(locale);

    const tries = localQuizData.map(data => data.tries);
    const score = calculateScore(tries);
    setTotalScore({ score: score, tries: tries.length * 10 });

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

    setQuizData(filteredRemoteQuizData);
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
      {quizData
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
      {totalScore.score > 0 && (
        <View style={styles.button}>
          <Text h4>Community Quiz </Text>
          <Text h4>Gesamtpunktzahl</Text>
          <Text h1 h1Style={styles.score}>
            {totalScore.score} {t('Quiz.community.outOf')} {totalScore.tries}
          </Text>
          <Button onPress={onShare} title={t('Quiz.community.share')} />

          <Button
            type="clear"
            containerStyle={{ marginVertical: 60 }}
            titleStyle={{ color: theme.colors.error }}
            buttonStyle={{ backgroundColor: 'transparent' }}
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
