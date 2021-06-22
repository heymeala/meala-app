import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { generalQuizApi } from '../generalQuizApi';
import LoadingSpinner from '../../../Common/LoadingSpinner';

const GeneralQuiz = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const quizData = useRef(null);
  const [loading, setLoading] = useState(true);
  console.log(quizData);

  useEffect(() => {
    generalQuizApi(locale).then(data => {
      quizData.current = data;
      setLoading(false);
    });
  }, []);
  return (
    <View>
      <Text>Allgemein Wissen</Text>
      {quizData.current && !loading ? (
        quizData.current.map((item, i) => {
          return (
            <View key={i}>
              <Text>{item.acf.question}</Text>
            </View>
          );
        })
      ) : (
        <LoadingSpinner />
      )}
    </View>
  );
};

export default GeneralQuiz;

const useStyles = makeStyles(theme => ({}));
