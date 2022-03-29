import React from 'react';
import { CLARIFAI } from '@env';
import { translate } from '../../Common/translate';
import { checkAPI } from '../../utils/checkAPI';
const Clarifai = require('clarifai');

export async function imageDetectionClarifai(clarifaiImagebase, setPredictions, locale, setTags) {
  console.log('imageDetectionClarifai');

  checkAPI('CLARIFAI', CLARIFAI);

  const clarifai = new Clarifai.App({
    apiKey: CLARIFAI,
  });

  const clarifaiPredictions = await clarifai.models.predict(
    'bd367be194cf45149e75f01d59f77ba7',
    clarifaiImagebase,
  );
  setPredictions(prevState => []);
  await Promise.all(
    clarifaiPredictions.outputs[0].data.concepts.slice(0, 3).map(async foodTags => {
      if (locale === 'de') {
        const translatedFoodSearchText = await translate(locale, foodTags.name, 'en', 'de');

        setPredictions(prevArray => [
          ...prevArray,
          {
            id: foodTags.id,
            name: translatedFoodSearchText,
          },
        ]);

        setTags(prevArray => [
          ...prevArray,
          {
            id: foodTags.id,
            name: translatedFoodSearchText,
            active: true,
          },
        ]);
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
    }),
  );
}
