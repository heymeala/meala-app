import React, {useContext, useState} from 'react';
import {EnterMealContext} from './EnterMealContext';

export const EnterMealTypeProvider = ({children, typeMode}) => {
  const [mode, setMode] = useState(
    typeMode || {mode: 'default', meal_id: null},
  );

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
