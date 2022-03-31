import RNFS from 'react-native-fs';
import { IMAGEFOLDER } from '../Common/Constants/folder';

export async function deleteImageFile(id) {
  const imagePath = RNFS.DocumentDirectoryPath + IMAGEFOLDER + '/' + id + '_food.png';
  console.log(imagePath);
  const imagePathExists = await RNFS.exists(imagePath);
  console.log(imagePathExists);
  if (imagePathExists) {
    RNFS.unlink(imagePath)
      .then(() => {
        console.log('FILE DELETED');
      })
      // `unlink` will throw an error, if the item to unlink does not exist
      .catch(err => {
        console.log(err.message);
      });
  }
}
