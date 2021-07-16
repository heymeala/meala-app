import React, { useEffect, useMemo } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import LottieView from 'lottie-react-native';
import winner from '../../../assets/animations/quiz/winner.json';
import { calculateScore } from '../calculateScore';
import analytics from '@react-native-firebase/analytics';

const GeneralQuizFinish = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { answeredQuestions, categoryId } = props;
  const contentWidth = useWindowDimensions().width;
  const tries = answeredQuestions.map(data => data.tries);
  const score = useMemo(() => calculateScore(tries), []);
  console.log(answeredQuestions);

  useEffect(() => {
    analytics().logEvent('quiz_result', {
      score: score,
      type: categoryId,
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <Text accessibilityRole={'header'} h1 style={styles.text}>
          {score} {t('Quiz.score')}
        </Text>
        <LottieView style={{ width: '100%' }} source={winner} loop={false} autoPlay />
      </View>
      {answeredQuestions.map((item, index) => {
        return (
          <View style={styles.container} key={index}>
            <Text>{t('Quiz.tries_result', { tries: item.tries })} </Text>
            <Text h1>{item.quizData.acf.question}</Text>
            <Text h2>{item.quizData.acf.right_answer}</Text>

            {/*         {item.quizData.acf.info ? (
              <HTML
                baseFontStyle={styles.html}
                source={{ html: item.quizData.acf.info }}
                contentWidth={contentWidth}
              />
            ) : null}*/}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default GeneralQuizFinish;

const useStyles = makeStyles(theme => ({
  container: { padding: theme.spacing.M },
  text: { textAlign: 'center', margin: 12 },
}));
