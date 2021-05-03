import moment from 'moment';

export function getDuration(treatmentsData, foodDatumMoment) {
  if (treatmentsData) {
    const firstInsulin = treatmentsData
      .map(data =>
        data.insulin > 0
          ? data.timestamp
            ? data.timestamp
            : data.date
            ? data.date
            : data.created_at
            ? data.created_at
            : null
          : null,
      )
      .filter(data => data);

    const startTime = moment(firstInsulin[0]);
    const stopTime = moment(foodDatumMoment);
    return moment.duration(startTime.diff(stopTime));
  } else {
    return null;
  }
}

const add = (a, b) => a + b;

// remove smb – settings in android aps
export function getInsulinInfo(treatments) {
  if (treatments.length > 0) {
    const insulin = treatments
      .filter(data => (data.isSMB ? data.isSMB === false : data))
      .map(data => {
        if (data.insulin && typeof data.insulin !== undefined) {
          return data.insulin.toFixed(2);
        }
      });
    const filterUndefined = insulin
      .filter(data => data !== undefined)
      .map(data => parseFloat(data));
    if (filterUndefined.length > 0) {
      return filterUndefined.reduce(add).toFixed(2);
    } else {
      return [0];
    }
  } else {
    return [0];
  }
}
export function carbSum(carbs) {
  if (carbs.length > 0) {
    return carbs.length > 0 ? carbs.reduce(add).toFixed(0) : '0';
  } else {
    return null;
  }
}

export function getSEA(checkSettings, t, duration, InsulinSumme) {
  return checkSettings === 'Nightscout'
    ? InsulinSumme.length > 1
      ? duration.asMilliseconds() < 0
        ? t('Entries.youHave') +
          Math.abs(Math.round(duration.asMinutes())) +
          t('Entries.before')
        : t('Entries.youHave') +
          Math.abs(Math.round(duration.asMinutes())) +
          t('Entries.after')
      : t('Entries.calculating')
    : null;
}
