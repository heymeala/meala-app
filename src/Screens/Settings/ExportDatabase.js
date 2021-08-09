import React from 'react';
import { makeStyles } from 'react-native-elements';
import RNFS from 'react-native-fs';
import LocalizationContext from '../../../LanguageContext';
import OutLineButton from '../../Common/OutLineButton';
import { View } from "react-native";

const ExportDatabase = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  const downloadPath = RNFS.DownloadDirectoryPath + '/default.realm';
  const realmPath = RNFS.DocumentDirectoryPath + '/default.realm';

  console.log(realmPath);
  console.log(downloadPath);

  return (
    <View style={styles.container}>
      <OutLineButton title={'Save Database to Downloads'} onPress={() => RNFS.copyFile(realmPath, downloadPath).then(() => {console.log("saved")})} />
    </View>
  );
};

export default ExportDatabase;

const useStyles = makeStyles(theme => ({
  container:{marginTop:theme.spacing.M}
}));
