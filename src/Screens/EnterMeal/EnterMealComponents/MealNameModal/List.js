import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../../LanguageContext';

const MealNameListItem = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { listInfo, setOpen, handleInputMealChange } = props;
  const { item, index } = listInfo;
  return (
    <TouchableOpacity
      accessibilityRole={'button'}
      onPress={() => {
        handleInputMealChange(item.name.trim());
        setOpen(false);
      }}>
      <ListItem bottomDivider>
        <View>
          <Icon
            accessibilityLabel={
              item.type === 'local'
                ? t('Accessibility.EnterMeal.search')
                : t('Accessibility.EnterMeal.googlePlace')
            }
            size={14}
            name={item.type === 'local' ? 'eat' : 'server'}
            type={item.type === 'local' ? 'meala' : 'ionicon'}
          />
          {item.rating ? (
            <Text
              accessibilityLabel={item.rating + t('Accessibility.EnterMeal.rating')}
              style={{ fontSize: 10 }}>
              {item.rating}
            </Text>
          ) : null}
        </View>
        <ListItem.Content>
          <ListItem.Title h4>
            {item.name} {item.subtitle && item.subtitle.brand ? ' – ' + item.subtitle.brand : null}
          </ListItem.Title>
          <ListItem.Subtitle>
            {index === 0
              ? t('AddMeal.SearchRestaurant.newPlace')
              : item.subtitle && item.subtitle.description}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Icon name={'add-circle'} type={'ionicon'} />
      </ListItem>
    </TouchableOpacity>
  );
};

export default MealNameListItem;

const useStyles = makeStyles(theme => ({}));
