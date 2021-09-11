import { WAITING_TIME } from '../../Common/Constants/waitingTime';

export function mealsWithoutCgmData(data) {
  const timeNow = new Date().getTime();

  return data.filter(result => {
    const seconds = new Date(result.date).getTime();
    const differenzInHours = (timeNow - seconds) / 1000 / 60 / 60;
    const isWaitingOver = differenzInHours > WAITING_TIME;
    return isWaitingOver && result.cgmData === null;
  });
}
