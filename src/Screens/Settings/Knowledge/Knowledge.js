import React from 'react';
import { makeStyles } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { KnowledgeProvider } from '../../../hooks/useKnowledge';
import KnowledgeList from './List';
import KnowledgeDetails from './KnowledgeDetails';

const Knowledge = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <KnowledgeProvider>
      <KnowledgeList />
      <KnowledgeDetails />
    </KnowledgeProvider>
  );
};

export default Knowledge;

const useStyles = makeStyles(theme => ({}));
