import { WAITING_TIME } from '../../Common/Constants/waitingTime';

export function mealsWithoutCgmData(data) {
  const timeNow = new Date().getTime();

  const filteredData = data.filter(data => {
    const seconds = new Date(data.date).getTime();
    const differenzInHours = (timeNow - seconds) / 1000 / 60 / 60;
    const isWaitingOver = differenzInHours > WAITING_TIME;
    return isWaitingOver && data.cgmData === null;
  });
  return filteredData;
}
