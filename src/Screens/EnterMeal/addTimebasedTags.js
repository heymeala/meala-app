import { mealTypeByTime } from '../../utils/timeOfDay';

export function addTimeBasedTags(tags, setTags, date, t) {
  // add Breakfast | Lunch | Dinner to Tags and replace if Date updates
  if (tags.length > 0) {
    setTags(prevArray =>
      prevArray.map(data => {
        if (data.id === 'mealTime') {
          return {
            id: 'mealTime',
            name: mealTypeByTime(date, t),
            active: true,
          };
        } else {
          return {
            ...data,
          };
        }
      }),
    );
  } else {
    setTags([
      {
        id: 'mealTime',
        name: mealTypeByTime(date, t),
        active: true,
      },
    ]);
  }
}
