import React, {useState} from 'react';
import {View} from 'react-native';
import {makeStyles, SpeedDial} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useNavigation } from "@react-navigation/core";

const EditSpeedDialGroup = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const {selectedFood} = props;

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
        title="Delete"
        onPress={() => console.log('Delete Something')}
      />
    </SpeedDial>
  );
};

export default EditSpeedDialGroup;

const useStyles = makeStyles(theme => ({}));
