export function removeDuplicates(array) {
  const newArray = array.map(item => item.food);
  const index = newArray.map((item, index) => {
    return newArray.indexOf(item) === index;
  });
  const lastStep = array.filter((item, i) => {
    return index[i];
  });
  return lastStep;
}
