import React, {useContext, useEffect, useState} from 'react';
import {AccessibilityInfo} from 'react-native';

export const ScreenReaderContext = React.createContext(false);

export const ScreenReaderProvider = ({children}) => {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      handleScreenReaderToggled,
    );

    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      setScreenReaderEnabled(screenReaderEnabled);
    });

    return () => {
      AccessibilityInfo.removeEventListener(
        'screenReaderChanged',
        handleScreenReaderToggled,
      );
    };
  }, []);

  const handleScreenReaderToggled = (screenReaderEnabled) => {
    setScreenReaderEnabled(screenReaderEnabled);
  };

  return (
    <ScreenReaderContext.Provider value={screenReaderEnabled}>
      {children}
    </ScreenReaderContext.Provider>
  );
};

export const useScreenReader = () => useContext(ScreenReaderContext);
