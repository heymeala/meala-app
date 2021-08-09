import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Image, ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../../LanguageContext';

const MealNameListItem = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { listInfo, setOpen, handleMealPress } = props;
  const { item, index } = listInfo;
  return (
    <TouchableOpacity
      accessibilityRole={'button'}
      onPress={() => {
        item.type === 'community'
          ? handleMealPress(item.name.trim(), item.id)
          : props.handleInputMealChange(item.name.trim());
        props.setMeals(null);
        setOpen(false);
      }}>
      <ListItem bottomDivider>
        <View>
          {item.imagePath ? (
            <Image source={{ uri: item.imagePath }} style={styles.image} />
          ) : item.type === 'glyx' ? (
            <Icon name={'rise_arrow'} type={'meala'} />
          ) : (
            <Icon
              accessibilityLabel={
                item.type === 'local'
                  ? t('Accessibility.EnterMeal.search')
                  : t('Accessibility.EnterMeal.fatSecret')
              }
              size={14}
              name={item.type === 'local' ? 'eat' : 'server'}
              type={item.type === 'local' ? 'meala' : 'ionicon'}
            />
          )}
          {item.type === 'glyx' ? <Text style={{ fontSize: 10, marginTop: 4 }}>Glyx</Text> : null}

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

          {index === 0 && item.type === 'local' ? (
            <ListItem.Subtitle>{t('AddMeal.MealName.newMealName')}</ListItem.Subtitle>
          ) : item.subtitle && item.subtitle.description ? (
            <ListItem.Subtitle>{item.subtitle.description}</ListItem.Subtitle>
          ) : null}
        </ListItem.Content>
        {index === 0 && item.type === 'local' ? <Icon name={'add-circle'} type={'ionicon'} /> : null}
      </ListItem>
    </TouchableOpacity>
  );
};

export default MealNameListItem;

const useStyles = makeStyles(theme => ({
  image: { width: 80, height: 80, borderRadius: 15 },
}));
