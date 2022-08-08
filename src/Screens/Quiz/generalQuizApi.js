import { QUIZ_CATEGORIES_URL, QUIZ_URL } from '@env';
import { checkAPI } from '../../utils/checkAPI';

export async function generalQuizApi(locale, categoryId) {
  checkAPI('QUIZ_URL', QUIZ_URL);
  const id = categoryId === 'random' ? '' : '&quiz_category=' + categoryId;
  const url = locale === 'de' ? QUIZ_URL + 'de&per_page=60' + id : QUIZ_URL + 'en&per_page=60' + id;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function quizCategoriesApi(locale) {
  checkAPI('QUIZ_CATEGORIES_URL', QUIZ_CATEGORIES_URL);
  const url =
    locale === 'de' ? QUIZ_CATEGORIES_URL + 'de&per_page=60' : QUIZ_CATEGORIES_URL + 'en&per_page=60';
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
