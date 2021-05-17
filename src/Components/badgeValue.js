export function badgeValue(screenReaderEnabled, timeInRange) {
  if (!screenReaderEnabled) {
    if (timeInRange === null) {
      return '';
    }
    console.log(timeInRange);
    const tir = timeInRange + '%';
    return tir.toString();
  } else {
    if (timeInRange === null) {
      return '';
    }
    const tir = timeInRange + '%' + ' Zeit im Zielbereich';
    return tir.toString();
  }
}
