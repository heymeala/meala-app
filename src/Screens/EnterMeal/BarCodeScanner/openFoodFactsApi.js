export function openFoodFactsApi(code) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data);
}
