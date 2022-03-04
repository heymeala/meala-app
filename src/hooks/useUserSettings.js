import React, { useContext, useEffect, useState } from 'react';
import { defaultUserSettings, UserSettingsContext } from './UserSettingsContext';
import { DEFAULT, HEALTHKIT, LIBRETWOAPP, NIGHTSCOUT } from '../Screens/Settings/glucoseSourceConstants';
import {useRealm} from "./RealmProvider";

export const UserSettingsProvider = ({ children, userSettings }) => {
  const [settings, setSettings] = useState(userSettings || defaultUserSettings);
  const {getGlucoseSource,getSettings,saveGlucoseSource,saveSettings } = useRealm()

  const saveUserSettings = data => {
    setSettings(data);
    saveGlucoseSource(data.glucoseSource);
    saveSettings(
      data.nightscoutUrl,
      data.nightscoutStatus,
      data.nightscoutVersion,
      data.nightscoutToken,
      data.nightscoutTreatmentsUpload,
    );
  };

  useEffect(() => {
    const profileSettings = async () => {
      const settingsData = (await getSettings()).toJSON();
      const glucoseSource = await getGlucoseSource();
      if (settingsData && glucoseSource === LIBRETWOAPP) {
        setSettings({ ...settingsData, glucoseSource: LIBRETWOAPP });
      } else if ((settingsData && glucoseSource === '2') || (settingsData && glucoseSource === NIGHTSCOUT)) {
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
