export function analyseTimeInRange(cgmData) {
  let cgmArray = [];
  let cgmInRange = [];
  let cgmOutOfRange = [];
  const add = (a, b) => a + b;

  // console.log(cgmData)

  cgmData.map((cgmData) => {
    if (cgmData.sgv) {
      cgmArray.push(parseInt(cgmData.sgv));

      if (parseInt(cgmData.sgv) < 160 && parseInt(cgmData.sgv) > 70) {
        cgmInRange.push(parseInt(cgmData.sgv));
      } else {
        cgmOutOfRange.push(parseInt(cgmData.sgv));
      }
    }
  });

  const timeInRange = (cgmInRange.length / cgmArray.length) * 100;
  // const cgmSum = cgmArray.reduce(add)/cgmArray.length;

  //console.log(cgmInRange.length + "LENGTH:::::" + cgmArray.length)

  return Math.round(timeInRange);
}
