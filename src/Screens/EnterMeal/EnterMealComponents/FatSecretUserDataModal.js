import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import Modal from 'react-native-modal';
import LocalizationContext from '../../../../LanguageContext';

const FatSecretUserDataModal = (props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const [scrollOffset, setScrollOffset] = useState(null);
  const scrollViewRef = useRef();
  const {setFatSecretData, fatSecretData} = props;
  const handleOnScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  function toggleCheckFatSecret(id) {
    setFatSecretData((prevState) =>
      prevState.map((data) => {
        if (data.food_entry_id === id) {
          return {...data, checked: !data.checked};
        } else {
          return {...data};
        }
      }),
    );
  }

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={props.visible}
      backdropOpacity={0.3}
      onBackdropPress={() => props.setVisible(false)}
      onSwipeComplete={() => props.setVisible(false)}
      swipeDirection={['down']}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={50} // content height - ScrollView height
      propagateSwipe={true}
      onAccessibilityEscape={() =>  props.setVisible(false)}

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
              {t('AddMeal.fatSecretUserEntries.title')}
            </Text>
            <Text style={{...styles.modalText}}>
              {t('AddMeal.fatSecretUserEntries.description')}
            </Text>
            {fatSecretData &&
              fatSecretData.map((data, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      flex: 1,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{padding: 5, maxWidth: 200}}>
                      <Text>{data.food_entry_name}</Text>

                      <Text>
                        {t('AddMeal.nutritionData.calories')}: {data.calories}
                      </Text>
                      <Text>{data.meal}</Text>
                      <Text>
                        {t('AddMeal.nutritionData.carbohydrate')}:{' '}
                        {data.carbohydrate}
                      </Text>
                    </View>
                    <View>
                      <CheckBox
                        checkedColor="#154d80"
                        iconRight={true}
                        checked={data.checked}
                        onPress={() => {
                          toggleCheckFatSecret(data.food_entry_id);
                        }}
                      />
                    </View>
                  </View>
                );
              })}
            <TouchableOpacity
              accessibilityRole="button"
              style={{
                ...styles.openButton,
                marginTop: 10,
                backgroundColor: '#ffe109',
              }}
              onPress={() => props.setVisible(false)}>
              <Text style={{...styles.textStyle}}>{t('General.close')}</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FatSecretUserDataModal;
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
