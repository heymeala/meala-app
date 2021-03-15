import {Button} from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../LanguageContext';

const SaveButton = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <Button
      titleStyle={{color: 'black'}}
      containerStyle={
        props.containerStyle || {
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 10,
        }
      }
      buttonStyle={{borderRadius: 5, backgroundColor: '#f9de1c'}}
      title={t('General.Save')}
      onPress={() => props.onPress()}
      {...props}
    />
  );
};

export default SaveButton;
