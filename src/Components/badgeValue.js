export function badgeValue(screenReaderEnabled, timeInRange) {
  if (!screenReaderEnabled) {
    if (timeInRange === null) {
      return '';
    }
    const tir = timeInRange + '%';
    return tir.toString();
  } else {
    if (timeInRange === null) {
      return '';
    }
    const tir = timeInRange + '%' + ' \n  Zeit im Zielbereich';
    return tir.toString();
  }
}
