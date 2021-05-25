import React, { useContext, useRef, useState } from 'react';
import { KnowledgeContext } from './KnowledgeContext';
import { knowledgeApi } from '../Screens/Settings/Knowledge/knowledgeApi';

export const KnowledgeProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const knowledgeData = useRef(null);

  function getData() {
    knowledgeApi().then(data => {
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
