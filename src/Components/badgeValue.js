export function badgeValue(screenReaderEnabled, timeInRange) {
  if (!screenReaderEnabled && timeInRange) {
    const tir = timeInRange + '%';
    return tir.toString();
  } else {
    const tir = timeInRange + '%' + ' Zeit im Zielbereich';
    return tir.toString();
  }
}
