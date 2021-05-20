export function Cameraoptions(t) {
  return {
    quality: 0.8,
    maxWidth: 600,
    maxHeight: 600,
    takePhotoButtonTitle: t('AddMeal.Camera'),
    chooseFromLibraryButtonTitle: t('AddMeal.Roll'),
    cancelButtonTitle: t('General.Cancel'),
    customButtons: [{ name: 'barCode', title: 'BarCode Scanner' }],
    title: t('AddMeal.PicPopUp'),
    storageOptions: {
      skipBackup: true,
      path: 'images',
      cameraRoll: true,
      waitUntilSaved: true,
    },
  };
}
