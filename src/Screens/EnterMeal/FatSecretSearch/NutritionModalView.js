import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, makeStyles, SearchBar} from 'react-native-elements';
import PredictionCips from './PredictionCips';
import FatSecretNutritionDetails from './FatSecretNutritionDetails';
import FoodSuggestions from './FoodSuggestions';
import openLink from '../../../Common/InAppBrowser';
import LocalizationContext from '../../../../LanguageContext';

const NutritionModalView = props => {
  const {
    scrollViewRef,
    handleOnScroll,
    handleSearch,
    search,
    startSearch,
    chipsArray,
    setSearch,
    isServingListVisible,
    setChipSearch,
    isNutritionData,
    foodDetailData,
    setNutritionData,
    setServing,
    serving,
    foodsData,
    toggleList,
    setFoodDetailData,
  } = props;
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}>
          <Text style={styles.title}>
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
          <View style={styles.chipsContainer}>
            <PredictionCips
              chipsArray={chipsArray}
              setSearch={setSearch}
              setChipSearch={setChipSearch}
            />
          </View>
          <View>
            {isServingListVisible && !isNutritionData ? (
              foodDetailData.servings && foodDetailData.servings.length > 0 ? (
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
  );
};

export default NutritionModalView;

const useStyles = makeStyles(theme => ({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 10,
    // height: 400,
    alignItems: 'center',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    padding: 8,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chipsContainer: {flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 12},
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  nutritionTitle: {
    fontWeight: 'bold',
  },
  nutritionData: {},
  nContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
}));
