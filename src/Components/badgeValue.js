export function badgeValue(screenReaderEnabled, timeInRange) {
  if (!screenReaderEnabled) {
    if (timeInRange === null) {
      return '';
    }
    console.log(timeInRange);
    const tir = timeInRange + '%';
    return tir.toString();
  } else {
    const tir = timeInRange + '%' + ' Zeit im Zielbereich';
    return tir.toString();
  }
}
