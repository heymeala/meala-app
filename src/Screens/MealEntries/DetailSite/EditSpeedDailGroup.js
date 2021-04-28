import React, {useState} from 'react';
import {View} from 'react-native';
import {makeStyles, SpeedDial} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import {useNavigation} from '@react-navigation/core';
import {database} from '../../../Common/database_realm';

const EditSpeedDialGroup = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const {selectedFood} = props;

  function softDeleteMeal(id) {
    database.deleteMealSoft(id);
    navigation.goBack();
  }

  return (
    <SpeedDial
      isOpen={open}
      overlayColor={'transparent'}
      icon={{name: 'edit', color: '#fff'}}
      openIcon={{name: 'close', color: '#fff'}}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}>
      <SpeedDial.Action
        icon={{name: 'add', color: '#fff'}}
        title={t('Entries.copyMeal')}
        onPress={() =>
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              mealid: selectedFood.id,
            },
          })
        }
      />
      <SpeedDial.Action
        icon={{name: 'delete', color: '#fff'}}
        title={t('Entries.delete')}
        onPress={() => softDeleteMeal(selectedFood.userMealId)}
      />
    </SpeedDial>
  );
};

export default EditSpeedDialGroup;

const useStyles = makeStyles(theme => ({}));
