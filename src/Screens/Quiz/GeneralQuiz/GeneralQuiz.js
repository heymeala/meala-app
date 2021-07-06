import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Image, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { generalQuizApi } from '../generalQuizApi';
import AnswerButtonsGeneral from './AnswerButtonsGeneral';
import { shuffle } from '../../../utils/shuffel';
import openLink from '../../../Common/InAppBrowser';
import AnswerAnimation from '../AnswerAnimation';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import RightAnswerInfo from './RightAnswerInfo';
import { playFinishQuizSound, playRightAnswerSound, playWrongAnswerSound } from '../GameSounds';
import GeneralQuizFinish from './GeneralQuizFinish';

const GeneralQuiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const quizData = useRef(null);
  const [answers, setAnswers] = useState();
  const [tries, setTries] = useState(1);
  const [answer, setAnswer] = useState(false);

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const [validatedRight, setValidatedRight] = useState(false);
  const [validatedWrong, setValidatedWrong] = useState(false);
  const [showAnswerInformation, setShowAnswerInformation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [finish, setFinish] = useState(false);
  const animation = useRef(null);
  const timeOut = useRef(null);
  const timer = 1500;

  useEffect(() => {
    generalQuizApi(locale).then(data => {
      quizData.current = shuffle(data).slice(0, 5);
      console.log(quizData.current);
      randomAnswers(step);
      getAuthor(quizData.current[step].author);

      setLoading(false);
      //  nextQuestion();
    });
  }, []);

  useEffect(() => {
    if (validatedRight || validatedWrong) {
      if (animation.current !== null) {
        animation.current.play();
      }
    }
  }, [validatedRight, validatedWrong]);

  function validate(userAnswer, id) {
    setAnswer(userAnswer);

    if (userAnswer) {
      setValidatedRight(true);

      playRightAnswerSound();

      timeOut.current = setTimeout(() => {
        setShowAnswerInformation(true);
      }, timer);

      setAnsweredQuestions(prevAnswers => {
        return [
          ...prevAnswers,
          {
            id: quizData.current[step].id,
            quizData: quizData.current[step],
            tries,
          },
        ];
      });

      setTries(1);
    } else {
      setValidatedWrong(true);

      setAnswers(prevState => {
        console.log(id);
        return prevState.map(data => {
          if (data.id === id) {
            return {
              ...data,
              pressed: true,
            };
          } else {
            return { ...data };
          }
        });
      });
      console.log(answers);

      playWrongAnswerSound();

      setTries(prevState => prevState + 1);
      timeOut.current = setTimeout(() => {
        setValidatedWrong(false);
      }, timer);
    }
  }

  function counter() {
    setLoading(true);

    if (step < quizData.current.length - 1) {
      setStep(prevState => {
        randomAnswers(prevState + 1);
        getAuthor(quizData.current[prevState + 1].author);

        return prevState + 1;
      });

      setLoading(false);
      setValidatedRight(false);
      setValidatedWrong(false);
    } else {
      playFinishQuizSound();
      setFinish(true);
      setLoading(false);
    }
  }

  function randomAnswers(number) {
    const acf = quizData.current[number].acf;
    const answersArray = [
      { id: 1, answer: acf.right_answer, right: true, pressed: false },
      { id: 2, answer: acf.answer_2, right: false, pressed: false },
      { id: 3, answer: acf.answer_3, right: false, pressed: false },
    ];
    const randomAnswers = shuffle(answersArray);
    setAnswers(randomAnswers);
  }

  function nextQuestion() {
    setShowAnswerInformation(false);
    setCurrentAuthor('');
    counter();
  }

  async function getAuthor(id) {
    const response = await fetch('https://www.heymeala.com/wp-json/wp/v2/users/' + id);
    const author = await response.json();
    setCurrentAuthor(author);
  }

  if (finish) {
    return <GeneralQuizFinish answeredQuestions={answeredQuestions} />;
  }
  if (showAnswerInformation) {
    if (quizData.current) {
      return <RightAnswerInfo infoText={quizData.current[step].acf.info} nextQuestion={nextQuestion} />;
    } else {
      return <LoadingSpinner />;
    }
  }

  return (
    <>
      {quizData.current && !loading && step <= quizData.current.length ? (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            {quizData.current[step].acf.image.url && (
              <Image style={styles.questionImage} source={{ uri: quizData.current[step].acf.image.url }} />
            )}
            <Text h1 h1Style={styles.h1}>
              {quizData.current[step].acf.question}
            </Text>
            <AnswerButtonsGeneral
              answers={answers}
              setStep={setStep}
              step={step}
              validate={validate}
              validated={validatedRight}
            />
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
          </ScrollView>
          {validatedRight || validatedWrong ? (
            <AnswerAnimation answer={answer} animation={animation} />
          ) : null}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default GeneralQuiz;

const useStyles = makeStyles(theme => ({
  container: { padding: theme.spacing.M, minHeight: '100%' },
  profile: { width: 24, height: 24, marginHorizontal: theme.spacing.S },
  profileContainer: { flexDirection: 'row' },
  h1: { flexGrow: 2 },
  questionImage: { width: '100%', height: 200, marginVertical: theme.spacing.M, borderRadius: 5 },
}));
