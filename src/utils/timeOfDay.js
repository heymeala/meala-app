import React from 'react';

export function mealTypeByTime(currentTime, t) {
  const currentHour = currentTime.getHours();
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return t('AddMeal.lunch');
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return t('AddMeal.dinner');
  }
  // Between dawn and noon
  return t('AddMeal.breakfast');
}
