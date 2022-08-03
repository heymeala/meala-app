import React from 'react';
import RNFS from 'react-native-fs';
import { zip } from 'react-native-zip-archive';
import { EVAL } from '@env';
import RNFetchBlob from 'rn-fetch-blob';
import {IMAGEFOLDER} from "../Common/Constants/folder";

export const donate = (setUpload, donate, setProgress) => {
  const date = new Date().getTime().toString();
  console.log(date);

  const downloadPath = RNFS.DownloadDirectoryPath + '/default.realm';
  const realmPath = RNFS.DocumentDirectoryPath + '/default.realm';
  const imageFolder = RNFS.DocumentDirectoryPath + IMAGEFOLDER + '/';
  const targetPath = RNFS.DocumentDirectoryPath + '/' + date + '_images.zip';

  const uploadEvalImages = async path => {
    //Check if any file is selected or not

    if (path != null) {
      //If file selected then create FormData
      setUpload('upload');
      RNFetchBlob.fetch(
        'POST',
        EVAL,
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image',
            filename: 'images.zip',
            data: RNFetchBlob.wrap(path),
          },
          {
            name: 'realm',
            filename: 'default.realm',
            data: RNFetchBlob.wrap(realmPath),
          },
          {
            name: 'donate',
            data: donate,
          },
        ],
      )
        .uploadProgress((written, total) => {
          console.log('uploaded', written / total);
          setProgress(written / total);
        })
        .then(resp => {
          var tempMSG = resp.json();
          console.log(tempMSG);
          return tempMSG;
        })
        .then(resp => {
          console.log('data', resp.Status.realm);
          if (resp.Status.realm === 'OK') {
            setUpload('success');
          } else {
            setUpload('error');
          }

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
        })
        .catch(err => {
          setUpload('error');
          console.log(err);
        });
    }
  };

  function zipImages() {
    zip(imageFolder, targetPath)
      .then(path => {
        console.log(`zip completed at ${path}`);
        uploadEvalImages(path);
      })
      .catch(error => {
        console.error(error);
      });
  }

  zipImages();
};
