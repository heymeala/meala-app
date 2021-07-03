import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Image, makeStyles, Text } from "react-native-elements";
import LocalizationContext from '../../../../LanguageContext';
import { generalQuizApi } from '../generalQuizApi';
import AnswerButtonsGeneral from './AnswerButtonsGeneral';
import { shuffle } from '../../../utils/shuffel';
import openLink from '../../../Common/InAppBrowser';
import AnswerAnimation from '../AnswerAnimation';
import LoadingSpinner from '../../../Common/LoadingSpinner';

const GeneralQuiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const quizData = useRef(null);
  const [answers, setAnswers] = useState();
  const [userAnsweredQuestion, setUserAnswerQuestion] = useState(false);
  const [tries, setTries] = useState(1);
  const [answer, setAnswer] = useState(false);

  const [validated, setValidated] = useState(true);

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [finish, setFinish] = useState(false);
  const animation = useRef(null);
  const timeOut = useRef(null);
  const timer = 1500;

  console.log(quizData);

  useEffect(() => {
    generalQuizApi(locale).then(data => {
      quizData.current = data;
      nextQuestion();
    });
  }, []);

  useEffect(() => {
    if (validated) {
      if (animation.current !== null) {
        animation.current.play();
      }
    }
  }, [validated]);

  function validate(userAnswer, id) {
    setAnswer(userAnswer);
    setValidated(true);
    console.log('animation', animation.current);

    if (userAnswer) {
      nextQuestion();
      setTries(1);
    } else {
      setTries(prevState => prevState + 1);
      timeOut.current = setTimeout(() => {
        setValidated(false);
      }, timer);
    }
  }

  function counter() {
    setLoading(true);

    if (step < quizData.current.length - 1) {
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
      setValidated(false);
    } else {
      setFinish(true);
      setLoading(false);
    }
  }

  function nextQuestion() {
    setCurrentAuthor('');

    timeOut.current = setTimeout(() => {
      counter();
    }, timer);
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

  if (finish) {
    return (
      <View>
        <Text>Fertig</Text>
      </View>
    );
  }

  return (
    <>
      {quizData.current && !loading && step <= quizData.current.length ? (
        <>
          <View style={styles.container}>
            {quizData.current[step - 1].acf.image.url && (
              <Image
                style={styles.questionImage}
                source={{ uri: quizData.current[step - 1].acf.image.url }}
              />
            )}
            <Text h1 h1Style={styles.h1}>
              {quizData.current[step - 1].acf.question}
            </Text>
            <AnswerButtonsGeneral answers={answers} setStep={setStep} step={step} validate={validate} />
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
          </View>
          {validated && <AnswerAnimation answer={answer} animation={animation} />}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default GeneralQuiz;

const useStyles = makeStyles(theme => ({
  container: { padding: theme.spacing.M, height: '100%' },
  profile: { width: 24, height: 24, marginHorizontal: theme.spacing.S },
  profileContainer: { flexDirection: 'row' },
  h1: { flexGrow: 2 },
  questionImage: { width: '100%', height: 200, marginVertical: theme.spacing.M, borderRadius: 5 },
}));
