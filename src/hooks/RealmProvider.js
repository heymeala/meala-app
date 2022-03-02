import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { useAuth } from "./AuthProvider";
import {
  CommunityQuiz,
  FatSecretFoodEntryIdsSchema,
  MealSchema,
  ProfileSchema,
  RestaurantSchema,
  SettingsSchemaV3,
  tagsSchema,
} from "../Common/Constants/realmSchema";
import uuid from "react-native-uuid";

const RealmContext = React.createContext(null);

const RealmProvider = ({ children, projectPartition }) => {
  const [tasks, setTasks] = useState([]);
  const [images, setImages] = useState([]);
  const { user, projectData } = useAuth();
  console.log("user", user);
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  console.log("projectData", projectData);
  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [
        RestaurantSchema,
        MealSchema,
        SettingsSchemaV3,
        tagsSchema,
        ProfileSchema,
        FatSecretFoodEntryIdsSchema,
        CommunityQuiz,
      ],
      sync: {
        user: user,
        partitionValue: "projectData[0].partition",
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      const syncTasks = projectRealm.objects("Task");
      let sortedTasks = syncTasks.sorted("name");
      setTasks([...sortedTasks]);
      sortedTasks.addListener(() => {
        setTasks([...sortedTasks]);
      });

      const syncImages = projectRealm.objects("Images");
      let sortedImages = syncImages.sorted("name");
      setImages([...sortedImages]);
      sortedImages.addListener(() => {
        setImages([...sortedImages]);
      });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        realmRef.current = null;
        setTasks([]);
      }
    };
  }, [user, projectData]);

  const saveRestaurant = (
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
    fatSecretUserFoodEntryIds
  ) => {
    const projectRealm = realmRef.current;

    const tags = predictions
      .filter((data) => data.active === true)
      .map((prediction) => {
        return { tagEn: prediction.name };
      });

    const latitude = lat ? parseFloat(lat) : null;
    const longitude = lng ? parseFloat(lng) : null;
    console.log(
      "restaurantName " + restaurantName,
      "restaurantId " + restaurantId,
      mealTitle,
      picId,
      note,
      lat,
      " lng" + lng,
      mealId,
      "userMealId  " + userMealId,
      scope,
      "carbs  " + carbs,
      predictions,
      date,
      fatSecretUserFoodEntryIds
    );
    projectRealm
      .then((realm) => {
        realm.write(() => {
          let restaurantEntry = realm.create(
            "Restaurant",
            {
              id: restaurantId,
              restaurant_name: restaurantName,
              address: "",
              lat: latitude,
              long: longitude,
              restaurantNote: "notiz",
              isDeleted: false,
              scope: scope,
            },
            true
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
            carbs: carbs ? parseFloat(carbs) : null,
            tags: tags,
            fatSecretUserFoodEntryIds: fatSecretUserFoodEntryIds || null,
          };

          restaurantEntry.food.push(realm.create("Meal", newMeal, true));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editRestaurantAndMeal = (
    mealTitle,
    picId,
    note,
    mealId,
    userMealId,
    date,
    fatSecretUserFoodEntryIds,
    predictions
  ) => {
    const projectRealm = realmRef.current;
    projectRealm
      .then((realm) => {
        const tags = predictions
          .filter((data) => data.active === true)
          .map((prediction) => {
            return { tagEn: prediction.name };
          });
        realm.write(() => {
          realm.create(
            "Meal",
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
            true
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchRestaurantsWithFilter = (filter) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const restaurants = realm
          .objects("Restaurant")
          .filtered(
            `isDeleted == false && restaurant_name LIKE[c] '*${filter}*' || food.food LIKE[c] '*${filter}*'`
          );
        return restaurants.sorted("restaurant_name");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchRestaurantsWithFilterLimit = (filter) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const restaurants = realm
          .objects("Restaurant")
          .filtered(
            `isDeleted == false && restaurant_name LIKE[c] '*${filter}*' LIMIT(5) `
          );
        return restaurants.sorted("restaurant_name");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRestaurantById = (id) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const restaurants = realm.objects("Restaurant").filtered("id = $0", id);
        console.log("re", restaurants[0]);
        return restaurants[0];
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMealWithDateTime = (startDate, endDate) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const meals = realm
          .objects("Meal")
          .filtered(
            "isDeleted == false && date >= $0 && date < $1",
            startDate,
            endDate
          );
        return meals;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMealDates = () => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const meals = realm.objects("Meal");
        return meals.sorted("date", true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchMealWithName = (food) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const meals = realm
          .objects("Meal")
          .filtered(
            `isDeleted == false && food LIKE[c] '*${food}*' || tags.tagEn Like[c]  '*${food}*' SORT(date DESC) LIMIT(25) `
          );
        return meals.sorted("date", true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMealbyId = (id) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const meals = realm.objects("Meal").filtered("userMealId = $0", id);
        return meals[0];
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRestaurantName = (restaurantId) => {
    const projectRealm = realmRef.current;
    projectRealm
      .then((realm) => {
        const restaurantName = realm
          .objects("Restaurant")
          .filtered(`isDeleted == false && id LIKE[c] '*${restaurantId}*'`)[0];
        return restaurantName.restaurant_name;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveSettings = (
    nightScoutUrl,
    nightscoutStatus,
    nightscoutVersion,
    nightscoutToken,
    nightscoutTreatmentsUpload
  ) => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      realm.write(() => {
        realm.create(
          "Settings",
          {
            id: "nightscoutUrl",
            nightscoutUrl: nightScoutUrl,
            nightscoutStatus: nightscoutStatus,
            nightscoutVersion: nightscoutVersion,
            nightscoutToken: nightscoutToken,
            nightscoutTreatmentsUpload: nightscoutTreatmentsUpload,
          },
          true
        );
      });
    });
  };

  const saveGlucoseSource = (glucoseSource, nightscoutToken) => {
    const projectRealm = realmRef.current;

    const getNightscoutToken = nightscoutToken ? nightscoutToken : null;
    projectRealm
      .then((realm) => {
        realm.write(() => {
          realm.create(
            "Settings",
            {
              id: "glucoseSource",
              glucoseSource: glucoseSource.toString(),
              nightscoutUrl: null,
              nightscoutStatus: null,
              nightscoutVersion: null,
              nightscoutToken: getNightscoutToken,
            },
            true
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSettings = () => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const url = realm.objects("Settings").filtered('id = "nightscoutUrl"');
        return url[0];
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getProfile = () => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const profile = realm.objects("Profile");
        return profile;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const saveProfile2 = (unit) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.create(
        'Profile',
        {
          _id: 1,
          unit: unit,
        },
        true
      );
    });
  };
  const saveOnbording = () => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      let onboardingState = realm.objects("Profile").filtered('_id = "1"');
      let counter = 0;
      onboardingState.length === 0
        ? (counter = 1)
        : (counter = onboardingState[0].onboarding + 1);

      realm.write(() => {
        realm.create(
          "Profile",
          {
            _id: 1,
            onboarding: counter,
          },
          true
        );
      });
      //console.log(onboardingState[0].onboarding);
      return onboardingState[0].onboarding;
    });
  };
  const getOnboarding = () => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        let onboardingState = realm.objects("Profile").filtered('_id = "1"');
        return onboardingState[0].onboarding;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getGlucoseSource = () => {
    const projectRealm = realmRef.current;
    projectRealm
      .then((realm) => {
        const glucoseSource = realm
          .objects("Settings")
          .filtered('_id = "glucoseSource"');
        if (typeof glucoseSource[0] !== "undefined") {
          return glucoseSource[0].glucoseSource;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCgmData = (id) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const Meal = realm.objects("Meal").filtered("userMealId = $0", id);
        return Meal[0].cgmData;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTreatmentsData = (date, id) => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const Meal = realm.objects("Meal").filtered("userMealId = $0", id);
        return Meal[0].treatmentsData;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getTags = () => {
    const projectRealm = realmRef.current;

    projectRealm
      .then((realm) => {
        const Tags = realm.objects("Tags").filtered("tagEn != null");
        return Tags;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMeal = () => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      realm.write(() => {
        realm.delete(realm.objects("Meal").filtered("isDeleted == true"));
      });
    });
  };

  const deleteRestaurant = () => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      realm.write(() => {
        realm.delete(realm.objects("Restaurant").filtered("isDeleted == true"));
      });
    });
  };
  const deleteMealSoft = (id) => {
    const projectRealm = realmRef.current;

    console.log(id);
    projectRealm.then((realm) => {
      realm.write(() => {
        realm.create(
          "Meal",
          {
            userMealId: id,
            isDeleted: true,
          },
          true
        );
      });
    });
  };

  const deleteRestaurantSoft = (id) => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      realm.write(() => {
        realm.create(
          "Restaurant",
          {
            id: id,
            isDeleted: true,
          },
          true
        );
      });
    });
  };
  const editMealCgmData = (cgmData, id) => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      //  let Meal = realm.objects('Meal').filtered('date = $0', date);
      realm.write(() => {
        realm.create(
          "Meal",
          {
            userMealId: id,
            cgmData: JSON.stringify(cgmData),
          },
          true
        );
        console.log("REALM DATABASE - editMealCGM");
      });
    });
  };
  const editMealTreatments = (date, treatmentsData, carbSum, id) => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      // console.log(date + 'date Treatements in realm')
      // let Meal = realm.objects('Meal').filtered('date = $0', date);
      realm.write(() => {
        realm.create(
          "Meal",
          {
            userMealId: id,
            carbs: carbSum,
            treatmentsData: JSON.stringify(treatmentsData),
          },
          true
        );
      });
    });
  };
  const addCommunityQuizAnswer = (questionId, tries, categoryId) => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      realm.write(() => {
        realm.create(
          "CommunityQuiz",
          {
            id: uuid.v4().toString(),
            date: new Date(),
            categoryId: categoryId,
            questionId: questionId.toString(),
            tries: tries,
          },
          false
        );
      });
    });
  };
  const getCommunityQuizAnswers = () => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      const CommunityQuiz = realm.objects("CommunityQuiz");
      return CommunityQuiz;
    });
  };
  const deleteCommunityQuizAnswers = () => {
    const projectRealm = realmRef.current;

    projectRealm.then((realm) => {
      realm.write(() => {
        realm.delete(realm.objects("CommunityQuiz"));
      });
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <RealmContext.Provider
      value={{
        saveRestaurant,
        editRestaurantAndMeal,
        fetchRestaurantsWithFilter,
        fetchRestaurantsWithFilterLimit,
        getRestaurantById,
        fetchMealWithDateTime,
        fetchMealDates,
        fetchMealWithName,
        fetchMealbyId,
        getRestaurantName,
        saveSettings,
        saveGlucoseSource,
        getSettings,
        getProfile,
        saveProfile2,
        saveOnbording,
        getOnboarding,
        getGlucoseSource,
        getCgmData,
        getTreatmentsData,
        getTags,
        deleteMeal,
        deleteRestaurant,
        deleteMealSoft,
        deleteRestaurantSoft,
        editMealCgmData,
        editMealTreatments,
        addCommunityQuizAnswer,
        getCommunityQuizAnswers,
        deleteCommunityQuizAnswers,
      }}
    >
      {children}
    </RealmContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useRealm = () => {
  const realm = useContext(RealmContext);
  if (realm == null) {
    throw new Error("useTasks() called outside of a TasksProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return realm;
};

export { RealmProvider, useRealm };
