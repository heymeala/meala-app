import React, {useState} from 'react';
import {View} from 'react-native';
import {makeStyles, SpeedDial} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import {useNavigation} from '@react-navigation/core';
import {database} from '../../../Common/database_realm';
import {
  COPY_MODE,
  EDIT_MODE,
  useEnterMealType,
} from '../../../hooks/useEnterMealState';

const EditSpeedDialGroup = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const {selectedFood} = props;
  const {changeType} = useEnterMealType();
  function softDeleteMeal(id) {
    database.deleteMealSoft(id);
    navigation.goBack();
  }

  return (
    <SpeedDial
      isOpen={open}
      accessibilityLabel={'Öffne Menü'}
      overlayColor={'transparent'}
      icon={{name: 'edit', color: '#fff'}}
      openIcon={{name: 'close', color: '#fff'}}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}>
      <SpeedDial.Action
        accessibilityLabel={'Bearbeiten'}
        icon={{name: 'edit', color: '#fff'}}
        //title={t('Entries.copyMeal')}
        onPress={() => {
          changeType({mode: EDIT_MODE, meal_id: selectedFood.id});
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              meal_id: selectedFood.id,
            },
          });
        }}
      />
      <SpeedDial.Action
        accessibilityLabel={t('Entries.copyMeal')}
        icon={{name: 'content-copy', color: '#fff'}}
        //title={t('Entries.copyMeal')}
        onPress={() => {
          changeType({mode: COPY_MODE, meal_id: selectedFood.id});
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              meal_id: selectedFood.id,
              type: COPY_MODE,
            },
          });
        }}
      />
      <SpeedDial.Action
        accessibilityLabel={t('Entries.delete')}
        color={'#ff0000'}
        icon={{name: 'delete', color: '#fff'}}
        // title={t('Entries.delete')}
        onPress={() => softDeleteMeal(selectedFood.userMealId)}
      />
    </SpeedDial>
  );
};

export default EditSpeedDialGroup;

const useStyles = makeStyles(theme => ({}));
