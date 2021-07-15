import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Badge, ListItem, makeStyles, Text } from "react-native-elements";
import LocalizationContext from '../../../../LanguageContext';
import { quizCategoriesApi } from '../generalQuizApi';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import { useNavigation } from '@react-navigation/core';

const QuizCategories = props => {
  const styles = useStyles();
  const { t, locale } = React.useContext(LocalizationContext);
  const quizData = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    quizCategoriesApi(locale).then(data => {
      quizData.current = data;
      console.log(quizData.current);
      setLoading(false);
    });
  }, []);
  return !loading ? (
    <View>
      <Text h2 style={styles.title}>{t('Quiz.community.title')}</Text>
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
              <Badge value={item.count} />
              <ListItem.Chevron />
            </ListItem>
          );
        })}
    </View>
  ) : (
    <LoadingSpinner />
  );
};
export default QuizCategories;

const useStyles = makeStyles(theme => ({
  title:{padding: theme.spacing.L},
  text:{fontFamily:'Secular One'}
}));
