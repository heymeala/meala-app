import { HYPER, HYPO } from './Constants/targetRangeConstants';

export function analyseTimeInRange(cgmData) {
  let cgmArray = [];
  let cgmInRange = [];
  let cgmOutOfRange = [];
  let timeInRange;

  if (cgmData && cgmData.length > 0) {
    cgmData.map(data => {
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
