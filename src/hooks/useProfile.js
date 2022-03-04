import React, { useContext, useEffect, useState } from 'react';
import { ProfileContext } from './ProfileContext';
import {useRealm} from "./RealmProvider";

//todo: get range from nightscout
const defaultSettings = {
  unit: 1,
  targetLow: 70,
  targetHigh: 160,
};

export const ProfileProvider = ({ children, settings }) => {
  const [currentSettings, setCurrentSettings] = useState(settings || defaultSettings);
  const {getProfile } = useRealm()
  const saveProfile = unit => {
   // setCurrentSettings({ unit });
  };
/*
  useEffect(() => {
    getProfile() != null && getProfile().then(data => {
      if (data[0]) {
        setCurrentSettings({
          unit: data[0].unit || defaultSettings.unit,
          targetLow: defaultSettings.targetLow,
          targetHigh: defaultSettings.targetHigh,
        });
      }
    });
  }, []);*/

  return (
    <ProfileContext.Provider value={{ settings: currentSettings, saveProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
