import { useEffect, useState } from "react";
import {database} from '../../../Common/database_realm';

export function useLoadRestaurantName(
  restaurantId,
  setRestaurantId,
  setRestaurantName,
) {
  const [get, setGet] = useState();
  useEffect(() => {
    if (restaurantId) {
      setRestaurantId(prevState => route.params.id);
      console.log('Scan param ' + route.params.id);
      database
        .getRestaurantName(route.params.id)
        .then(name => setRestaurantName(name));
    }
  }, [restaurantId]);
}
