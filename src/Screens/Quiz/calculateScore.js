export function calculateScore(object) {
  return object
    .map(tries => {
      if (tries === 1) {
        return 10;
      } else if (tries === 2) {
        return 5;
      } else if (tries === 3) {
        return 1;
      }
    })
    .reduce((a, b) => a + b, 0);
}
