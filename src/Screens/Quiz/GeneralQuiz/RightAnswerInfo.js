import React, { useEffect, useRef } from 'react';
import { AccessibilityInfo, findNodeHandle, ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, makeStyles, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import LocalizationContext from '../../../../LanguageContext';
import FadeInView from '../../../Common/FadeInView';

const RightAnswerInfo = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const contentWidth = useWindowDimensions().width;
  const refAnswer = useRef(null);

  const { infoText, nextQuestion } = props;

  useEffect(() => {
    console.log('false ref refAnswer', refAnswer);

    if (refAnswer && refAnswer.current) {
      const reactTag = findNodeHandle(refAnswer.current);
      console.log('refAnswer', reactTag);
      if (reactTag) {
        AccessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  }, [infoText]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.htmlContainer}>
        <View ref={refAnswer} accessible={true} focusable={true} accessibilityRole={'header'}>
          <Text h2>{t('Quiz.infoScreenTitle')}</Text>
        </View>
        <FadeInView>
          {infoText ? (
            <HTML baseFontStyle={styles.html} source={{ html: infoText }} contentWidth={contentWidth} />
          ) : (
            <Text>{t('Quiz.noInfo')}</Text>
          )}
        </FadeInView>
      </View>
      <Button
        style={styles.button}
        title={t('Quiz.community.next')}
        onPress={() => {
          refAnswer.current = null;
          nextQuestion();
        }}
      />
    </ScrollView>
  );
};

export default RightAnswerInfo;

const useStyles = makeStyles(theme => ({
  container: { minHeight: '100%', padding: theme.spacing.M },
  html: { fontSize: 18 },
  htmlContainer: { flexGrow: 1 },
  button: { paddingBottom: theme.spacing.L },
}));
