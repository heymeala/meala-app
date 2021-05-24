import { KNOWLEDGE_URL } from '@env';

export async function knowledgeApi() {
  const url = KNOWLEDGE_URL;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
