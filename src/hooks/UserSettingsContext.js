// Settings Context - src/context/Settings
import React from 'react';
export const defaultUserSettings = {
  glucoseSource: null,
  nightscoutStatus: null,
  nightscoutToken: null,
  nightscoutTreatmentsUpload: null,
  nightscoutUrl: null,
  nightscoutVersion: null,
};

export const UserSettingsContext = React.createContext(defaultUserSettings);
