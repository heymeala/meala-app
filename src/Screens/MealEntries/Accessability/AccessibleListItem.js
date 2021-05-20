import React from 'react';
import { Text } from 'react-native';
import { makeStyles } from 'react-native-elements';
import moment from 'moment';
import LocalizationContext from '../../../../LanguageContext';

const AccessibleListItem = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { progressTime } = props;

  return (
    <Text style={{ paddingTop: 8 }}>
      {t('Accessibility.Home.wait')}

      {locale === 'de'
        ? ' – Letzter Eintrag vor ' +
          moment.duration(progressTime).hours() +
          ' Stunden und ' +
          moment.duration(progressTime).minutes() +
          ' Minuten. '
        : moment.duration(progressTime).hours() +
          ' hours and ' +
          moment.duration(progressTime).minutes() +
          ' minutes ago '}
    </Text>
  );
};

export default AccessibleListItem;

const useStyles = makeStyles(theme => ({}));
