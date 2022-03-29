import React, { useEffect, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { Button, Icon, makeStyles, Text } from 'react-native-elements';
import FadeInView from '../../../../Common/FadeInView';
import LocalizationContext from '../../../../../LanguageContext';
import useAutoFocus from '../../../../hooks/useAutoFocus';
import { database } from '../../../../Common/realm/database';
import { removeDuplicates } from '../../../../utils/removeDuplicates';
import PredictionCips from '../../FatSecretSearch/PredictionCips';
import { translate } from '../../../../Common/translate';
import { searchFood } from '../../../../Common/fatsecret/fatsecretApi';
import GItwo from '../../../../Common/gi';
import uuid from 'react-native-uuid';

const CustomMealSearchBar = props => {
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { autoFocus, loading, setMeals, setLoading, communityMeals } = props;
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
    if (chipSearch.length > 1) {
      startSearch(chipSearch);
    }
  }, [chipSearch]);

  useEffect(() => {
    if (communityMeals && communityMeals.length > 0) {
      handleTextChange('');
    }
  }, []);

  async function startSearch(text) {
    const trimmedText = text.trim();
    if (trimmedText.length > 2) {
      setLoading(true);
      if (locale === 'de') {
        const translatedFoodSearchText = await translate(locale, trimmedText, 'de', 'en');
        return searchFood(translatedFoodSearchText)
          .then(data => {
            //setServingListVisible(false);
            // setNutritionData(false);
            if (data && data.foods && data.foods.food) {
              setFatSecretList(data.foods.food);
              setLoading(false);
              return data.foods.food;
            } else {
              setLoading(false);
            }
          })
          .catch(er => {
            console.log(er);
            setLoading(false);
          });
      } else {
        return searchFood(searchText)
          .then(data => {
            setServingListVisible(false);
            setNutritionData(false);
            setFatSecretList(data);
            if (data && data.foods && data.foods.food) {
              setFatSecretList(data.foods.food);
              setLoading(false);

              return data.foods.food;
            } else {
              setLoading(false);
            }
          })
          .catch(er => {
            console.log(er);
            setLoading(false);
          });
      }
    }
  }

  useAutoFocus(autoFocus, inputRef);

  const searchFilterFunction = text => {
    if (text.length >= 2) {
      const newData = GItwo.filter(item => {
        const itemData = `${item[locale].toUpperCase()}`;
        const textData = text.toUpperCase();
        if (itemData.includes(textData)) {
          return item;
        }
      });
      const filteredData = newData.slice(0, 2);
      return filteredData;
    }
  };

  const handleTextChange = async (text, remoteSearch) => {
    const textLength = text && text.length > 0;
    if (textLength || communityMeals) {
      setSearchText(text);
      const localDatabaseMeals = await database.fetchMealWithName(text);
      const uniqueLocalMeals = removeDuplicates(localDatabaseMeals);
      const fatSecretMeals = remoteSearch && (await startSearch(text));
      const communityMealsList =
        communityMeals &&
        communityMeals
          .filter(item => item.meal.includes(text))
          .map(item => {
            return {
              id: item.meal_id,
              name: item.meal,
              imagePath: item.image_path,
              subtitle: {
                brand: null,
                description: item.carbs ? t('AddMeal.MealName.userCarbGuess', { carbs: item.carbs }) : null,
              },
              type: 'community',
            };
          });
      const createLocalMealNameList =
        uniqueLocalMeals &&
        uniqueLocalMeals.map(item => {
          return {
            id: item.id,
            name: item.food,
            subtitle: null,
            type: item.type || 'local',
          };
        });
      const createFatSecretMealsList = fatSecretMeals
        ? fatSecretMeals.map(item => {
            return {
              id: item.food_id,
              name: item.food_name,
              subtitle: {
                brand: item.brand_name !== undefined ? item.brand_name : null,
                description: item.food_description && item.food_description,
              },
              type: 'FatSecret',
            };
          })
        : null;
      const glyx = searchFilterFunction(text);
      let glyxList =
        glyx &&
        glyx.map(item => {
          return {
            id: uuid.v4(),
            name: item[locale],
            subtitle: {
              brand: null,
              description: t('AddMeal.MealName.glyx') + item.GI,
            },
            type: 'glyx',
          };
        });
      let createMealName = [
        {
          id: text,
          name: text,
          type: 'local',
        },
      ];

      const ownMealsDivider = [
        {
          id: 'ownMealDivider',
          name: 'Eigene Mahlzeiten',
          type: 'divider',
        },
      ];
      const CommunityMealDivider = [
        {
          id: 'communityMealDivider',
          name: 'Meal entries from the Community',
          type: 'divider',
        },
      ];

      const mergeLists = (newName, glyxList, localList, fatSecretDataList, communityMealsList) => {
        return [
          ...(textLength ? newName || [] : []),
          ...(communityMealsList || []),
          ...(communityMealsList === null || communityMealsList.length === 0 ? localList || [] : []),
          ...(glyxList || []),
          ...(fatSecretDataList || []),
        ];
      };

      const mealsList = mergeLists(
        createMealName,
        glyxList,
        createLocalMealNameList,
        createFatSecretMealsList,
        communityMealsList,
      );

      console.log('list', mealsList);
      setMeals(mealsList);
    } else {
      setMeals(null);
      setSearchText(null);
    }
  };

  return (
    <>
      <Text h2 style={styles.headline}>
        {t('AddMeal.MealName.name')}
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
          placeholder={t('AddMeal.MealName.name')}
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
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', padding: theme.spacing.S },

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
