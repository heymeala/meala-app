import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip, Divider, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';

const Tags = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { selectedFood } = props;
  return selectedFood.tags && selectedFood.tags.length > 0 ? (
    <View style={styles.wrapper}>
      <Divider />
      <Text style={styles.text}>{t('Entries.tags')}</Text>
      <ScrollView horizontal style={styles.container}>
        {selectedFood.tags.map((tag, i) => (
          <Chip disabled key={i} title={tag.tagEn} containerStyle={styles.tag} />
        ))}
      </ScrollView>
      <Divider />
    </View>
  ) : null;
};
export default Tags;

const useStyles = makeStyles(theme => ({
  wrapper: { marginTop: theme.spacing.M },
  container: { flexDirection: 'row', margin: theme.spacing.XS },
  text: { marginLeft: theme.spacing.S, marginTop: theme.spacing.S, fontSize: 12, color:theme.colors.grey2 },
  tag: { padding: theme.spacing.S },
}));
