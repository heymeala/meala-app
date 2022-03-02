export const MealSchema = {
  name: 'Meal',
  primaryKey: '_id',

  properties: {
    _id2: 'string',
    food: 'string',
    picture: 'string',
    carbs: 'float?',
    date: 'date',
    tags: { type: 'list', objectType: 'Tags' },
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
    _id: 'string',
    fatSecretUserFoodEntryIds: {
      type: 'list',
      objectType: 'FatSecretFoodEntryIds',
    },
  },
};

export const tagsSchema = {
  name: 'Tags',
  primaryKey: '_id',

  properties: {
    _id: 'string',
    tagEn: 'string?',
  },
};
export const FatSecretFoodEntryIdsSchema = {
  name: 'FatSecretFoodEntryIds',
  primaryKey: '_id',

  properties: {
    _id: 'string',
    foodEntryId: 'string?',
  },
};

export const CommunityQuiz = {
  name: 'CommunityQuiz',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    date: 'date',
    questionId: 'string',
    tries: 'int',
    categoryId: 'string',
  },
};

// https://realm.io/docs/javascript/latest/api/tutorial-query-language.html  linking objects

export const RestaurantSchema = {
  name: 'Restaurant',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    food: { type: 'list', objectType: 'Meal' },
    restaurant_name: 'string',
    address: 'string',
    lat: 'float?',
    long: 'float?',
    restaurantNote: 'string',
    isDeleted: 'bool',
    scope: 'string?',
  },
};

export const SettingsSchemaV3 = {
  name: 'Settings',
  primaryKey: '_id',
  properties: {
    _id: 'string',
    nightscoutUrl: 'string?',
    nightscoutStatus: 'string?',
    nightscoutVersion: 'string?',
    glucoseSource: 'string?',
    nightscoutToken: 'string?',
    nightscoutTreatmentsUpload: 'bool?',
  },
};

export const ProfileSchema = {
  name: 'Profile',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    onboarding: 'int',
    name: 'string?',
    type: 'string?',
    analytics: 'bool?',
    unit: 'float?',
    targetLow: 'int?',
    targetHigh: 'int?',
  },
};

/*export const QuizSchema = {
  name: 'MealQuiz',
  primaryKey: 'id',
  properties: {
    id: 'int',
    date: 'date',
    carbohydrate_score: 'int?',
    protein_score: 'int?',
    calories_score: 'int?',
    fat_score: 'int?',
    fpe_score: 'int?',
    general_diabetes_score: 'int?',
  },
};

export const userAnswers = {
  name: 'UserAnswers',
  primaryKey: 'id',
  properties: {
    id: 'int',
    question_id: 'int',
    question: 'string?',
    answer: 'bool',
  },
};*/
