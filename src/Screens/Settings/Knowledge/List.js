import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ListItem, makeStyles, Text } from 'react-native-elements';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import LocalizationContext from '../../../../LanguageContext';
import { useKnowledge } from '../../../hooks/useKnowledge';
import { useNavigation } from '@react-navigation/core';

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
        Wissenswertes
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
    </View>
  );
};

export default KnowledgeList;

const useStyles = makeStyles(theme => ({ root: { padding: theme.spacing.M } }));
