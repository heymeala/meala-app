import { Button } from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../LanguageContext';

const BlueButton = props => {
  const { t, locale } = React.useContext(LocalizationContext);

  return (
    <Button
      titleStyle={{ color: 'white' }}
      containerStyle={
        props.containerStyle || {
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 10,
        }
      }
      buttonStyle={{ borderRadius: 20, backgroundColor: '#154d80' }}
      title={t('General.Save')}
      onPress={() => props.onPress()}
      {...props}
    />
  );
};

export default BlueButton;
