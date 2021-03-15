import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';

export default function EnterMealButton(props) {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        accessible={true}
        accessibilityLabel={t('Accessibility.EnterMeal.camera') + props.name}
        accessibilityRole={'button'}
        style={[
          stylesImagePicker.avatarSmall,
          stylesImagePicker.avatarContainer,
          {marginBottom: 20},
        ]}>
        {props.avatarSource === undefined ? (
          <>
            <Icon name={props.icon} color={'#fff'} type="ionicon" size={35} />
            <Text
              style={{
                color: '#fff',
                textAlign: 'center',
              }}>
              {props.name}
            </Text>
          </>
        ) : (
          <Image
            style={stylesImagePicker.avatarSmall}
            source={props.avatarSource}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const stylesImagePicker = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: '#154d80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  avatarSmall: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});
