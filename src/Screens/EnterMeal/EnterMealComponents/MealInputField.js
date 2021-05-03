import React, {useState} from 'react';
import {Divider, Input, Text} from 'react-native-elements';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalizationContext from '../../../../LanguageContext';
import AddMealAttributes from '../FatSecretSearch/AddMealAttributes';
import {useScreenReader} from '../../../hooks/useScreenReaderEnabled';

const MealInputField = props => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [visible, setVisible] = useState(false);
  const screenReaderEnabled = useScreenReader();

  function modalVisible() {
    return setVisible(prevState => !prevState);
  }

  function handleSearch(text) {
    props.handleInputMealChange(text);
  }

  const CommunityMeals = () => {
    return props.cMeals.length > 0 ? (
      !props.isLoadingcMeals ? (
        props.cMeals.map(items => (
          <View key={items.meal_id}>
            <TouchableOpacity
              onPress={() => props.handleMealPress(items.meal, items.meal_id)}>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Icon
                  style={{paddingTop: 3}}
                  color="#F9DE1C"
                  name="ios-add"
                  size={20}
                />
                <Text style={{padding: 5}}>{items.meal}</Text>
              </View>
            </TouchableOpacity>
            <Divider />
          </View>
        ))
      ) : (
        <ActivityIndicator />
      )
    ) : null;
  };

  return (
    <View onAccessibilityEscape={Keyboard.dismiss}>
      <Input
        ref={props.MealInput}
        onFocus={props.handleMealInputFocus}
        inputContainerStyle={styles.inputPadding}
        inputStyle={{fontSize: 20}}
        placeholder={t('AddMeal.MealInput')}
        autoCorrect={false}
        renderErrorMessage={!screenReaderEnabled}
        //   accessible={true}
        //  accessibilityLabel={t('Accessibility.EnterMeal.meal')}
        leftIcon={
          !screenReaderEnabled && {
            type: 'ionicon',
            name: 'ios-pizza',
            containerStyle: {paddingRight: 10},
            iconStyle: {color: '#154d80'},
          }
        }
        rightIcon={
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={t('Accessibility.EnterMeal.similarMeals')}
            onPress={() => modalVisible()}>
            <Icon
              reverse
              name="ios-search"
              type="ionicon"
              color="#154d80"
              size={25}
            />
          </TouchableOpacity>
        }
        onChangeText={text => handleSearch(text)}
        value={props.Gericht}
        onBlur={props.handleMealInputBlur}
        errorMessage={props.errorMessage ? props.errorMessage : null}
      />
      <AddMealAttributes
        predictions={props.predictions}
        text={props.Gericht}
        visible={visible}
        modalVisible={modalVisible}
      />

      <View style={{paddingBottom: 10}}>
        {props.mealIsFocused && <CommunityMeals />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  padding: {
    padding: 5,
    fontSize: 18,
    alignItems: 'center',
  },

  inputPadding: {
    borderRadius: 6,
    marginBottom: 10,
    height: 56,
  },
  inputPaddingTextarea: {
    borderRadius: 6,
    marginBottom: 10,
    height: 96,
  },
  bottom: {
    bottom: 35,
    padding: 20,
    color: 'black',
  },
  headerComp: {
    backgroundColor: '#f9de1c',
    height: 10,
    flex: 1,
  },
  leftIconStyle: {},
});

export default MealInputField;
