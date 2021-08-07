import { Image, TouchableOpacity, View } from 'react-native';
import { Icon, makeStyles, Text } from 'react-native-elements';
import React from 'react';
import LocalizationContext from '../../../../LanguageContext';

export default function EnterMealButton(props) {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        accessible={true}
        accessibilityLabel={t('Accessibility.EnterMeal.camera') + props.name}
        accessibilityRole={'button'}
        style={[styles.avatarSmall, styles.avatarContainer, { marginBottom: 20 }]}>
        {props.avatarSource === undefined ? (
          <>
            <Icon name={props.icon} color={'#fff'} type="ionicon" size={35} />
            <Text style={styles.text}>{props.name}</Text>
          </>
        ) : (
          <Image style={styles.avatarSmall} source={props.avatarSource} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 11,
  },
  avatarContainer: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarSmall: {
    borderRadius: 45,
    width: 90,
    height: 90,
  },
}));
