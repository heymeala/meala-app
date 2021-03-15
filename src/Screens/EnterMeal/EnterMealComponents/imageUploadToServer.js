import RNFetchBlob from 'rn-fetch-blob';
import {COMMUNITY_CREATE_MEAL_URL, COMMUNITY_MEALS_TOKEN} from '@env';

export const uploadImageToServer = async (props) => {
  //todo: integrate new database
  if (props.clarifaiImagebase !== '' && props.scope === 'GOOGLE') {
    RNFetchBlob.fetch(
      'POST',
      COMMUNITY_CREATE_MEAL_URL,
      {
        Authorization: 'Basic ' + COMMUNITY_MEALS_TOKEN,
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: 'image.png',
          type: 'image/png',
          data: props.clarifaiImagebase,
        },
        {name: 'restaurant_name', data: props.restaurantName},
        {name: 'restaurant_id', data: props.restaurantId},
        {name: 'address', data: props.restaurantStreet},
        {name: 'meal', data: props.mealTitle},
        {name: 'meal_id', data: props.mealId},
        {name: 'lat', data: String(props.lat)},
        {name: 'lng', data: String(props.lng)},
        {name: 'food_tags', data: JSON.stringify(props.predictions)},
        {name: 'user_id', data: props.user_id},
        {name: 'userMealId', data: props.userMealId},
      ],
    )
      .then((resp) => {
        var tempMSG = resp.data;
        tempMSG = tempMSG.replace(/^"|"$/g, '');
      })
      .catch((err) => {
        // ...
      });
  } else {
    console.log('No Image');
  }
};
