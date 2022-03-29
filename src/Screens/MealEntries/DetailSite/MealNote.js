import React from 'react';
import { Card, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';

const MealNote = props => {
  const styles = useStyles();
  const { t } = React.useContext(LocalizationContext);

  return props.selectedFood.note ? (
    <Card title={t('Entries.note')} containerStyle={styles.conainer}>
      <Text style={styles.text}>{props.selectedFood.note}</Text>
    </Card>
  ) : null;
};

export default MealNote;

const useStyles = makeStyles(theme => ({
  container: {
    borderWidth: 0,
    borderRadius: 10,
    paddingBottom: 0,
    marginBottom: 15,
  },
  text: { paddingBottom: 10 },
}));
