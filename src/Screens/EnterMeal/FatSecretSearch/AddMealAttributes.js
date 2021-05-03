import React, {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import LocalizationContext from '../../../../LanguageContext';
import {searchFood} from '../../../Common/fatsecret/fatsecretApi';
import {GOOGLE_API_KEY_ANDROID, GOOGLE_API_KEY_IOS} from '@env';
import Modal from 'react-native-modal';

import NutritionModalView from './NutritionModalView';

const AddMealAttributes = props => {
  const {locale} = React.useContext(LocalizationContext);
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
      <NutritionModalView
        scrollViewRef={scrollViewRef}
        handleOnScroll={handleOnScroll}
        handleSearch={handleSearch}
        search={search}
        startSearch={startSearch}
        chipsArray={chipsArray}
        setSearch={setSearch}
        isServingListVisible={isServingListVisible}
        setChipSearch={setChipSearch}
        isNutritionData={isNutritionData}
        foodDetailData={foodDetailData}
        setNutritionData={setNutritionData}
        setServing={setServing}
        serving={serving}
        foodsData={foodsData}
        toggleList={toggleList}
        setFoodDetailData={setFoodDetailData}
        modalVisible={props.modalVisible}
      />
    </Modal>
  );
};

export default AddMealAttributes;
