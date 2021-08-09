import { Platform } from 'react-native';
import RNFS from 'react-native-fs';

const imageName = databasePath => {
  if (databasePath) {
    if (Platform.OS === 'android') {
      return databasePath.split('/files').pop();
    } else {
      return databasePath.split('/Documents').pop();
    }
  }
};

export const getImagePath = databasePath => {
  const documentPath = RNFS.DocumentDirectoryPath;
  const imageFileName = imageName(databasePath);
  if (Platform.OS === 'android' && databasePath) {
    const searchOldPathNames = databasePath.slice(0, 4); // image picker lib saved to cached folder - searching for old files in database
    if (searchOldPathNames === 'file') {
      return databasePath;
    } else {
      return 'file://' + documentPath + imageFileName;
    }
  } else {
    return documentPath + imageFileName;
  }
};
