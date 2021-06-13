import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, ListItem, makeStyles, Text } from 'react-native-elements';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import LocalizationContext from '../../../../LanguageContext';
import { useKnowledge } from '../../../hooks/useKnowledge';
import { useNavigation } from '@react-navigation/core';
import messaging from '@react-native-firebase/messaging';

const KnowledgeList = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { knowledgeData, getData, loading } = useKnowledge();
  const navigation = useNavigation();
  console.log(knowledgeData.current);
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Text h1 style={styles.root}>
        {t('Knowledge.name')}
      </Text>

      {knowledgeData.current && !loading ? (
        knowledgeData.current.map((item, i) => (
          <ListItem key={i} onPress={() => navigation.navigate('KnowledgeDetails', { itemId: item.id })}>
            <ListItem.Title>{item.title.rendered}</ListItem.Title>
          </ListItem>
        ))
      ) : (
        <LoadingSpinner />
      )}
     {/* <View style={styles.notification}>
        <Button
          style={styles.button}
          title={'Subscribe to new articles'}
          onPress={() => {
            messaging()
              .subscribeToTopic('knowledge')
              .then(() => console.log('Subscribed to topic!'));
          }}
        />
        <Button
          type={'clear'}
          style={styles.button}
          title={'Unsubscribe from articles'}
          onPress={() => {
            messaging()
              .unsubscribeFromTopic('knowledge')
              .then(() => console.log('uns to topic!'));
          }}
        />
      </View>*/}
    </View>
  );
};

export default KnowledgeList;

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing.M },
  notification: { padding: theme.spacing.M },
  button: { padding: theme.spacing.S }
}));
