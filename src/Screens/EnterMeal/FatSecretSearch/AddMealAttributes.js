import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, SearchBar} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import {searchFood} from '../../../Common/fatsecret/fatsecretApi';
import {GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS} from '@env';

import Modal from 'react-native-modal';
import openLink from '../../../Common/InAppBrowser';
import PredictionCips from './PredictionCips';
import FatSecretNutritionDetails from './FatSecretNutritionDetails';
import FoodSuggestions from './FoodSuggestions';

const AddMealAttributes = props => {
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
      props.predictions.map(data => {
        return {id: data.id, name: data.name, active: false, nutritionData: ''};
      }),
    );
  }, [props.predictions]);

  useEffect(() => {
    setSearch(prevState => props.text);
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

  function handleSearch(text) {
    setSearch(text);
    if (text.length === 0) {
      setNutritionData(false);
      setServingListVisible(false);
      setFoodsData([]);
    }
  }

  function toggleList() {
    return setServingListVisible(prevState => !prevState);
  }

  function startSearch() {
    if (search.length > 2) {
      if (locale === 'de') {
        return fetch(url).then(googleTranslateRes =>
          googleTranslateRes.json().then(data => {
            searchFood(data.data.translations[0].translatedText).then(data => {
              setServingListVisible(false);
              setNutritionData(false);
              setFoodsData(prevState => data);
            });
          }),
        );
      } else {
        return searchFood(search).then(data => {
          setServingListVisible(false);
          setNutritionData(false);
          setFoodsData(prevState => data);
        });
      }
    }
  }

  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef();

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = p => {
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
      onAccessibilityEscape={() => props.modalVisible()}>
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
              onChangeText={text => handleSearch(text)}
              value={search}
              onBlur={() => startSearch()}
            />
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingBottom: 12,
              }}>
              <PredictionCips
                chipsArray={chipsArray}
                setSearch={setSearch}
                setChipSearch={setChipSearch}
              />
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
                      {foodDetailData.servings.serving.serving_description}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text>"no data"</Text>
                )
              ) : isServingListVisible && isNutritionData ? (
                <FatSecretNutritionDetails
                  foodDetailData={foodDetailData}
                  serving={serving}
                />
              ) : (
                <FoodSuggestions
                  foodsData={foodsData}
                  toggleList={toggleList}
                  setFoodDetailData={setFoodDetailData}
                />
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
