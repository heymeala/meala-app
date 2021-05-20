import React, { useContext, useEffect, useState } from 'react';
import { database } from '../Common/database_realm';
import { defaultUserSettings, UserSettingsContext } from './UserSettingsContext';
import { DEFAULT, HEALTHKIT, NIGHTSCOUT } from '../Screens/Settings/glucoseSourceConstants';

export const UserSettingsProvider = ({ children, userSettings }) => {
  const [settings, setSettings] = useState(userSettings || defaultUserSettings);

  const saveUserSettings = data => {
    setSettings(data);
    database.saveGlucoseSource(data.glucoseSource);
    database.saveSettings(
      data.nightscoutUrl,
      data.nightscoutStatus,
      data.nightscoutVersion,
      data.nightscoutToken,
      data.nightscoutTreatmentsUpload,
    );
  };

  useEffect(() => {
    const profileSettings = async () => {
      const settingsData = await database.getSettings();
      const glucoseSource = await database.getGlucoseSource();
      if ((settingsData && glucoseSource === '2') || glucoseSource === NIGHTSCOUT) {
        setSettings({ ...settingsData, glucoseSource: NIGHTSCOUT });
      } else if ((settingsData && glucoseSource === '1') || glucoseSource === HEALTHKIT) {
        setSettings({ ...settingsData, glucoseSource: HEALTHKIT });
      } else {
        setSettings({ ...settingsData, glucoseSource: DEFAULT });
      }
    };
    profileSettings();
  }, []);

  return (
    <UserSettingsContext.Provider value={{ userSettings: settings, saveUserSettings: saveUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export const useUserSettings = () => useContext(UserSettingsContext);
