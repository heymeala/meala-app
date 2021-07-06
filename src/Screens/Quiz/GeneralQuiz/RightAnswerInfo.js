import React from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { Button, makeStyles, Text } from 'react-native-elements';
import HTML from 'react-native-render-html';
import LocalizationContext from '../../../../LanguageContext';
import FadeInView from '../../../Common/FadeInView';

const RightAnswerInfo = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const contentWidth = useWindowDimensions().width;

  const { infoText, nextQuestion } = props;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.htmlContainer}>
        <FadeInView>
          {infoText ? (
            <HTML baseFontStyle={styles.html} source={{ html: infoText }} contentWidth={contentWidth} />
          ) : (
            <Text>Gut gemacht</Text>
          )}
        </FadeInView>
      </View>
      <Button style={styles.button} title={t('Quiz.community.next')} onPress={() => nextQuestion()} />
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
