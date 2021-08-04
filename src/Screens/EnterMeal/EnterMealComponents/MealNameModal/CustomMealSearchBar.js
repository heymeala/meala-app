import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Icon, makeStyles, Text } from 'react-native-elements';
import FadeInView from '../../../../Common/FadeInView';
import LocalizationContext from '../../../../../LanguageContext';
import useAutoFocus from '../../../../hooks/useAutoFocus';
import { database } from '../../../../Common/database_realm';
import { removeDuplicates } from '../../../../utils/removeDuplicates';
import PredictionCips from '../../FatSecretSearch/PredictionCips';
import { translate } from '../../../../Common/translate';
import { searchFood } from '../../../../Common/fatsecret/fatsecretApi';

const CustomMealSearchBar = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { autoFocus, loading, setMeals } = props;
  const inputRef = useRef();
  const [searchText, setSearchText] = useState(null);

  const [chipsArray, setChipsArray] = useState([]);
  const [chipSearch, setChipSearch] = useState('');

  const [fatSecretList, setFatSecretList] = useState([]);
  const [foodDetailData, setFoodDetailData] = useState({
    food_name: null,
    food_id: null,
    servings: { serving: { calcium: 'nodata' } },
  });
  const [isServingListVisible, setServingListVisible] = useState(false);
  const [isNutritionData, setNutritionData] = useState(false);
  const [serving, setServing] = useState(null);

  useEffect(() => {
    setChipsArray(
      props.predictions.map(data => {
        return { id: data.id, name: data.name, active: false, nutritionData: '' };
      }),
    );
  }, [props.predictions]);

  useEffect(() => {
    if (chipSearch.length > 2) {
      startSearch();
    }
  }, [chipSearch]);

  async function startSearch(text) {
    const trimmedText = text.trim()
    if (trimmedText.length > 2) {
      if (locale === 'de') {
        const translatedFoodSearchText = await translate(locale, trimmedText, 'de', 'en');
        return searchFood(translatedFoodSearchText).then(data => {
          //setServingListVisible(false);
          // setNutritionData(false);
          if (data && data.foods && data.foods.food) {
            setFatSecretList(data.foods.food);
            console.log(data.foods.food);
            return data.foods.food;
          }
        });
      } else {
        return searchFood(searchText).then(data => {
          setServingListVisible(false);
          setNutritionData(false);
          setFatSecretList(data);
          if (data && data.foods && data.foods.food) {
            setFatSecretList(data.foods.food);
            return data.foods.food;
          }
        });
      }
    }
  }

  useAutoFocus(autoFocus, inputRef);

  const handleTextChange = async (text, remoteSearch) => {

    const textLength = text && text.length > 0;
    setSearchText(text);
    const localDatabaseMeals = textLength && (await database.fetchMealWithName(text));
    const uniqueLocalMeals = removeDuplicates(localDatabaseMeals);
    const fatSecretMeals = remoteSearch && textLength && (await startSearch(text));

    const createLocalMealNameList =
      uniqueLocalMeals &&
      uniqueLocalMeals.map(item => {
        return {
          id: item.id,
          name: item.food,
          subtitle: '',
          type: item.type || 'local',
        };
      });
    const createFatSecretMealsList =
      fatSecretMeals &&
      fatSecretMeals.map(item => {
        return {
          id: item.food_id,
          name: item.food_name,
          subtitle: {
            brand: item.brand_name !== undefined ? item.brand_name : null,
            description: item.food_description && item.food_description,
          },
          type: 'FatSecret',
        };
      });

    let createMealName = [
      {
        id: text,
        name: text,
        type: 'local',
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
    const mealsList = mergeLists(createMealName, createLocalMealNameList, createFatSecretMealsList);
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
            handleTextChange(searchText, true);
          }}
          returnKeyType={'search'}
          placeholder={t('AddMeal.SearchRestaurant.searchPlaceHolder')}
          returnKeyLabel={t('AddMeal.SearchRestaurant.search')}
          value={searchText}
          onChangeText={text => {
            handleTextChange(text, false);
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
      <View style={styles.chipsContainer}>
        <PredictionCips chipsArray={chipsArray} setSearch={handleTextChange} setChipSearch={setChipSearch} />
      </View>
    </>
  );
};

export default CustomMealSearchBar;

const useStyles = makeStyles(theme => ({
  headline: { margin: theme.spacing.S },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 12 },

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