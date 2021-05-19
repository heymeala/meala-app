import React, {useRef} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button, makeStyles} from 'react-native-elements';
import FatSecretQuiz from './FatSecretQuiz';
import LocalizationContext from '../../../LanguageContext';
import {shuffle} from '../../utils/shuffel';
import {fatSecretRecipesDE, fatSecretRecipesEN} from './fatSecretIds';

const Questions = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {quizType, setQuizType, totalQuestions} = props;
  const scrollRef = useRef();

  const fsRecipeIds = shuffle(locale === 'de' ? fatSecretRecipesDE : fatSecretRecipesEN);
  const slicedIds = useRef(fsRecipeIds.slice(0, totalQuestions));

  function scrollToTop() {
    const node = scrollRef.current;
    if (node) {
      node.scrollTo({x: 0, y: 0, animated: true});
    } else {
      console.log('scrool');
    }
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.root} ref={scrollRef}>
        <FatSecretQuiz
          scrollToTop={scrollToTop}
          fsRecipeIds={slicedIds.current}
          quizType={quizType}
          setQuizType={setQuizType}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Questions;

const useStyles = makeStyles(theme => ({}));
