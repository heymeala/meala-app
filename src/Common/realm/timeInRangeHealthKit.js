export function analyseTimeInRangeHealthKit(cgmData) {
  let cgmArray = [];
  let cgmInRange = [];
  let cgmOutOfRange = [];
  const add = (a, b) => a + b;

  cgmData.map((cgmData) => {
    if (cgmData.y) {
      cgmArray.push(parseInt(cgmData.y));

      if (parseInt(cgmData.y) < 160 && parseInt(cgmData.y) > 70) {
        cgmInRange.push(parseInt(cgmData.y));
      } else {
        cgmOutOfRange.push(parseInt(cgmData.y));
      }
    }
  });

  const timeInRange = (cgmInRange.length / cgmArray.length) * 100;
  // const cgmSum = cgmArray.reduce(add)/cgmArray.length;
  //console.log(cgmInRange.length + "LENGTH:::::" + cgmArray.length)

  return Math.round(timeInRange);
}
