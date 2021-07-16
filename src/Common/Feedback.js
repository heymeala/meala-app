import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Divider, Icon, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../LanguageContext';
import FeedbackModal from './FeedbackModal';
import analytics from '@react-native-firebase/analytics';

const Feedback = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState();
  const [feedbackDescription, setFeedbackDescription] = useState();

  function handleFeedback(answer) {
    setOpen(true);
    setFeedbackTitle(answer ? t('Settings.dialogFeedbackTitleGood') : t('Settings.dialogFeedbackTitleBad'));
    setFeedbackDescription(
      answer ? t('Settings.dialogFeedbackDescriptionGood') : t('Settings.dialogFeedbackDescriptionBad'),
    );

    analytics().logEvent('feedback', {
      answer: answer ? 'good' : 'bad',
    });
  }

  return (
    <>
      <View style={styles.wrapper}>
        <Text h2 style={styles.text}>
          {t('Settings.feedbackQuestion')}
        </Text>

        <View style={styles.container}>
          <TouchableOpacity onPress={() => handleFeedback(true)}>
            <Icon name={'ios-thumbs-up-outline'} type={'ionicon'} size={40} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFeedback(false)}>
            <Icon name={'ios-thumbs-down-outline'} type={'ionicon'} size={40} />
          </TouchableOpacity>
        </View>

        <Divider />
      </View>

      <FeedbackModal
        open={open}
        setOpen={setOpen}
        feedbackTitle={feedbackTitle}
        feedbackDescription={feedbackDescription}
      />
    </>
  );
};

export default Feedback;

const useStyles = makeStyles(theme => ({
  container: { flexDirection: 'row', justifyContent: 'space-around', margin: theme.spacing.M },
  wrapper: { alignSelf: 'center' },
  text: { fontFamily: 'SecularOne-Regular' },
}));
