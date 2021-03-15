import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, SearchBar} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {getFood, searchFood} from '../../Common/fatsecret/fatsecretApi';
import NutritionDetails from './EnterMealComponents/nutritionDetails';
import {GOOGLE_API_KEY_IOS, GOOGLE_API_KEY_ANDROID} from '@env';

import Modal from 'react-native-modal';
import openLink from '../../Common/InAppBrowser';

const AddMealAttributes = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [search, setSearch] = useState(props.text || '');
  const [chipsArray, setChipsArray] = useState([]);
  const [foodsData, setFoodsData] = useState([]);
  const [foodDetailData, setFoodDetailData] = useState({
    food_name: null,
    food_id: null,
    servings: {serving: {calcium: 'nodatas'}},
  });
  const [isServingListVisible, setServingListVisible] = useState(false);
  const [isNutritionData, setNutritionData] = useState(false);
  const [serving, setServing] = useState(null);
  const windowWidth = Dimensions.get('window').width;
  const apiKey =
    Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

  const [chipSearch, setChipSearch] = useState('');
  let url = 'https://translation.googleapis.com/language/translate/v2';
  url += '?q=' + search;
  url += '&target=en';
  url += '&source=de';
  url += '&key=' + apiKey;
  useEffect(() => {
    setChipsArray(
      props.predictions.map((data) => {
        return {id: data.id, name: data.name, active: false, nutritionData: ''};
      }),
    );
  }, [props.predictions]);
  useEffect(() => {
    setSearch((prevState) => props.text);
    if (props.visible) {
      startSearch(props.text);
    }
  }, [props.text]);

  useEffect(() => {
    if (props.visible && props.text.length > 2) {
      startSearch();
    }
  }, [props.visible]);

  useEffect(() => {
    if (chipSearch.length > 2) {
      startSearch();
    }
  }, [chipSearch]);

  //todo: unused?
  function activateChip(id, name) {
    searchFood(name)
      .then((foodList) => {
        getFood(foodList.foods.food[0].food_id).then((foodIdData) => {
          const testArray =
            foodIdData.food.servings.serving.length > 0
              ? foodIdData.food.servings.serving[0].carbohydrate
              : foodIdData.food.servings.serving
              ? foodIdData.food.servings.serving.carbohydrate
              : 'no data';

          setChipsArray((prevState) =>
            prevState.map((data) => {
              const foodDesc = foodIdData.food.food_name + ' ' + testArray;
              const active = data.id === id ? !data.active : data.active;
              const nutritionText =
                data.id === id ? foodDesc : data.nutritionData;
              return {
                id: data.id,
                name: data.name,
                active: active,
                nutritionData: nutritionText,
              };
            }),
          );
        });
      })
      .catch((err) => console.log('no data' + err));
  }

  function handleSearch(text) {
    setSearch(text);
    if (text.length === 0) {
      setNutritionData(false);
      setServingListVisible(false);
      setFoodsData([]);
    }
  }

  const PredictionsChips = () => {
    return chipsArray.map((data) => {
      return (
        <View
          key={data.id}
          style={{
            padding: 4,
            marginHorizontal: 2,
            borderRadius: 15,
            backgroundColor: data.active ? '#ffe109' : '#e5e5e5',
          }}>
          <TouchableOpacity
            onPress={() => {
              setSearch(data.name);
              setChipSearch(data.name);
            }}>
            <Text style={{borderRadius: 15}}>{` ${data.name} ${
              data.active ? data.nutritionData + 'g Carbs' : ''
            } `}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  function toggleList() {
    return setServingListVisible((prevState) => !prevState);
  }

  const FoodSuggestions = () => {
    return foodsData.foods ? (
      foodsData.foods.food ? (
        foodsData.foods.food.length > 0 ? (
          foodsData.foods.food.map((data) => {
            return (
              <TouchableOpacity
                style={{padding: 8}}
                key={data.food_id}
                onPress={() =>
                  getFood(data.food_id).then((data) => {
                    console.log(data);
                    const servings = data.food.servings;
                    const newArray = {
                      food_name: data.food.food_name,
                      food_id: data.food.food_id,
                      servings: Array.isArray(servings.serving)
                        ? servings.serving.map((servings) => {
                            return {
                              serving: {
                                calcium: servings.calcium
                                  ? servings.calcium
                                  : 'no aarray data',
                                serving_description: servings.serving_description
                                  ? servings.serving_description
                                  : t('AddMeal.nutritionData.nodata'),
                                carbohydrate: servings.carbohydrate
                                  ? servings.carbohydrate
                                  : t('AddMeal.nutritionData.nodata'),
                                cholesterol: servings.cholesterol
                                  ? servings.cholesterol
                                  : t('AddMeal.nutritionData.nodata'),
                                fat: servings.fat
                                  ? servings.fat
                                  : t('AddMeal.nutritionData.nodata'),
                                fiber: servings.fiber
                                  ? servings.fiber
                                  : t('AddMeal.nutritionData.nodata'),
                                iron: servings.iron
                                  ? servings.iron
                                  : t('AddMeal.nutritionData.nodata'),
                                measurement_description: servings.measurement_description
                                  ? servings.measurement_description
                                  : t('AddMeal.nutritionData.nodata'),
                                metric_serving_amount: servings.metric_serving_amount
                                  ? servings.metric_serving_amount
                                  : t('AddMeal.nutritionData.nodata'),
                                metric_serving_unit: servings.metric_serving_unit
                                  ? servings.metric_serving_unit
                                  : t('AddMeal.nutritionData.nodata'),
                                number_of_units: servings.number_of_units
                                  ? servings.number_of_units
                                  : t('AddMeal.nutritionData.nodata'),
                                protein: servings.protein
                                  ? servings.protein
                                  : t('AddMeal.nutritionData.nodata'),
                                sugar: servings.sugar
                                  ? servings.sugar
                                  : t('AddMeal.nutritionData.nodata'),
                              },
                            };
                          })
                        : data.food.servings.serving
                        ? [
                            {
                              serving: {
                                calcium: data.food.servings.serving.calcium
                                  ? data.food.servings.serving.calcium
                                  : t('AddMeal.nutritionData.nodata'),
                                serving_description: data.food.servings.serving
                                  .serving_description
                                  ? data.food.servings.serving
                                      .serving_description
                                  : t('AddMeal.nutritionData.nodata'),
                                carbohydrate: data.food.servings.serving
                                  .carbohydrate
                                  ? data.food.servings.serving.carbohydrate
                                  : t('AddMeal.nutritionData.nodata'),
                                cholesterol: data.food.servings.serving
                                  .cholesterol
                                  ? data.food.servings.serving.cholesterol
                                  : t('AddMeal.nutritionData.nodata'),
                                fat: data.food.servings.serving.fat
                                  ? data.food.servings.serving.fat
                                  : t('AddMeal.nutritionData.nodata'),
                                fiber: data.food.servings.serving.fiber
                                  ? data.food.servings.serving.fiber
                                  : t('AddMeal.nutritionData.nodata'),
                                iron: data.food.servings.serving.iron
                                  ? data.food.servings.serving.iron
                                  : t('AddMeal.nutritionData.nodata'),
                                measurement_description: data.food.servings
                                  .serving.measurement_description
                                  ? data.food.servings.serving
                                      .measurement_description
                                  : t('AddMeal.nutritionData.nodata'),
                                metric_serving_amount: data.food.servings
                                  .serving.metric_serving_amount
                                  ? data.food.servings.serving
                                      .metric_serving_amount
                                  : t('AddMeal.nutritionData.nodata'),
                                metric_serving_unit: data.food.servings.serving
                                  .metric_serving_unit
                                  ? data.food.servings.serving
                                      .metric_serving_unit
                                  : t('AddMeal.nutritionData.nodata'),
                                number_of_units: data.food.servings.serving
                                  .number_of_units
                                  ? data.food.servings.serving.number_of_units
                                  : t('AddMeal.nutritionData.nodata'),
                                protein: data.food.servings.serving.protein
                                  ? data.food.servings.serving.protein
                                  : t('AddMeal.nutritionData.nodata'),
                                sugar: data.food.servings.serving.sugar
                                  ? data.food.servings.serving.sugar
                                  : t('AddMeal.nutritionData.nodata'),
                              },
                            },
                          ]
                        : {
                            serving: {
                              calcium: t('AddMeal.nutritionData.nodata'),
                              serving_description: t(
                                'AddMeal.nutritionData.nodata',
                              ),
                              carbohydrate: t('AddMeal.nutritionData.nodata'),
                              cholesterol: t('AddMeal.nutritionData.nodata'),
                              fat: t('AddMeal.nutritionData.nodata'),
                              fiber: t('AddMeal.nutritionData.nodata'),
                              iron: t('AddMeal.nutritionData.nodata'),
                              measurement_description: t(
                                'AddMeal.nutritionData.nodata',
                              ),
                              metric_serving_amount: t(
                                'AddMeal.nutritionData.nodata',
                              ),
                              metric_serving_unit: t(
                                'AddMeal.nutritionData.nodata',
                              ),
                              number_of_units: t(
                                'AddMeal.nutritionData.nodata',
                              ),
                              protein: t('AddMeal.nutritionData.nodata'),
                              sugar: t('AddMeal.nutritionData.nodata'),
                            },
                          },
                    };
                    setFoodDetailData((prevState) => newArray);
                    toggleList();
                  })
                }>
                <View style={{paddingBottom: 5}}>
                  <Text style={{fontWeight: 'bold'}}>
                    {data.food_name}
                    {data.brand_name && ' – ' + data.brand_name}
                  </Text>
                  <Text>{data.food_description}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : null
      ) : foodsData.foods.total_results === '0' ? (
        <Text>{t('AddMeal.foodDataBaseSearch.noResults')}</Text>
      ) : null
    ) : null;
  };

  function startSearch() {
    if (search.length > 2) {
      if (locale === 'de') {
        return fetch(url).then((googleTranslateRes) =>
          googleTranslateRes.json().then((googleTranslateRes) => {
            searchFood(
              googleTranslateRes.data.translations[0].translatedText,
            ).then((data) => {
              setServingListVisible(false);
              setNutritionData(false);
              setFoodsData((prevState) => data);
            });
          }),
        );
      } else {
        return searchFood(search).then((data) => {
          setServingListVisible(false);
          setNutritionData(false);
          setFoodsData((prevState) => data);
        });
      }
    }
  }

  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef();

  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.visible}
      backdropOpacity={0.3}
      onBackdropPress={() => props.modalVisible()}
      onSwipeComplete={() => props.modalVisible()}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={50} // content height - ScrollView height
      propagateSwipe={true}
      onAccessibilityEscape={() => props.modalVisible()}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleOnScroll}
            scrollEventThrottle={16}>
            <Text
              style={{
                ...styles.modalText,
                fontWeight: 'bold',
                fontSize: 16,
                marginTop: 10,
              }}>
              {t('AddMeal.foodDataBaseSearch.title')}
            </Text>
            <Text style={{...styles.modalText}}>
              {t('AddMeal.foodDataBaseSearch.subtitle')}
            </Text>

            <SearchBar
              platform={Platform.OS}
              placeholder={t('AddMeal.foodDataBaseSearch.searchPlaceholder')}
              onChangeText={(text) => handleSearch(text)}
              value={search}
              onBlur={() => startSearch()}
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 12,
              }}>
              <PredictionsChips />
            </View>

            <View>
              {isServingListVisible && !isNutritionData ? (
                foodDetailData.servings &&
                foodDetailData.servings.length > 0 ? (
                  foodDetailData.servings.map((data, i) => (
                    <TouchableOpacity
                      style={{padding: 8}}
                      key={i}
                      onPress={() => {
                        setNutritionData(true);
                        setServing(i);
                      }}>
                      <Text> {data.serving.serving_description}</Text>
                    </TouchableOpacity>
                  ))
                ) : foodDetailData.servings.serving ? (
                  <TouchableOpacity onPress={() => setNutritionData(true)}>
                    <Text style={{padding: 8}}>
                      {' '}
                      {foodDetailData.servings.serving.serving_description}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text>"no data"</Text>
                )
              ) : isServingListVisible && isNutritionData ? (
                <View style={{width: windowWidth - 150}}>
                  <Text style={{paddingBottom: 8}}>
                    {foodDetailData.food_name} -{' '}
                    {
                      foodDetailData.servings[serving].serving
                        .serving_description
                    }
                  </Text>
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving
                        .metric_serving_amount
                    }
                    unit={
                      foodDetailData.servings[serving].serving
                        .metric_serving_unit
                    }
                    title={t('AddMeal.nutritionData.serving')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.carbohydrate
                    }
                    title={t('AddMeal.nutritionData.carbohydrate')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.fat
                    }
                    title={t('AddMeal.nutritionData.fat')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.protein
                    }
                    title={t('AddMeal.nutritionData.protein')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.sugar
                    }
                    title={t('AddMeal.nutritionData.sugar')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.calcium
                    }
                    title={t('AddMeal.nutritionData.calcium')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.cholesterol
                    }
                    title={t('AddMeal.nutritionData.cholesterol')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.fiber
                    }
                    title={t('AddMeal.nutritionData.fiber')}
                  />
                  <NutritionDetails
                    foodDetailData={
                      foodDetailData.servings[serving].serving.iron
                    }
                    title={t('AddMeal.nutritionData.iron')}
                  />
                </View>
              ) : (
                <FoodSuggestions />
              )}

              <TouchableOpacity
                accessibilityLabel={t('Accessibility.EnterMeal.fatsecret')}
                style={{padding: 12}}
                onPress={() => openLink('https://fatsecret.com')}>
                <Image
                  style={{width: 120, height: 17}}
                  source={{
                    uri:
                      'https://platform.fatsecret.com/api/static/images/powered_by_fatsecret.png',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              style={{
                ...styles.openButton,
                marginTop: 10,
                backgroundColor: '#ffe109',
              }}
              onPress={() => props.modalVisible()}>
              <Text style={{...styles.textStyle}}>{t('General.close')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddMealAttributes;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 10,

    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    // height: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#ffe109',
    borderRadius: 20,
    padding: 8,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  nutritionTitle: {
    fontWeight: 'bold',
  },
  nutritionData: {},
  nContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
