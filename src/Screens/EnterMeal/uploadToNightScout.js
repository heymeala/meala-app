export function uploadToNightScout(nsTreatmentsUpload, note, settings, date) {
  if (nsTreatmentsUpload) {
    try {
      fetch(
        `${settings.nightscoutUrl}/api/v1/treatments?token=${settings.nightscoutToken}`,
        {
          method: 'post',
          headers: {
            Accept: 'accept: */*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              created_at: date,
              carbs: nsTreatmentsUpload.carbs || 0,
              insulin: nsTreatmentsUpload.insulin || 0,
              notes: note,
              enteredBy: 'meala',
            },
          ]),
        },
      )
        .then(res => res.json())
        .then(res => console.log(res));
    } catch (e) {
      console.log(e);
    }
  }
}
