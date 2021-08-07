import React, { useEffect } from 'react';
import { InteractionManager } from 'react-native';

function useAutoFocus(autoFocus, ref) {
  useEffect(() => {
    if (autoFocus && ref.current) {
      if (ref.current) {
        InteractionManager.runAfterInteractions(() => {
          ref.current?.focus();
        });
      }
    }
  }, [autoFocus, ref]);
}

export default useAutoFocus;
