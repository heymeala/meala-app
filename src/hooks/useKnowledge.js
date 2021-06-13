import React, { useContext, useRef, useState } from 'react';
import { KnowledgeContext } from './KnowledgeContext';
import { knowledgeApi } from '../Screens/Settings/Knowledge/knowledgeApi';
import LocalizationContext from '../../LanguageContext';

export const KnowledgeProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const knowledgeData = useRef(null);
  const { locale } = React.useContext(LocalizationContext);

  function getData() {
    knowledgeApi(locale).then(data => {
      knowledgeData.current = data;
      setLoading(false);
    });
  }

  return (
    <KnowledgeContext.Provider value={{ knowledgeData, getData, loading }}>
      {children}
    </KnowledgeContext.Provider>
  );
};

export const useKnowledge = () => useContext(KnowledgeContext);
