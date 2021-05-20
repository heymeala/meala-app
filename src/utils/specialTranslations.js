export function serving(locale, text) {
  if (locale === 'de' && text === '1 serving') {
    return 'Eine Portion';
  } else {
    return text;
  }
}
