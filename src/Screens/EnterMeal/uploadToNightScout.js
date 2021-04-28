export function uploadToNightScout(
  nightscoutCarbs,
  nightscoutInsulin,
  notiz,
  settings,
  date,
) {
  if (nightscoutCarbs || nightscoutInsulin) {
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
              carbs: nightscoutCarbs || 0,
              insulin: nightscoutInsulin || 0,
              notes: notiz,
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
