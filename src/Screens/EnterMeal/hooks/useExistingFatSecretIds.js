import { useEffect } from 'react';
import { database } from '../../../Common/realm/database';
import uuid from 'react-native-uuid';
import { EDIT_MODE, useEnterMealType } from '../../../hooks/useEnterMealState';

export function useExistingDataFromDB(
  mealId,
  setTags,
  setExistingFatSecretIds,
  setMealTitle,
  setMealId,
  setRestaurantId,
  setGroupId,
  setDate,
  setFoodPicture,
  setAvatarSourceCamera,
  setNote,
  setRestaurantName,
) {
  const { type } = useEnterMealType();
  useEffect(() => {
    if (mealId && type) {
      database.fetchMealById(mealId).then(data => {
        const convertedTags = data.tags.map(tagFromDB => {
          return {
            id: uuid.v4(),
            name: tagFromDB.tagEn,
            active: true,
          };
        });

        setTags(
          convertedTags.map(cTags => {
            return { ...cTags };
          }),
        );
        const fatSecretFromDB = data.fatSecretUserFoodEntryIds.map(fatSecret => fatSecret.foodEntryId);
        setExistingFatSecretIds(fatSecretFromDB);
        setRestaurantId(data.restaurantId);

        setMealTitle(data.food);
        if (type.mode === EDIT_MODE) {
          setMealId(data._id);
          setGroupId(data.groupId);
          setDate(data.date);
        }
        setFoodPicture(data.picture);
        setAvatarSourceCamera(data.picture ? { uri: data.picture } : undefined);
        // setCarbs(data.carbs); depends on source
        setNote(data.note);
        database.getRestaurantName(data.restaurantId).then(name => setRestaurantName(name));
      });
    }
  }, [mealId, type]);
}
