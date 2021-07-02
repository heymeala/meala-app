import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image, makeStyles, Text } from "react-native-elements";
import LocalizationContext from '../../../../LanguageContext';
import { generalQuizApi } from '../generalQuizApi';
import AnswerButtonsGeneral from './AnswerButtonsGeneral';
import { shuffle } from '../../../utils/shuffel';
import openLink from '../../../Common/InAppBrowser';
import LoadingSpinner from '../../../Common/LoadingSpinner';

const GeneralQuiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const quizData = useRef(null);
  const [answers, setAnswers] = useState();
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [currentAuthor, setCurrentAuthor] = useState('');
  console.log(quizData);

  useEffect(() => {
    generalQuizApi(locale).then(data => {
      quizData.current = data;
      nextQuestion();
    });
  }, []);

  function nextQuestion() {
    setLoading(true);
    setCurrentAuthor('');
    setStep(prevState => prevState + 1);
    const acf = quizData.current[step].acf;
    const answersArray = [
      { id: 1, answer: acf.right_answer, right: true },
      { id: 2, answer: acf.answer_2, right: false },
      { id: 3, answer: acf.answer_3, right: false },
    ];
    const randomAnswers = shuffle(answersArray);
    setAnswers(randomAnswers);

    setLoading(false);

    getAuthor(quizData.current[step].author);
    console.log('step', step);
    console.log(quizData.current.length);
  }

  async function getAuthor(id) {
    const response = await fetch('https://www.heymeala.com/wp-json/wp/v2/users/' + id);
    const author = await response.json();
    setCurrentAuthor(author);
    console.log(author);
  }

  return (
    <View style={styles.container}>
      {quizData.current && !loading && step <= quizData.current.length ? (
        <>
          {quizData.current[step - 1].acf.image.url && (
            <Image style={styles.questionImage} source={{ uri: quizData.current[step - 1].acf.image.url }} />
          )}
          <Text h1 h1Style={styles.h1}>
            {quizData.current[step - 1].acf.question}
          </Text>
          <AnswerButtonsGeneral answers={answers} setStep={setStep} step={step} nextQuestion={nextQuestion} />
          <TouchableOpacity onPress={() => openLink(currentAuthor.url)}>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profile}
                source={{
                  uri: 'https://secure.gravatar.com/avatar/2ac18813bb4baa0f1889c135d8ff6ab7?s=24&d=mm&r=g',
                }}
              />
              <Text>question by {currentAuthor.name}</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : (
        /*   quizData.current.map((item, i) => {
        return (
        <View key={i}>
        <Text>{item.acf.question}</Text>
        </View>
        );
      })*/
        <LoadingSpinner />
      )}
    </View>
  );
};

export default GeneralQuiz;

const useStyles = makeStyles(theme => ({
  container: { padding: theme.spacing.M, height: '100%' },
  profile: { width: 24, height: 24, marginHorizontal: theme.spacing.S },
  profileContainer: { flexDirection: 'row' },
  h1: { flexGrow: 2 },
  questionImage: { width: '100%', height: 200, marginVertical: theme.spacing.M, borderRadius:5 },
}));
