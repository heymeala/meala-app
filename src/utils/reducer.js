export function calculateFPE(calories, carbohydrates) {
  return Math.round((calories - carbohydrates * 4) / 100);
}

export const add = (a, b) => a + b;

export function reduceNutritionValues(data, type) {
  const fpe = data.reduce((a, v) => a + Number(v[type]), 0).toFixed(2);
  return fpe;
}
