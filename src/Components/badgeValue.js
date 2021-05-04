export function badgeValue(screenReaderEnabled, timeInRange) {
  if (!screenReaderEnabled && timeInRange) {
    return timeInRange + '%';
  } else {
    return timeInRange + '%' + ' \n Zeit im Zielbereich';
  }
}
