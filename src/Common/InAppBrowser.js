import { Linking } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';

export default async function openLink(url) {
  try {
    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(url);
      console.log(result);
    } else Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
}
