import { useEffect } from 'react';
import { database } from '../../../Common/database_realm';
import uuid from 'react-native-uuid';
import { EDIT_MODE, useEnterMealType } from '../../../hooks/useEnterMealState';

export function useExistingDataFromDB(
  meal_id,
  setTags,
  setExistingFatSecretIds,
  setMealTitle,
  setUserMealId,
  setRestaurantId,
  setMealId,
  setDate,
  setFoodPicture,
  setAvatarSourceCamera,
  setNote,
  setRestaurantName,
) {
  const { type } = useEnterMealType();
  useEffect(() => {
    if (meal_id && type) {
      database.fetchMealbyId(meal_id).then(data => {
        const convertedTags = data.tags.map(tagFromDB => {
          return {
            id: uuid.v4(),
            name: tagFromDB.tagEn,
            active: true,
          };
        });

        setTags(prevArray =>
          convertedTags.map(cTags => {
            return { ...cTags };
          }),
        );
        const fatSecretFromDB = data.fatSecretUserFoodEntryIds.map(fatSecret => fatSecret.foodEntryId);
        setExistingFatSecretIds(fatSecretFromDB);
        setRestaurantId(data.restaurantId);

        setMealTitle(data.food);
        if (type.mode === EDIT_MODE) {
          setUserMealId(data.userMealId);
          setMealId(data.id);
          setDate(data.date);
        }
        setFoodPicture(data.picture);
        setAvatarSourceCamera(data.picture ? { uri: data.picture } : undefined);
        // setCarbs(data.carbs); depends on source
        setNote(data.note);
        database.getRestaurantName(data.restaurantId).then(name => setRestaurantName(name));
      });
    }
  }, [meal_id, type]);
}
