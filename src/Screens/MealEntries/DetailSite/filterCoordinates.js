import { MAX_CHART_VALUE, MIN_CHART_VALUE } from './Chart/chartConstant';
import { useUserSettings } from '../../../hooks/useUserSettings';

export function mapUnit(value, settings) {
  return settings.unit === 1
    ? value + MIN_CHART_VALUE
    : value / (MAX_CHART_VALUE / settings.unit) + MIN_CHART_VALUE / settings.unit;
}

export function filterCoordinates(coordinates, type, settings) {
  const filteredCoordinates = coordinates
    .map(data => {
      const time =
        data.timestamp || data.date || data.created_at
          ? new Date(data.timestamp ? data.timestamp : data.date ? data.date : data.created_at)
          : null;
      if (data[type] >= 0 && data[type] && time) {
        const yAxis = mapUnit(data[type], settings);

        return {
          x: time,
          y: yAxis,
        };
      }
    })
    .filter(coordinate => coordinate);
  return filteredCoordinates;
}
