import { QUIZ_URL } from '@env';

export async function generalQuizApi(locale) {
  const url = locale === 'de' ? QUIZ_URL + 'de&per_page=60' : QUIZ_URL + 'en&per_page=60';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
