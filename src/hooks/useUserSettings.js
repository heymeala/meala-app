import React, {useContext, useEffect, useState} from 'react';
import {database} from '../Common/database_realm';
import {defaultUserSettings, UserSettingsContext} from './UserSettingsContext';

export const UserSettingsProvider = ({children, userSettings}) => {
  const [settings, setSettings] = useState(userSettings || defaultUserSettings);

  const saveSettings = data => {
    setSettings(data);
  };

  useEffect(() => {
    console.log("change Data Source")
    const profileSettings = async () => {
      const settingsData = await database.getSettings();
      const glucoseSource = await database.getGlucoseSource();
      if (settingsData && glucoseSource == 2) {
        setSettings({...settingsData, glucoseSource: 'Nightscout'});
      } else if (settingsData && glucoseSource == 1) {
        setSettings({...settingsData, glucoseSource: 'HealthKit'});
      } else {
        setSettings({...settingsData, glucoseSource: 'Manuel'});
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
