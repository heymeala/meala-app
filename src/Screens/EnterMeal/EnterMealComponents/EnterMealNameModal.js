import React, { useRef, useState } from 'react';
import { FlatList, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import EditIcon from './EditIcon';
import Modal from 'react-native-modal';
import FadeInView from '../../../Common/FadeInView';
import OutLineButton from '../../../Common/OutLineButton';
import useAutoFocus from '../../../hooks/useAutoFocus';
import LocalizationContext from '../../../../LanguageContext';
import IconView from './IconView';
import { database } from '../../../Common/database_realm';
import EmptyPlacesButtons from './EmptyPlacesButtons';
import LoadingSpinner from '../../../Common/LoadingSpinner';
import { removeDuplicates } from '../../../utils/removeDuplicates';
import PoweredByFatSecret from "../../../Common/fatsecret/PoweredByFatSecret";

const EnterMealNameModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const [autoFocus, setAutoFocus] = useState(false);
  const [meals, setMeals] = useState(null);
  useAutoFocus(autoFocus, inputRef);

  const handleTextChange = async text => {
    setSearchText(text);
    const localDatabaseMeals = await database.fetchMealWithName(text);
    const uniqueLocalMeals = removeDuplicates(localDatabaseMeals);
    const fatSecretMeals = null;
    const createLocalMealNameList =
      uniqueLocalMeals &&
      uniqueLocalMeals.map(item => {
        return {
          id: item.id,
          name: item.food,
          type: item.type || 'local',
        };
      });
    const createFatSecretMealsList =
      fatSecretMeals &&
      fatSecretMeals.map(item => {
        return {
          id: item.place_id,
          name: item.name,
          type: 'GOOGLE',
        };
      });

    let createRestaurant = [
      {
        id: text,
        name: text,
        type: 'local',
        lat: props.lat,
        lng: props.lng,
        address: '',
        rating: '',
      },
    ];

    const mergeLists = (newName, localList, fatSecretList) => {
      if (localList && fatSecretList) {
        return [...newName, ...localList, ...fatSecretList];
      } else if (localList) {
        return [...newName, ...localList];
      } else if (fatSecretList) {
        return [...newName, ...fatSecretList];
      } else if (text && text.length > 0) {
        return [...newName];
      }
    };
    const mealsList = mergeLists(createRestaurant, createLocalMealNameList, createFatSecretMealsList);
    console.log('list', mealsList);
    setMeals(mealsList);
  };

  const FlatListItem = ({ item, index }) => (
    <TouchableOpacity
      accessibilityRole={'button'}
      onPress={() => {
        props.handleInputMealChange(item.name);
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
            name={item.type === 'local' ? 'eat' : 'logo-google'}
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
          <ListItem.Title h4>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{index === 0 ? t('AddMeal.SearchRestaurant.newPlace') : null}</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name={'add-circle'} type={'ionicon'} />
      </ListItem>
    </TouchableOpacity>
  );
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      <TouchableOpacity
        accessibilityRole={'button'}
        onPress={() => {
          setOpen(true);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}>
          <IconView iconName={'eat'} iconType={'meala'} size={35} />

          <View style={{ flexShrink: 1, paddingLeft: 24, width: '100%' }}>
            <Text style={{ textAlign: 'left', fontFamily: 'SecularOne-Regular' }}>
              {t('AddMeal.MealName.name')}
            </Text>
            <Text>{props.mealName}</Text>
          </View>
          <EditIcon />
        </View>
      </TouchableOpacity>

      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={open}
        backdropOpacity={0.3}
        onModalShow={() => setAutoFocus(true)}
        onModalHide={() => setAutoFocus(false)}
        onBackdropPress={() => setOpen(false)}
        style={styles.modal}
        onAccessibilityEscape={() => setOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text h2 style={styles.headline}>
              {t('AddMeal.SearchRestaurant.where')}
            </Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                textContentType={'location'}
                ref={inputRef}
                clearButtonMode={'unless-editing'}
                style={styles.input}
                onBlur={() => {
                  handleTextChange(searchText);
                }}
                returnKeyType={'search'}
                placeholder={t('AddMeal.SearchRestaurant.searchPlaceHolder')}
                returnKeyLabel={t('AddMeal.SearchRestaurant.search')}
                value={searchText}
                onChangeText={text => {
                  handleTextChange(text);
                }}
              />
              <View style={styles.searchIcon}>
                {searchText && searchText.length > 0 ? (
                  <FadeInView>
                    <Button
                      accessibilityLabel={t('Accessibility.EnterMeal.search')}
                      loading={loading}
                      onPress={() => inputRef.current.blur()}
                      containerStyle={{ borderRadius: 50 }}
                      icon={<Icon size={14} name={'search'} />}
                    />
                  </FadeInView>
                ) : null}
              </View>
            </View>
            <FlatList
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <EmptyPlacesButtons handleRestaurantPress={props.handleRestaurantPress} setOpen={setOpen} />
              }
              ListFooterComponent={
                loading ? (
                  <LoadingSpinner />
                ) : meals && meals.length > 1 ? (
                <PoweredByFatSecret/>
                ) : null
              }
              keyExtractor={keyExtractor}
              data={meals}
              renderItem={FlatListItem}
            />
            <OutLineButton type={'clear'} title={t('General.close')} onPress={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default EnterMealNameModal;

const useStyles = makeStyles(theme => ({
  headline: { margin: theme.spacing.S },

  modal: { marginHorizontal: 4 },
  searchInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    marginLeft: 20,
    flex: 1,
  },
  searchIcon: { margin: 10, height: 30 },
  centeredView: {
    //flex: 1,
    // height:300,
    justifyContent: 'center',
  },
  modalView: {
    margin: theme.spacing.S,
    backgroundColor: 'white',
    height: '95%',
    borderRadius: 20,
    padding: theme.spacing.S,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}));
