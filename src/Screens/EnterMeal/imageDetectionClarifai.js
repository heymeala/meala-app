import React from 'react';
import {Platform} from 'react-native';
import {CLARIFAI, GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS} from '@env';
const Clarifai = require('clarifai');

export function imageDetectionClarifai(
  clarifaiImagebase,
  setPredictions,
  locale,
  setTags,
) {
  const apiKey =
    Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;
  const clarifai = new Clarifai.App({
    apiKey: CLARIFAI,
  });

  clarifai.models
    .predict('bd367be194cf45149e75f01d59f77ba7', clarifaiImagebase)
    .then(data => {
      setPredictions(prevState => []);
      data.outputs[0].data.concepts.slice(0, 3).map(foodTags => {
        let url = 'https://translation.googleapis.com/language/translate/v2';
        url += '?q=' + foodTags.name;
        url += '&target=de';
        url += '&source=en';
        url += '&key=' + apiKey;

        if (locale === 'de') {
          return fetch(url).then(googleTranslateRes =>
            googleTranslateRes.json().then(response => {
              console.log(response.data.translations[0].translatedText);
              setPredictions(prevArray => [
                ...prevArray,
                {
                  id: foodTags.id,
                  name: response.data.translations[0].translatedText,
                },
              ]);

              setTags(prevArray => [
                ...prevArray,
                {
                  id: foodTags.id,
                  name: response.data.translations[0].translatedText,
                  active: true,
                },
              ]);
            }),
          );
        } else {
          setPredictions(prevArray => [
            ...prevArray,
            {
              id: foodTags.id,
              name: foodTags.name,
            },
          ]);
          setTags(prevArray => [
            ...prevArray,
            {
              id: foodTags.id,
              name: foodTags.name,
              active: true,
            },
          ]);
        }
      });
    })
    .catch(e => console.log(e));
}
