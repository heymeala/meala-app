export function calculateFPE(calories, carbohydrates) {
  return Math.round((calories - carbohydrates * 4) / 100);
}

export function reduceNutritionValues(data, type) {
  return data.reduce((a, v) => a + Number(v[type]), 0).toFixed(2);
}
