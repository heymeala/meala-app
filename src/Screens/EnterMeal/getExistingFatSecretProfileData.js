import * as Keychain from 'react-native-keychain';
import {getFoodByDateFromUser} from '../../Common/fatsecret/fatsecretApi';

export function getExistingFatSecretProfileData(date, setFatSecretData) {
  Keychain.hasInternetCredentials(
    'https://www.fatsecret.com/oauth/authorize',
  ).then(result => {
    if (result !== false) {
      // get Date from DatePicker and Calculate days since epoch
      var myEpoch = Math.trunc(date.getTime() / 1000.0 / 60 / 60 / 24);

      getFoodByDateFromUser(myEpoch, null).then(data => {
        if (data.food_entries) {
          if (data.food_entries.food_entry.length >= 0) {
            const checkedData = data.food_entries.food_entry.map(items => {
              return {...items, checked: false};
            });
            setFatSecretData(checkedData);
          } else if (data.food_entries.food_entry) {
            setFatSecretData([
              {...data.food_entries.food_entry, checked: false},
            ]);
          }
          // console.log(data);
        } else {
          setFatSecretData();
          //  console.log('no data');
        }
      });
    }
  });
}
