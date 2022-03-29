export function calculateCarbs(treatmentdata) {
  let carbArray = [0];
  const add = (a, b) => a + b;
  console.log(treatmentdata);
  treatmentdata.map(treatments => {
    if (treatments.carbs) {
      carbArray.push(parseFloat(treatments.carbs.toFixed(2)));
    }
  });
  console.log(carbArray.reduce(add));
  return carbArray.reduce(add);
}
