import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import OutLineButton from '../../../Common/OutLineButton';
import LocalizationContext from '../../../../LanguageContext';

const EmptyPlacesButtons = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { setOpen } = props;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>{t('AddMeal.SearchRestaurant.noSearchText')}</Text>
        <Text style={styles.text}>{t('AddMeal.SearchRestaurant.noSearchText2')}</Text>
      </View>
      <OutLineButton
        title={t('AddMeal.SearchRestaurant.office')}
        onPress={() => {
          props.handleRestaurantPress(
            t('AddMeal.SearchRestaurant.office'),
            t('AddMeal.SearchRestaurant.office'),
            'local',
          );
          setOpen(false);
        }}
      />
      <OutLineButton
        title={t('AddMeal.SearchRestaurant.uni')}
        onPress={() => {
          props.handleRestaurantPress(
            t('AddMeal.SearchRestaurant.uni'),
            t('AddMeal.SearchRestaurant.uni'),
            'local',
          );
          setOpen(false);
        }}
      />
      <OutLineButton
        title={t('AddMeal.SearchRestaurant.school')}
        onPress={() => {
          props.handleRestaurantPress(
            t('AddMeal.SearchRestaurant.school'),
            t('AddMeal.SearchRestaurant.school'),
            'local',
          );
          setOpen(false);
        }}
      />
      <OutLineButton
        title={t('AddMeal.SearchRestaurant.gym')}
        onPress={() => {
          props.handleRestaurantPress(
            t('AddMeal.SearchRestaurant.gym'),
            t('AddMeal.SearchRestaurant.gym'),
            'local',
          );
          setOpen(false);
        }}
      />
      <OutLineButton
        title={t('AddMeal.SearchRestaurant.train')}
        onPress={() => {
          props.handleRestaurantPress(
            t('AddMeal.SearchRestaurant.train'),
            t('AddMeal.SearchRestaurant.train'),
            'local',
          );
          setOpen(false);
        }}
      />
      <OutLineButton
        title={t('AddMeal.SearchRestaurant.toGo')}
        onPress={() => {
          props.handleRestaurantPress(
            t('AddMeal.SearchRestaurant.toGo'),
            t('AddMeal.SearchRestaurant.toGo'),
            'local',
          );
          setOpen(false);
        }}
      />
    </View>
  );
};

export default EmptyPlacesButtons;

const useStyles = makeStyles(theme => ({
  text: { marginTop: theme.spacing.S },
  textContainer: { paddingVertical: theme.spacing.M },
  container: { padding: theme.spacing.S, }
}));
