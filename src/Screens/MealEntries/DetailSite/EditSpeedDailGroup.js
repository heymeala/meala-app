import React, { useState } from 'react';
import { makeStyles, SpeedDial } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useNavigation } from '@react-navigation/core';
import { database } from '../../../Common/database_realm';
import { COPY_MODE, EDIT_MODE, useEnterMealType } from '../../../hooks/useEnterMealState';
import analytics from '@react-native-firebase/analytics';

const EditSpeedDialGroup = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const { selectedFood } = props;
  const { changeType } = useEnterMealType();

  function softDeleteMeal(id) {
    database.deleteMealSoft(id);
    navigation.goBack();
  }

  return (
    <SpeedDial
      isOpen={open}
      accessibilityHint={t('Accessibility.MealDetails.speedDail')}
      accessibilityLabel={t('Accessibility.MealDetails.open_menu')}
      overlayColor={'transparent'}
      icon={{ name: 'edit', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}>
      <SpeedDial.Action
        accessibilityLabel={t('Accessibility.MealDetails.edit')}
        icon={{ name: 'edit', color: '#fff' }}
        //title={t('Entries.copyMeal')}
        onPress={() => {
          analytics().logEvent('edit_meal', {
            type: EDIT_MODE,
          });
          changeType({ mode: EDIT_MODE, meal_id: selectedFood.userMealId });
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              meal_id: selectedFood.userMealId, // userMealId == primarykey
            },
          });
        }}
      />
      <SpeedDial.Action
        accessibilityLabel={t('Entries.copyMeal')}
        icon={{ name: 'content-copy', color: '#fff' }}
        //title={t('Entries.copyMeal')}
        onPress={() => {
          analytics().logEvent('edit_meal', {
            type: COPY_MODE,
          });
          changeType({ mode: COPY_MODE, meal_id: selectedFood.userMealId });
          navigation.navigate('EnterMealStack', {
            screen: 'EnterMeal',
            params: {
              meal_id: selectedFood.userMealId,
              type: COPY_MODE,
            },
          });
        }}
      />
      <SpeedDial.Action
        accessibilityLabel={t('Entries.delete')}
        color={'#ff0000'}
        icon={{ name: 'delete', color: '#fff' }}
        // title={t('Entries.delete')}
        onPress={() => {
          analytics().logEvent('edit_meal', {
            type: 'delete',
          });
          softDeleteMeal(selectedFood.userMealId);
        }}
      />
    </SpeedDial>
  );
};

export default EditSpeedDialGroup;

const useStyles = makeStyles(theme => ({}));
