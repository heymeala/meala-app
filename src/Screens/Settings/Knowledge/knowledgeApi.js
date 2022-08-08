import { EN_KNOWLEDGE_URL, KNOWLEDGE_URL } from '@env';
import { checkAPI } from '../../../utils/checkAPI';

export async function knowledgeApi(locale) {
  checkAPI('KNOWLEDGE_URL', KNOWLEDGE_URL);
  checkAPI('EN_KNOWLEDGE_URL', EN_KNOWLEDGE_URL);
  const url = locale === 'de' ? KNOWLEDGE_URL : EN_KNOWLEDGE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
