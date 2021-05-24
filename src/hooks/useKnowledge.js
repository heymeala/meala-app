import React, { useContext, useEffect, useRef, useState } from 'react';
import { KnowledgeContext } from './KnowledgeContext';
import { knowledgeApi } from '../Screens/Settings/Knowledge/knowledgeApi';

export const KnowledgeProvider = ({ children }) => {
  const [knowledgeData, setKnowledgeData] = useState(null);
  useEffect(() => {
    knowledgeApi().then(data => setKnowledgeData(data));
  }, []);

  return <KnowledgeContext.Provider value={knowledgeData}>{children}</KnowledgeContext.Provider>;
};

export const useKnowledge = () => useContext(KnowledgeContext);
