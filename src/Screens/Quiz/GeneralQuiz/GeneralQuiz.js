import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, findNodeHandle, ScrollView, TouchableOpacity, View } from 'react-native';
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
import { useRoute } from '@react-navigation/core';
import { database } from '../../../Common/realm/database';
import { calculateScore } from '../calculateScore';
import SettingsFooter from '../../Settings/Footer';

const GeneralQuiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const route = useRoute();
  const { categoryId } = route.params;

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
  const scrollRef = useRef();
  const refHeader = useRef(null);

  const [totalScore, setTotalScore] = useState(null);

  const small = '48';
  useEffect(() => {
    const generateQuiz = async () => {
      const localQuizData = await database.getCommunityQuizAnswers();
      const tries = localQuizData.map(data => data.tries);
      const score = calculateScore(tries);
      setTotalScore(score);
      const localQuizIds = localQuizData.map(data => data.questionId.toString());
      const remoteQuizData = await generalQuizApi(locale, categoryId);

      const filteredRemoteQuizData = remoteQuizData
        .map(data => {
          if (localQuizIds.includes(data.id.toString())) {
            return { ...data, exists: true };
          } else {
            return { ...data, exists: false };
          }
        })
        .filter(data => !data.exists);
      quizData.current =
        categoryId === 'random' ? shuffle(remoteQuizData).slice(0, 5) : filteredRemoteQuizData;

      if (quizData.current.length > 0) {
        randomAnswers(step);
        getAuthor(quizData.current[step].author);
      }
      setLoading(false);
    };
    generateQuiz();
  }, []);

  useEffect(() => {
    if (validatedRight || validatedWrong) {
      if (animation.current !== null) {
        animation.current.play();
      }
    }
  }, [validatedRight, validatedWrong]);

  useEffect(() => {
    if (!showAnswerInformation) {
      console.log('false ref Header', refHeader);
      if (refHeader && refHeader.current) {
        const reactTag = findNodeHandle(refHeader.current);
        console.log('refHeader', reactTag);
        if (reactTag) {
          AccessibilityInfo.setAccessibilityFocus(reactTag);
        }
      }
    }
  }, [showAnswerInformation]);

  function validate(userAnswer, id) {
    setAnswer(userAnswer);
    refHeader.current = null;
    if (userAnswer) {
      playRightAnswerSound();
      if (categoryId !== 'random') {
        database
          .addCommunityQuizAnswer(
            quizData.current[step].id,
            tries,
            quizData.current[step].quiz_category[0].toString(),
          )
          .then(x => console.log(x));
      }
      setValidatedRight(true);
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
        //  console.log(id);
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
      //  console.log(answers);

      playWrongAnswerSound();

      setTries(prevState => prevState + 1);
      timeOut.current = setTimeout(() => {
        setValidatedWrong(false);
      }, timer);
    }
  }

  function scrollToTop() {
    const node = scrollRef.current;
    if (node) {
      node.scrollTo({ x: 0, y: 0, animated: true });
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
    scrollToTop();
    counter();
  }

  async function getAuthor(id) {
    const response = await fetch('https://www.heymeala.com/wp-json/wp/v2/users/' + id);
    const author = await response.json();
    console.log(author);

    setCurrentAuthor(author);
  }

  if (finish) {
    return <GeneralQuizFinish answeredQuestions={answeredQuestions} categoryId={categoryId} />;
  }
  if (showAnswerInformation) {
    if (quizData.current) {
      return <RightAnswerInfo infoText={quizData.current[step].acf.info} nextQuestion={nextQuestion} />;
    } else {
      return <LoadingSpinner />;
    }
  }

  if (quizData.current && !loading && quizData.current.length === 0) {
    return (
      <View style={styles.container}>
        <Text h3>{t('Quiz.community.answered')}</Text>
        <SettingsFooter />
      </View>
    );
  }
  return (
    <>
      {quizData.current && !loading && step <= quizData.current.length && quizData.current.length > 0 ? (
        <>
          <ScrollView contentContainerStyle={styles.container}>
            {quizData.current[step].acf.image.url && (
              <Image style={styles.questionImage} source={{ uri: quizData.current[step].acf.image.url }} />
            )}
            <View ref={refHeader} accessible={true} focusable={true} accessibilityRole={'header'}>
              <Text h1 h1Style={styles.h1}>
                {quizData.current[step].acf.question}
              </Text>
            </View>
            <AnswerButtonsGeneral
              answers={answers}
              setStep={setStep}
              step={step}
              validate={validate}
              validated={validatedRight}
            />
            <TouchableOpacity onPress={() => openLink(currentAuthor.url)}>
              <View style={styles.profileContainer}>
                {currentAuthor.avatar_urls && currentAuthor.avatar_urls[small] ? (
                  <Image
                    style={styles.profile}
                    source={{
                      uri:
                        currentAuthor.mpp_avatar.error_data &&
                        currentAuthor.mpp_avatar.error_data.mpp_no_profile_picture.status === 404
                          ? currentAuthor.avatar_urls[small]
                          : currentAuthor.mpp_avatar['48'],
                    }}
                  />
                ) : null}
                <Text>
                  {t('Quiz.community.by')} {currentAuthor.name}
                </Text>
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
  profile: { width: 30, height: 30, marginHorizontal: theme.spacing.S, borderRadius: 15 },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  h1: { flexGrow: 2 },
  questionImage: { width: '100%', height: 200, marginVertical: theme.spacing.M, borderRadius: 5 },
}));
