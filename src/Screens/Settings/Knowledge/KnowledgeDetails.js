import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useKnowledge } from '../../../hooks/useKnowledge';
import { useRoute } from '@react-navigation/core';
import LoadingSpinner from '../../../Common/LoadingSpinner';

const KnowledgeDetails = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const knowledgeData = useKnowledge();
  const route = useRoute();
  const { itemId } = route.params || { itemId: null };
  console.log(knowledgeData);
  if (typeof itemId !== 'undefined') {
    return (
      <View>
        <Text>Details </Text>
        {knowledgeData ? (
          knowledgeData.filter(data => data.id === itemId).map(item => <Text>{item.title.rendered}</Text>)
        ) : (
          <LoadingSpinner />
        )}
      </View>
    );
  } else {
    return null;
  }
};

export default KnowledgeDetails;

const useStyles = makeStyles(theme => ({}));
