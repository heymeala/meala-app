import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {useProfile} from '../../hooks/useProfile';
import {database} from '../../Common/database_realm';
import LocalizationContext from '../../../LanguageContext';

const ProfilSettings = () => {
  const {settings, saveProfile} = useProfile();
  const [checked, setChecked] = useState(settings.unit === 1);

  const {t, locale} = React.useContext(LocalizationContext);

  function switchToMmol(unit) {
    setChecked((prevState) => false);
    database.saveProfile(unit).then(() => saveProfile(unit));
  }

  function switchToMgdL(unit) {
    setChecked((prevState) => true);
    database.saveProfile(unit).then(() => saveProfile(unit));
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{padding: 10}}>{t('Settings.profile.title')}</Text>

      <CheckBox
        center
        iconRight
        title="mg/dL"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={checked}
        onPress={() => switchToMgdL(1)}
      />
      <CheckBox
        center
        iconRight
        title="mmol/L"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={!checked}
        onPress={() => switchToMmol(18.02)}
      />

      <Text style={{padding: 10}}>
        {t('Settings.profile.example')} {Math.round(100 / settings.unit)}{' '}
        {settings.unit === 1 ? 'mg/dL' : 'mmol/L'}
      </Text>
    </View>
  );
};
export default ProfilSettings;
