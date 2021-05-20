export function calculateCarbs(treatmentdata) {
  let CarbArray = [0];
  const add = (a, b) => a + b;

  treatmentdata.map(treatments => {
    if (treatments.carbs) {
      CarbArray.push(parseFloat(treatments.carbs.toFixed(2)));
    }
  });

  const CarbSumme = CarbArray.reduce(add);
  return CarbSumme;
}
