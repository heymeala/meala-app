export function filterSVGDataByTime(glucoseData, fromDate, tillDate, settings) {
  return glucoseData
    .filter(data => {
      const start = new Date(fromDate).getTime();
      const end = new Date(tillDate).getTime();
      return data.date > start && data.date < end;
    })
    .map(data => {
      const glucoseValueDate = new Date(data.date);
      return {
        x: glucoseValueDate,
        y: data.sgv / settings.unit,
      };
    });
}
