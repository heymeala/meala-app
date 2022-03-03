import React, { useContext, useState, useEffect, useRef } from 'react';
import Realm from 'realm';
import { useAuth } from './AuthProvider';
import {
  CommunityQuiz,
  FatSecretFoodEntryIdsSchema,
  MealSchema,
  ProfileSchema,
  RestaurantSchema,
  SettingsSchemaV3,
  tagsSchema,
  TaskSchema,
} from '../Common/Constants/realmSchema';
import uuid from 'react-native-uuid';
import { ObjectId } from 'bson';

const RealmContext = React.createContext(null);

const RealmProvider = ({ children, projectPartition }) => {
  const [tasks, setTasks] = useState([]);
  const [images, setImages] = useState([]);
  const { user, projectData } = useAuth();
  // Use a Ref to store the realm rather than the state because it is not
  // directly rendered, so updating it should not trigger a re-render as using
  // state would.
  const realmRef = useRef(null);
  console.log('projectData', projectData[0].partition);
  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      schema: [
        TaskSchema,
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
        partitionValue: projectData[0].partition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      /*      const syncTasks = projectRealm.objects('Task');
                        let sortedTasks = syncTasks.sorted('name');
                        setTasks([...sortedTasks]);
                        sortedTasks.addListener(() => {
                          setTasks([...sortedTasks]);
                        });*/
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

  const createTask = (task) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.create('Task', {
        _id: new ObjectId(),
        name: task,
        status: 'joo',
      });
    });
  };

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
    date
  ) => {
    const projectRealm = realmRef.current;

    const latitude = lat ? parseFloat(lat) : null;
    const longitude = lng ? parseFloat(lng) : null;

    projectRealm.write(() => {
      let restaurantEntry = projectRealm.create(
        'Restaurant',
        {
          _id: new ObjectId(),
          restaurantId: restaurantId,
          restaurant_name: restaurantName,
          address: '',
          lat: latitude,
          long: longitude,
          restaurantNote: 'notiz',
          isDeleted: false,
          scope: scope,
        },
        true
      );

      var newMeal = {
        food: mealTitle,
        picture: picId,
        date: date,
        note: note,
        cgmData: null,
        restaurantId: restaurantId,
        treatmentsData: null,
        isDeleted: false,
        _id: new ObjectId(),
        userMealId: userMealId,
      };

      restaurantEntry.food.push(projectRealm.create('Meal', newMeal, true));
    });
    return 'success';
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

    const tags =
      predictions &&
      predictions
        .filter((data) => data.active === true)
        .map((prediction) => {
          return { tagEn: prediction.name };
        });
    projectRealm.write(() => {
      projectRealm.create(
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
        true
      );
    });
  };

  const fetchRestaurantsWithFilter = (filter) => {
    const projectRealm = realmRef.current;

    const restaurants = projectRealm
      .objects('Restaurant')
      .filtered(
        `isDeleted == false && restaurant_name LIKE[c] '*${filter}*' || food.food LIKE[c] '*${filter}*'`
      );
    return restaurants.sorted('restaurant_name');
  };
  const fetchRestaurantsWithFilterLimit = (filter) => {
    const projectRealm = realmRef.current;

    const restaurants = projectRealm
      .objects('Restaurant')
      .filtered(`isDeleted == false && restaurant_name LIKE[c] '*${filter}*' LIMIT(5) `);
    return restaurants.sorted('restaurant_name');
  };
  const getRestaurantById = (id) => {
    const projectRealm = realmRef.current;

    const restaurants = projectRealm.objects('Restaurant').filtered('id = $0', id);
    console.log('re', restaurants[0]);
    return restaurants[0];
  };
  const fetchMealWithDateTime = (startDate, endDate) => {
    const projectRealm = realmRef.current;

    const meals = projectRealm
      .objects('Meal')
      .filtered('isDeleted == false && date >= $0 && date < $1', startDate, endDate);
    return meals;
  };
  const fetchMealDates = () => {
    const projectRealm = realmRef.current;

    const meals = projectRealm.objects('Meal');
    return meals.sorted('date', true);
  };
  const fetchMealWithName = (food) => {
    const projectRealm = realmRef.current;

    const meals = projectRealm
      .objects('Meal')
      .filtered(`isDeleted == false && food LIKE[c] '*${food}*' SORT(date DESC) LIMIT(25) `);
    return meals.sorted('date', true);
  };

  const fetchMealbyId = (id) => {
    const projectRealm = realmRef.current;

    const meals = projectRealm.objects('Meal').filtered('userMealId = $0', id);
    return meals[0];
  };
  const getRestaurantName = (restaurantId) => {
    const projectRealm = realmRef.current;

    const restaurantName = projectRealm
      .objects('Restaurant')
      .filtered(`isDeleted == false && restaurantId LIKE[c] '*${restaurantId}*'`)[0];
    return restaurantName.restaurant_name;
  };
  const saveSettings = (
    nightScoutUrl,
    nightscoutStatus,
    nightscoutVersion,
    nightscoutToken,
    nightscoutTreatmentsUpload
  ) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.create(
        'Settings',
        {
          id: 'nightscoutUrl',
          nightscoutUrl: nightScoutUrl,
          nightscoutStatus: nightscoutStatus,
          nightscoutVersion: nightscoutVersion,
          nightscoutToken: nightscoutToken,
          nightscoutTreatmentsUpload: nightscoutTreatmentsUpload,
        },
        true
      );
    });
  };

  const saveGlucoseSource = (glucoseSource, nightscoutToken) => {
    const projectRealm = realmRef.current;

    const getNightscoutToken = nightscoutToken ? nightscoutToken : null;

    projectRealm.write(() => {
      projectRealm.create(
        'Settings',
        {
          id: 'glucoseSource',
          glucoseSource: glucoseSource.toString(),
          nightscoutUrl: null,
          nightscoutStatus: null,
          nightscoutVersion: null,
          nightscoutToken: getNightscoutToken,
        },
        true
      );
    });
  };

  const getSettings = () => {
    const projectRealm = realmRef.current;

    const url = projectRealm.objects('Settings').filtered('id = "nightscoutUrl"');
    return url[0];
  };
  const getProfile = () => {
    const projectRealm = realmRef.current;

    const profile = projectRealm.objects('Profile');
    return profile;
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
      let onboardingState = projectRealm.objects('Profile').filtered('_id = "1"');
      let counter = 0;
      onboardingState.length === 0 ? (counter = 1) : (counter = onboardingState[0].onboarding + 1);

      realm.write(() => {
        realm.create(
          'Profile',
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

    let onboardingState = projectRealm.objects('Profile').filtered('_id = "1"');
    return onboardingState[0].onboarding;
  };
  const getGlucoseSource = () => {
    const projectRealm = realmRef.current;

    const glucoseSource = projectRealm.objects('Settings').filtered('_id = "glucoseSource"');
    if (typeof glucoseSource[0] !== 'undefined') {
      return glucoseSource[0].glucoseSource;
    } else {
      return null;
    }
  };

  const getCgmData = (id) => {
    const projectRealm = realmRef.current;

    const Meal = projectRealm.objects('Meal').filtered('userMealId = $0', id);
    return Meal[0].cgmData;
  };
  const getTreatmentsData = (date, id) => {
    const projectRealm = realmRef.current;

    const Meal = projectRealm.objects('Meal').filtered('userMealId = $0', id);
    return Meal[0].treatmentsData;
  };
  const getTags = () => {
    const projectRealm = realmRef.current;

    const Tags = projectRealm.objects('Tags').filtered('tagEn != null');
    return Tags;
  };

  const deleteMeal = () => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.delete(projectRealm.objects('Meal').filtered('isDeleted == true'));
    });
  };

  const deleteRestaurant = () => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.delete(projectRealm.objects('Restaurant').filtered('isDeleted == true'));
    });
  };
  const deleteMealSoft = (id) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.create(
        'Meal',
        {
          userMealId: id,
          isDeleted: true,
        },
        true
      );
    });
  };

  const deleteRestaurantSoft = (id) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.create(
        'Restaurant',
        {
          _id: id,
          isDeleted: true,
        },
        true
      );
    });
  };
  const editMealCgmData = (cgmData, id) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create(
        'Meal',
        {
          userMealId: id,
          cgmData: JSON.stringify(cgmData),
        },
        true
      );
      console.log('REALM DATABASE - editMealCGM');
    });
  };
  const editMealTreatments = (date, treatmentsData, carbSum, id) => {
    const projectRealm = realmRef.current;

    // console.log(date + 'date Treatements in realm')
    // let Meal = realm.objects('Meal').filtered('date = $0', date);
    projectRealm.write(() => {
      projectRealm.create(
        'Meal',
        {
          userMealId: id,
          carbs: carbSum,
          treatmentsData: JSON.stringify(treatmentsData),
        },
        true
      );
    });
  };
  const addCommunityQuizAnswer = (questionId, tries, categoryId) => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.create(
        'CommunityQuiz',
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
  };
  const getCommunityQuizAnswers = () => {
    const projectRealm = realmRef.current;

    const CommunityQuiz = projectRealm.objects('CommunityQuiz');
    return CommunityQuiz;
  };
  const deleteCommunityQuizAnswers = () => {
    const projectRealm = realmRef.current;

    projectRealm.write(() => {
      projectRealm.delete(projectRealm.objects('CommunityQuiz'));
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <RealmContext.Provider
      value={{
        createTask,
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
    throw new Error('useTasks() called outside of a TasksProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return realm;
};

export { RealmProvider, useRealm };
