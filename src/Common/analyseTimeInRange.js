import { HYPER, HYPO } from './Constants/targetRangeConstants';
import moment from 'moment';
import { SEA_MINUTES } from '../Screens/MealEntries/DetailSite/Chart/chartConstant';

export function analyseTimeInRange(cgmData, date) {
  let cgmArray = [];
  let cgmInRange = [];
  let cgmOutOfRange = [];
  let timeInRange;

  const tillDate = moment(date).add(3, 'hours').toISOString();
  const fromDate = moment(date).subtract(SEA_MINUTES, 'minutes').toISOString();

  if (cgmData && cgmData.length > 0) {
    cgmData
      .filter(data => {
        const start = new Date(fromDate).getTime();
        const end = new Date(tillDate).getTime();
        return data.date > start && data.date < end;
      })
      .map(data => {
        if (data.sgv) {
          cgmArray.push(parseInt(data.sgv));
          if (parseInt(data.sgv) < HYPER && parseInt(data.sgv) > HYPO) {
            cgmInRange.push(parseInt(data.sgv));
          } else {
            cgmOutOfRange.push(parseInt(data.sgv));
          }
        }
      });
    timeInRange = (cgmInRange.length / cgmArray.length) * 100;
    timeInRange = Math.round(timeInRange);
    //console.log(timeInRange);
  } else {
    timeInRange = null;
  }
  return timeInRange;
}
