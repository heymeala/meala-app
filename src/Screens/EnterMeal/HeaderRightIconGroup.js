import React from 'react';
import { View } from 'react-native';
import { Button, makeStyles } from 'react-native-elements';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dialog from '../../Components/dialog';
import { useScreenReader } from '../../hooks/useScreenReaderEnabled';
import LocalizationContext from '../../../LanguageContext';

const HeaderRightIconGroup = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const screenReaderEnabled = useScreenReader();
  const { reset, saveAll } = props;
  return (
    <>
      <Button
        accessible={true}
        accessibilityLabel={t('Accessibility.EnterMeal.reset')}
        titleStyle={{ color: 'black', fontSize: 25 }}
        buttonStyle={{
          borderRadius: 5,
          backgroundColor: 'transparent',
          fontSize: 20,
        }}
        icon={<MaterialIcons style={{ fontSize: 20 }} name={'cleaning-services'} />}
        onPress={() => Dialog(t('AddMeal.resetTitle'), t('AddMeal.resetMessage'), t, () => reset())}
      />
      {screenReaderEnabled && (
        <Button
          accessible={true}
          accessibilityLabel={t('General.Save')}
          titleStyle={{ color: 'black', fontSize: 25 }}
          buttonStyle={{
            borderRadius: 5,
            backgroundColor: 'transparent',
            fontSize: 20,
          }}
          icon={<MaterialIcons style={{ fontSize: 20 }} name={'save'} />}
          onPress={() => saveAll()}
        />
      )}
    </>
  );
};

export default HeaderRightIconGroup;

const useStyles = makeStyles(theme => ({}));
