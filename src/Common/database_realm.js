import React from 'react';

const Realm = require('realm');
// Define your models and their properties

let MealSchema = {
  name: 'Meal',
  primaryKey: 'userMealId',

  properties: {
    id: 'string',
    food: 'string',
    picture: 'string',
    carbs: 'float?',
    date: 'date',
    tags: {type: 'list', objectType: 'Tags'},
    note: 'string',
    cgmData: 'string?',
    treatmentsData: 'string?',
    restaurantId: 'string?',
    restaurants: {
      type: 'linkingObjects',
      objectType: 'Restaurant',
      property: 'food',
    },
    isDeleted: 'bool',
    userMealId: 'string',
    fatSecretUserFoodEntryIds: {
      type: 'list',
      objectType: 'FatSecretFoodEntryIds',
    },
  },
};

let tagsSchema = {
  name: 'Tags',
  properties: {
    tagEn: 'string?',
  },
};
let FatSecretFoodEntryIdsSchema = {
  name: 'FatSecretFoodEntryIds',
  properties: {
    foodEntryId: 'string?',
  },
};

// https://realm.io/docs/javascript/latest/api/tutorial-query-language.html  linking objects

let RestaurantSchema = {
  name: 'Restaurant',
  primaryKey: 'id',
  properties: {
    id: 'string',
    food: {type: 'list', objectType: 'Meal'},
    restaurant_name: 'string',
    address: 'string',
    lat: 'float?',
    long: 'float?',
    restaurantNote: 'string',
    isDeleted: 'bool',
    scope: 'string?',
  },
};

let SettingsSchemaV3 = {
  name: 'Settings',
  primaryKey: 'id',
  properties: {
    id: 'string',
    nightscoutUrl: 'string?',
    nightscoutStatus: 'string?',
    nightscoutVersion: 'string?',
    glucoseSource: 'string?',
    nightscoutToken: 'string?',
    nightscoutTreatmentsUpload: 'bool?',
  },
};

let ProfileSchema = {
  name: 'Profile',
  primaryKey: 'id',
  properties: {
    id: 'int',
    onboarding: 'int',
    name: 'string?',
    type: 'string?',
    analytics: 'bool?',
    unit: 'float?',
    targetLow: 'int?',
    targetHigh: 'int?',
  },
};

export const database = {
  _open: Realm.open({
    schema: [
      RestaurantSchema,
      MealSchema,
      SettingsSchemaV3,
      tagsSchema,
      ProfileSchema,
      FatSecretFoodEntryIdsSchema,
    ],

    schemaVersion: 38,
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < 32) {
        const oldObjects = oldRealm.objects('Settings');
        const newObjects = newRealm.objects('Settings');
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].nightscoutToken = null;
        }
      }

      if (oldRealm.schemaVersion < 34) {
        const oldObjects = oldRealm.objects('Profile');
        const newObjects = newRealm.objects('Profile');
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].unit = 1;
          newObjects[i].targetLow = 70;
          newObjects[i].targetHigh = 160;
        }
      }

      if (oldRealm.schemaVersion < 36) {
        const oldObjects = oldRealm.objects('Meal');
        const newObjects = newRealm.objects('Meal');
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].fatSecretUserFoodEntryIds = [];
        }
      }

      if (oldRealm.schemaVersion < 37) {
        const oldObjects = oldRealm.objects('Settings');
        const newObjects = newRealm.objects('Settings');
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].nightscoutTreatmentsUpload = false;
        }
      }
    },
  }),

  saveRestaurant: (
    restaurantName,
    restaurantId,
    mealTitle,
    picId,
    note,
    lat,
    lng,
    mealId,
    userMealId,
    scope,
    carbs,
    predictions,
    date,
    fatSecretUserFoodEntryIds,
  ) => {
    const tags = predictions
      .filter(data => data.active === true)
      .map(prediction => {
        return {tagEn: prediction.name};
      });

    console.log('Save' + restaurantName);
    return database._open
      .then(realm => {
        realm.write(() => {
          let restaurantEntry = realm.create(
            'Restaurant',
            {
              id: restaurantId,
              restaurant_name: restaurantName,
              address: '',
              lat: lat === '0' ? null : parseFloat(lat),
              long: lng === '0' ? null : parseFloat(lng),
              restaurantNote: 'notiz',
              isDeleted: false,
              scope: scope,
            },
            true,
          );

          var newMeal = {
            food: mealTitle,
            picture: picId,
            date: date,
            tag: tags,
            note: note,
            cgmData: null,
            restaurantId: restaurantId,
            treatmentsData: null,
            isDeleted: false,
            id: mealId,
            userMealId: userMealId,
            carbs: parseFloat(carbs),
            tags: tags,
            fatSecretUserFoodEntryIds: fatSecretUserFoodEntryIds || null,
          };

          restaurantEntry.food.push(realm.create('Meal', newMeal, true));
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  editRestaurantAndMeal: (
    mealTitle,
    picId,
    note,
    mealId,
    userMealId,
    date,
    fatSecretUserFoodEntryIds,
    predictions,
  ) => {
    return database._open
      .then(realm => {
        const tags = predictions
          .filter(data => data.active === true)
          .map(prediction => {
            return {tagEn: prediction.name};
          });
        realm.write(() => {
          realm.create(
            'Meal',
            {
              food: mealTitle,
              picture: picId,
              date: date,
              tag: tags,
              note: note,
              treatmentsData: null,
              userMealId: userMealId,
              tags: tags,
              fatSecretUserFoodEntryIds: fatSecretUserFoodEntryIds || null,
            },
            true,
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  fetchRestaurantsWithFilter: filter => {
    return database._open
      .then(realm => {
        const restaurants = realm
          .objects('Restaurant')
          .filtered(
            `isDeleted == false && restaurant_name LIKE[c] '*${filter}*' || food.food LIKE[c] '*${filter}*'`,
          );
        return restaurants.sorted('restaurant_name');
      })
      .catch(error => {
        console.log(error);
      });
  },
  fetchRestaurantsWithFilterLimit: filter => {
    return database._open
      .then(realm => {
        const restaurants = realm
          .objects('Restaurant')
          .filtered(`isDeleted == false && restaurant_name LIKE[c] '*${filter}*' LIMIT(5) `);
        return restaurants.sorted('restaurant_name');
      })
      .catch(error => {
        console.log(error);
      });
  },
  getRestaurantById: id => {
    return database._open
      .then(realm => {
        const restaurants = realm.objects('Restaurant').filtered('id = $0', id);
        console.log('re', restaurants[0]);
        return restaurants[0];
      })
      .catch(error => {
        console.log(error);
      });
  },
  fetchMealWithDateTime: (startDate, endDate) => {
    return database._open
      .then(realm => {
        const meals = realm
          .objects('Meal')
          .filtered('isDeleted == false && date >= $0 && date < $1', startDate, endDate);
        return meals;
      })
      .catch(error => {
        console.log(error);
      });
  },
  fetchMealDates: () => {
    return database._open
      .then(realm => {
        const meals = realm.objects('Meal');
        return meals.sorted('date', true);
      })
      .catch(error => {
        console.log(error);
      });
  },
  fetchMealWithName: food => {
    return database._open
      .then(realm => {
        const meals = realm
          .objects('Meal')
          .filtered(`isDeleted == false && food LIKE[c] '*${food}*' || tags.tagEn Like[c]  '*${food}*' SORT(date DESC) LIMIT(25) `);
        return meals.sorted('date', true);
      })
      .catch(error => {
        console.log(error);
      });
  },

  fetchMealbyId: id => {
    return database._open
      .then(realm => {
        const meals = realm.objects('Meal').filtered('id = $0', id);
        return meals[0];
      })
      .catch(error => {
        console.log(error);
      });
  },
  getRestaurantName: restaurantId => {
    return database._open
      .then(realm => {
        const restaurantName = realm
          .objects('Restaurant')
          .filtered(`isDeleted == false && id LIKE[c] '*${restaurantId}*'`)[0];
        return restaurantName.restaurant_name;
      })
      .catch(error => {
        console.log(error);
      });
  },
  saveSettings: (
    nightScoutUrl,
    nightscoutStatus,
    nightscoutVersion,
    nightscoutToken,
    nightscoutTreatmentsUpload,
  ) => {
    return database._open.then(realm => {
      realm.write(() => {
        realm.create(
          'Settings',
          {
            id: 'nightscoutUrl',
            nightscoutUrl: nightScoutUrl,
            nightscoutStatus: nightscoutStatus,
            nightscoutVersion: nightscoutVersion,
            nightscoutToken: nightscoutToken,
            nightscoutTreatmentsUpload: nightscoutTreatmentsUpload,
          },
          true,
        );
      });
    });
  },

  saveGlucoseSource: (glucoseSource, nightscoutToken) => {
    const getNightscoutToken = nightscoutToken ? nightscoutToken : null;
    return database._open
      .then(realm => {
        realm.write(() => {
          realm.create(
            'Settings',
            {
              id: 'glucoseSource',
              glucoseSource: glucoseSource.toString(),
              nightscoutUrl: null,
              nightscoutStatus: null,
              nightscoutVersion: null,
              nightscoutToken: getNightscoutToken,
            },
            true,
          );
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  getSettings: () => {
    return database._open
      .then(realm => {
        const url = realm.objects('Settings').filtered('id = "nightscoutUrl"');
        return url[0];
      })
      .catch(error => {
        console.log(error);
      });
  },
  getProfile: () => {
    return database._open
      .then(realm => {
        const profile = realm.objects('Profile');
        return profile;
      })
      .catch(error => {
        console.log(error);
      });
  },
  saveProfile: unit => {
    return database._open.then(realm => {
      let onboardingState = realm.objects('Profile');

      realm.write(() => {
        realm.create(
          'Profile',
          {
            id: 1,
            unit: unit,
          },
          true,
        );
      });
      return onboardingState[0].onboarding;
    });
  },
  saveOnbording: () => {
    return database._open.then(realm => {
      let onboardingState = realm.objects('Profile').filtered('id = "1"');
      let counter = 0;
      onboardingState.length === 0 ? (counter = 1) : (counter = onboardingState[0].onboarding + 1);

      realm.write(() => {
        realm.create(
          'Profile',
          {
            id: 1,
            onboarding: counter,
          },
          true,
        );
      });
      //console.log(onboardingState[0].onboarding);
      return onboardingState[0].onboarding;
    });
  },
  getOnboarding: () => {
    return database._open
      .then(realm => {
        let onboardingState = realm.objects('Profile').filtered('id = "1"');
        return onboardingState[0].onboarding;
      })
      .catch(error => {
        console.log(error);
      });
  },
  getGlucoseSource: () => {
    return database._open
      .then(realm => {
        const glucoseSource = realm.objects('Settings').filtered('id = "glucoseSource"');
        if (typeof glucoseSource[0] !== 'undefined') {
          return glucoseSource[0].glucoseSource;
        } else {
          return null;
        }
      })
      .catch(error => {
        console.log(error);
      });
  },

  getCgmData: (date, id) => {
    return database._open
      .then(realm => {
        const Meal = realm.objects('Meal').filtered('userMealId = $0', id);

        return Meal[0].cgmData;
      })
      .catch(error => {
        console.log(error);
      });
  },
  getTreatmentsData: (date, id) => {
    return database._open
      .then(realm => {
        const Meal = realm.objects('Meal').filtered('userMealId = $0', id);
        return Meal[0].treatmentsData;
      })
      .catch(error => {
        console.log(error);
      });
  },
  getTags: () => {
    return database._open
      .then(realm => {
        const Tags = realm.objects('Tags').filtered('tagEn != null');
        return Tags;
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteMeal: () => {
    return database._open.then(realm => {
      realm.write(() => {
        realm.delete(realm.objects('Meal').filtered('isDeleted == true'));
      });
    });
  },

  deleteRestaurant: () => {
    return database._open.then(realm => {
      realm.write(() => {
        // Create a book object
        realm.delete(realm.objects('Restaurant').filtered('isDeleted == true'));
      });
    });
  },
  deleteMealSoft: id => {
    return database._open.then(realm => {
      realm.write(() => {
        realm.create(
          'Meal',
          {
            userMealId: id,
            isDeleted: true,
          },
          true,
        );
      });
    });
  },

  deleteRestaurantSoft: id => {
    return database._open.then(realm => {
      realm.write(() => {
        realm.create(
          'Restaurant',
          {
            id: id,
            isDeleted: true,
          },
          true,
        );
      });
    });
  },
  editMealCgmData: (date, cgmData, id) => {
    return database._open.then(realm => {
      //  let Meal = realm.objects('Meal').filtered('date = $0', date);
      realm.write(() => {
        realm.create(
          'Meal',
          {
            userMealId: id,
            cgmData: JSON.stringify(cgmData),
          },
          true,
        );

        console.log('REALM DATABASE - editMealCGM' + date);
      });
    });
  },
  editMealTreatments: (date, treatmentsData, carbSum, id) => {
    return database._open.then(realm => {
      // console.log(date + 'date Treatements in realm')
      // let Meal = realm.objects('Meal').filtered('date = $0', date);
      realm.write(() => {
        realm.create(
          'Meal',
          {
            userMealId: id,
            carbs: carbSum,
            treatmentsData: JSON.stringify(treatmentsData),
          },
          true,
        );
      });
    });
  },
};
