import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Icon, makeStyles, Text } from 'react-native-elements';
import FadeInView from '../../../../Common/FadeInView';
import LocalizationContext from '../../../../../LanguageContext';
import useAutoFocus from '../../../../hooks/useAutoFocus';
import { database } from '../../../../Common/database_realm';
import { removeDuplicates } from '../../../../utils/removeDuplicates';

const CustomMealSearchBar = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { autoFocus, loading, setMeals } = props;
  const inputRef = useRef();
  const [searchText, setSearchText] = useState(null);

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

  return (
    <>
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
    </>
  );
};

export default CustomMealSearchBar;

const useStyles = makeStyles(theme => ({
  headline: { margin: theme.spacing.S },

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
}));
