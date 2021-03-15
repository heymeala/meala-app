import {Button} from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../LanguageContext';

const LightButton = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <Button
      titleStyle={{color: 'black'}}
      type={'outline'}
      containerStyle={
        props.containerStyle || {paddingLeft: 10, paddingRight: 10}
      }
      buttonStyle={{
        borderRadius: 5,
        borderColor: '#000',
        marginBottom: 0,
        backgroundColor: 'transparent',
      }}
      title={t('General.Save')}
      onPress={() => props.onPress()}
      {...props}
    />
  );
};

export default LightButton;
