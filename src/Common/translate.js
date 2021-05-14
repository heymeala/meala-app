import {GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS} from '@env';
import {Platform} from 'react-native';

export function translate(locale, text, source, target) {
  const apiKey = Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

  let url = 'https://translation.googleapis.com/language/translate/v2';
  url += '?q=' + text;
  url += '&target=' + target;
  url += '&source=' + source;
  url += '&key=' + apiKey;

  if (locale === 'de') {
    return fetch(url).then(googleTranslateRes =>
      googleTranslateRes.json().then(data => {
        console.log(data.data.translations[0].translatedText);
        return data.data.translations[0].translatedText;
      }),
    );
  } else {
    return text;
  }
}
