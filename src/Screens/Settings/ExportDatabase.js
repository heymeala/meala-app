import React from 'react';
import { makeStyles } from 'react-native-elements';
import RNFS from 'react-native-fs';
import LocalizationContext from '../../../LanguageContext';
import OutLineButton from '../../Common/OutLineButton';
import { Platform, Share, View } from 'react-native';
import { zip } from 'react-native-zip-archive';
import { IMAGEFOLDER } from '../../Common/Constants/folder';

const ExportDatabase = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  const date = new Date().getTime().toString();
  console.log(date);

  const downloadPath = RNFS.DownloadDirectoryPath + '/default.realm';
  const realmPath = RNFS.DocumentDirectoryPath + '/default.realm';
  const imageFolder = RNFS.DocumentDirectoryPath + IMAGEFOLDER + '/';
  const targetPath =
    Platform.OS === 'android'
      ? RNFS.DownloadDirectoryPath + '/' + date + '_images.zip'
      : RNFS.DocumentDirectoryPath + '/' + date + '_images.zip';


  function zipImages() {
    zip(imageFolder, targetPath)
      .then(path => {
        console.log(`zip completed at ${path}`);
        if (Platform.OS === 'android') {
          console.log('android');
        } else {
          onShare(path).then(() => {
            // delete zip file after sharing
            return (
              RNFS.unlink(targetPath)
                .then(() => {
                  console.log('FILE DELETED');
                })
                // `unlink` will throw an error, if the item to unlink does not exist
                .catch(err => {
                  console.log(err.message);
                })
            );
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  const onShare = async path => {
    try {
      const result = await Share.share({
        url: path,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return Platform.OS === 'android' ? (
    <View>
      <View style={styles.container}>
        <OutLineButton
          title={'Save Database to Downloads'}
          onPress={() =>
            RNFS.copyFile(realmPath, downloadPath).then(() => {
              console.log('saved');
            })
          }
        />
      </View>
      <View style={styles.container}>
        <OutLineButton title={'Share all images'} onPress={() => zipImages()} />
      </View>
    </View>
  ) : (
    <View>
      <View style={styles.container}>
        <OutLineButton title={'Share Database'} onPress={() => onShare(realmPath)} />
      </View>
      <View style={styles.container}>
        <OutLineButton title={'Share all images'} onPress={() => zipImages()} />
      </View>
    </View>
  );
};

export default ExportDatabase;

const useStyles = makeStyles(theme => ({
  container: { marginVertical: theme.spacing.M, marginHorizontal: theme.spacing.M },
}));
