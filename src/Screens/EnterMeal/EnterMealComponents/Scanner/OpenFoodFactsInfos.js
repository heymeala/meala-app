import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LocalizationContext from '../../../../../LanguageContext';

const OpenFoodFactsInfo = () => {
  const {t, locale} = React.useContext(LocalizationContext);

  return locale === 'de' ? (
    <View style={styles.container}>
      <Text>
        Die Daten und Bilder zu den Lebensmitteln stammen aus der
        gemeinschaftlichen, freien und offenen Datenbank Open Food Facts. Die
        Daten sind unter der Lizenz Open Database License verfügbar und die
        Fotos sind unter der Lizenz Creative Commons Attribution Share-Alike
        lizenziert. Die zitierten Marken sind Eigentum ihrer jeweiligen Inhaber.
      </Text>
      <Text>
        Die Datenbank wird kollaborativ durch Crowdsourcing (wie Wikipedia)
        aufgebaut, es kann nicht garantiert werden, dass sie keine Fehler
        enthält. Auch die Zusammensetzung und die Nährwertangaben von
        Lebensmitteln können sich geändert haben. Wenn Sie einen Fehler sehen,
        lassen Sie es uns bitte wissen, damit er korrigiert werden kann. Sie
        können ihn auch selbst auf Open Food Facts korrigieren.
      </Text>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>
        The food data and images come from the collaborative, free and open
        database Open Food Facts. The data is available under the Open Database
        License and the photos are licensed under the Creative Commons
        Attribution Share-Alike license. The cited trademarks are the property
        of their respective owners.
      </Text>
      <Text>
        The database is built collaboratively through crowdsourcing (like
        Wikipedia), it cannot be guaranteed that it will not contain errors.
        Also, the composition and nutritional information of foods may have
        changed. If you see an error, please let us know so it can be corrected.
        You can also correct it yourself on Open Food Facts.
      </Text>
    </View>
  );
};

export default OpenFoodFactsInfo;
const styles = StyleSheet.create({
  container: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    padding: 12,
  },
});
