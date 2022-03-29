import { ObjectId } from 'bson';
import _ from 'lodash';

export const migrate = (oldRealm, newRealm) => {
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

  if (oldRealm.schemaVersion < 44) {
    const oldMeals = oldRealm.objects('Meal');
    const newMeals = newRealm.objects('Meal');

    const glucoseEntries = [];

    for (let i = 0; i < oldMeals.length; i++) {
      glucoseEntries.push(...convertNightscoutToGlucoseEntry(oldMeals[i].cgmData));

      newMeals._id = ObjectId();
      newMeals.groupId = oldMeals[i].id;
      delete newMeals[i].id;
      delete newMeals[i].userMealId;
      delete newMeals[i].cgmData;
    }

    // write glucose entries into new schema, removing duplicates
    newRealm.write(() => {
      _(glucoseEntries)
        .uniqBy(it => it._id)
        .forEach(it => {
          newRealm.create('GlucoseEntry', it);
        });
    });
  }
};

function convertNightscoutToGlucoseEntry(data) {
  if (!data) {
    return [];
  }

  try {
    data = JSON.parse(data);

    const sourceMapping = {
      'meala-Libre-Import': 'Freestyle-Libre',
      'healthkit-Import': 'HealthKit',
    };

    return data.map(it => ({
      _id: ObjectId(),
      sourceId: it._id,
      dataSource: sourceMapping[it.device] ?? 'NightScout',
      device: sourceMapping[it.device] ? null : it.device,
      date: new Date(it.dateString),
      glucoseValue: it.sgv,
    }));
  } catch (e) {
    console.error('Failed to migrate cgm data', e);
    return [];
  }
}
