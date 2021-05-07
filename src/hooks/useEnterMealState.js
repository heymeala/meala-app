import React, {useContext, useState} from 'react';
import {defaultEnterMealContext, EnterMealContext} from './EnterMealContext';

export const DEFAULT_MODE = 'default';
export const EDIT_MODE = 'edit';
export const COPY_MODE = 'copy';

export const EnterMealTypeProvider = ({children, typeMode}) => {
  const [mode, setMode] = useState(typeMode || defaultEnterMealContext);

  const changeEditMode = changeType => {
    setMode(changeType);
  };
  return (
    <EnterMealContext.Provider value={{type: mode, changeType: changeEditMode}}>
      {children}
    </EnterMealContext.Provider>
  );
};

export const useEnterMealType = () => useContext(EnterMealContext);
