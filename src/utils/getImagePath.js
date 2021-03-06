import { Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { IMAGEFOLDER } from '../Common/Constants/folder';

const imageName = databasePath => {
  if (databasePath) {
    if (Platform.OS === 'android') {
      return databasePath.split(IMAGEFOLDER).pop();
    } else {
      return databasePath.split(IMAGEFOLDER).pop();
    }
  }
};

export const getImagePath = databasePath => {
  const documentPath = RNFS.DocumentDirectoryPath + IMAGEFOLDER;
  const imageFileName = imageName(databasePath);

  if (Platform.OS === 'android' && databasePath) {
    const searchOldPathNames = databasePath.slice(0, 4); // image picker lib saved to cached folder - searching for old files in database
    if (searchOldPathNames === 'file' || searchOldPathNames === 'cont') {
      return databasePath; // return cached path
    } else {
      return 'file://' + documentPath + imageFileName;
    }
  } else {
    return documentPath + imageFileName;
  }
};
