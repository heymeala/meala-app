import React from 'react';

export const defaultEnterMealContext = {
  mode: 'default',
  meal_id: null,
};

export const EnterMealContext = React.createContext(defaultEnterMealContext);
