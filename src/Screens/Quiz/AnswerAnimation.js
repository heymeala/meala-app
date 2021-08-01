import React from 'react';
import { View } from 'react-native';
import { makeStyles } from 'react-native-elements';
import LottieView from 'lottie-react-native';
import right from '../../assets/animations/quiz/confetti.json';
import wrong from '../../assets/animations/quiz/wrong-answer.json';
import LocalizationContext from '../../../LanguageContext';

const AnswerAnimation = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { answer, animation } = props;
  return (
    <>
      <View
        style={{
          backgroundColor: answer ? 'rgba(89,255,0,0.3)' : 'rgba(255,0,0,0.3)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          width: '100%',
        }}>
        <LottieView
          ref={animation}
          style={{ width: '100%', position: 'absolute', top: 0 }}
          source={answer ? right : wrong}
          loop={false}
        />
      </View>
    </>
  );
};

export default AnswerAnimation;

const useStyles = makeStyles(theme => ({}));
