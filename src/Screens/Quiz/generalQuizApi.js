import { QUIZ_URL } from '@env';

export async function generalQuizApi(locale) {
  const url = locale === 'de' ? QUIZ_URL + 'de' : QUIZ_URL + 'en';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
