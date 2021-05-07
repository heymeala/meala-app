import RNFetchBlob from 'rn-fetch-blob';
import {COMMUNITY_UPDATE_URL, COMMUNITY_MEALS_TOKEN} from '@env';
export function updateUserCarbsOnline(carbs, userMealId) {

  RNFetchBlob.fetch(
    'POST',
    COMMUNITY_UPDATE_URL,
    {
      Authorization: 'Basic ' + COMMUNITY_MEALS_TOKEN,
      'Content-Type': 'multipart/form-data',
    },
    [
      {name: 'carbs', data: carbs.toString()},
      {name: 'userMealId', data: userMealId},
    ],
  )
    .then((resp) => {
      var tempMSG = resp.data;

      tempMSG = tempMSG.replace(/^"|"$/g, '');

      console.log(tempMSG);
    })
    .catch((err) => {
      console.log(err);
    });
}
