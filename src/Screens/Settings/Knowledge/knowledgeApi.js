import { EN_KNOWLEDGE_URL, KNOWLEDGE_URL } from '@env';

export async function knowledgeApi(locale) {
  const url = locale === 'de' ? KNOWLEDGE_URL : EN_KNOWLEDGE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
