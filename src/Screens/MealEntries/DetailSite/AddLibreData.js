import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles } from 'react-native-elements';
import { LIBRETWOAPP } from '../../Settings/glucoseSourceConstants';
import LocalizationContext from '../../../../LanguageContext';
import { useUserSettings } from '../../../hooks/useUserSettings';

const AddLibreData = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { userSettings } = useUserSettings();


  /*
      "_id": "610180c66d47c40004f900ca",
    "device": "AndroidAPS-DexcomG6",
    "date": 1627488429000,
    "dateString": "2021-07-28T16:07:09Z",
    "sgv": 235,
    "direction": "Flat",
    "type": "sgv",
    "NSCLIENT_ID": "1627488452266",
    "created_at": "2021-07-28T16:07:34.041Z"

   */

  return (
    userSettings.glucoseSource === LIBRETWOAPP && (
      <View style={{ padding: 8 }}>
        <Button title={'Füge deine Libre Daten hinzu'} />
      </View>
    )
  );
};

export default AddLibreData;

const useStyles = makeStyles(theme => ({}));
