import RNFetchBlob from 'rn-fetch-blob';
import { COMMUNITY_MEALS_TOKEN, COMMUNITY_UPDATE_URL } from '@env';

/**
 *
 * @param carbs
 * @param id _id of the Meal
 */
export function updateUserCarbsOnline(carbs, id) {
  RNFetchBlob.fetch(
    'POST',
    COMMUNITY_UPDATE_URL,
    {
      Authorization: 'Basic ' + COMMUNITY_MEALS_TOKEN,
      'Content-Type': 'multipart/form-data',
    },
    [
      { name: 'carbs', data: carbs.toString() },
      { name: 'userMealId', data: id },
    ],
  )
    .then(resp => {
      var tempMSG = resp.data;

      tempMSG = tempMSG.replace(/^"|"$/g, '');

      console.log(tempMSG);
    })
    .catch(err => {
      console.log(err);
    });
}
