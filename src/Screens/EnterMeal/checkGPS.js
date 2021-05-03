import {getCurrentPosition} from '../../Common/geolocation';

export function checkGps(setLng, setLat, setGpsEnabled) {
  getCurrentPosition()
    .then(position => {
      setLng(prevState => parseFloat(position.coords.longitude));
      setLat(prevState => parseFloat(position.coords.latitude));
      setGpsEnabled(true);
    })
    .catch(() => {
      setLat('0');
      setLng('0');
      setGpsEnabled(false);
    });
}
