import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useKnowledge } from '../../../hooks/useKnowledge';
import { useRoute } from '@react-navigation/core';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import HTML from 'react-native-render-html';

const KnowledgeDetails = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { knowledgeData } = useKnowledge();
  const route = useRoute();
  const { itemId } = route.params || { itemId: null };
  console.log(knowledgeData.current);
  const contentWidth = useWindowDimensions().width;

  if (typeof itemId !== 'undefined') {
    return (
      <View style={styles.root}>
        {knowledgeData.current ? (
          knowledgeData.current
            .filter(data => data.id === itemId)
            .map((item, i) => (
              <View key={i}>
                <Text h1>{item.title.rendered} </Text>
                <HTML source={{ html: item.content.rendered }} contentWidth={contentWidth} />
              </View>
            ))
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

const useStyles = makeStyles(theme => ({ root: { padding: theme.spacing.M } }));
