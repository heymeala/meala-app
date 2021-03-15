// Settings Context - src/context/Settings
import React from 'react';

export const ProfileContext = React.createContext({
  unit: 1,
  targetLow: 70,
  targetHigh: 160,
});
