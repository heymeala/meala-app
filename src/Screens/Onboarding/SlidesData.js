import timeinrange from '../../assets/animations/onboarding/timeinrange.json';

export const enSlides = [
  {
    key: 1,
    title: 'Find Meal',
    text:
      "Find meals based on your location and learn from your own and others' experiences. \n\n",
    image: require('../../assets/onboarding/1.png'),
    backgroundColor: '#fff',
  },
  {
    key: 2,
    title: 'Time in Range',
    text:
      'Check if your BE factors are correct. Your sugar should be back in the target range within three hours after your meal. \n',
    //image: require('../../assets/onboarding/2.png'),
    animation: timeinrange,
    backgroundColor: '#fff',
  },
  {
    key: 3,
    title: 'Reminder',
    text:
      "The results of your meal are not available for three hours. You'll get a notification when our analysis is done",
    image: require('../../assets/onboarding/3.png'),
    backgroundColor: '#fff',
  },
  {
    key: 4,
    title: 'Disclaimer',
    text:
      'meala must not be used to make medical decisions. It is a research tool only and is provided as is without warranty of any kind, either expressed or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose. The entire risk as to the quality and performance of the program is with you. Schuld the program prove defective, you assume the cost of all necessary servicing, repair or correction.',
    backgroundColor: '#ff605a',
  },
];

export const deSlides = [
  {
    key: 1,
    title: 'Mahlzeiten finden',
    text:
      'Finde Mahlzeiten basierend auf Deinem Standort und lerne von Deinen eigenen und den Erfahrungen anderer.\n\n',
    image: require('../../assets/onboarding/1.png'),

    backgroundColor: '#fff',
  },
  {
    key: 2,
    title: 'Zeit im Zielbereich',
    text:
      'Überprüfe ob Deine BE-Faktoren stimmen. Dein Zucker sollte spätestens drei Stunden nach der Mahlzeit wieder im Zielbereich sein.\n ',
    animation: timeinrange,

    backgroundColor: '#fff',
  },
  {
    key: 3,
    title: 'Erinnerung',
    text:
      'Die Ergebnisse deiner Mahlzeit sind erst nach drei Stunden vorhanden. Du erhältst eine Erinnerung wenn meala mit der Analyse fertig ist',
    image: require('../../assets/onboarding/3.png'),
    backgroundColor: '#fff',
  },
  {
    key: 4,
    title: 'Disclaimer',
    text:
      'meala darf nicht für medizinische Entscheidungen verwendet werden. ' +
      'Es ist ein reines Recherchetool und wird in der vorliegenden Form ohne ' +
      'jegliche ausdrückliche oder stillschweigende Garantie bereitgestellt,' +
      ' einschließlich, aber nicht beschränkt auf die implizite Gewährleistung der ' +
      'Marktgängigkeit und Eignung für einen bestimmten Zweck. Das gesamte Risiko hinsichtlich' +
      ' der Qualität und Leistung des Programms liegt bei Ihnen. Sollte sich das Programm als' +
      ' fehlerhaft erweisen, übernehmen Sie die Kosten für alle notwendigen Wartungs-, Reparatur- oder Korrekturarbeiten.',
    backgroundColor: '#ff605a',
  },
];
