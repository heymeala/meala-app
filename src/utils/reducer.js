export function calculateFPE(calories, carbohydrates){
    return  Math.round((calories - (carbohydrates*4)) / 100)
}

export function reduceCarbohydrates(data) {
    return data
        .reduce((a, v) => (a = a + Number(v.carbohydrate)), 0)
        .toFixed(2);
}
export function reduceCalories(data) {
    return data
        .reduce((a, v) => (a + Number(v.calories)), 0)
        .toFixed(2);
}
