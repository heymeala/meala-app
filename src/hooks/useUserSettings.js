import React, {useContext, useEffect, useState} from 'react';
import {database} from '../Common/database_realm';
import {defaultUserSettings, UserSettingsContext} from './UserSettingsContext';

export const UserSettingsProvider = ({children, userSettings}) => {
  const [settings, setSettings] = useState(userSettings || defaultUserSettings);

  const saveSettings = data => {
    setSettings(data);
  };

  useEffect(() => {
    const profileSettings = async () => {
      const settings = await database.getSettings();
      const glucoseSource = await database.getGlucoseSource();
      if (settings && glucoseSource == 2) {
        setSettings({...settings, glucoseSource: 'Nightscout'});
      } else if (settings && glucoseSource == 1) {
        setSettings({...settings, glucoseSource: 'HealthKit'});
      } else {
        setSettings({...settings, glucoseSource: 'Manuel'});
      }
    };
    profileSettings();
  }, []);

  return (
    <UserSettingsContext.Provider
      value={{userSettings: settings, saveGlucoseSource: saveSettings}}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);
