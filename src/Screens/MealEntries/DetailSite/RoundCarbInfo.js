import React from 'react';
import { View } from 'react-native';
import { makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import { useScreenReader } from '../../../hooks/useScreenReaderEnabled';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RoundCarbInfo = props => {
  const { t } = React.useContext(LocalizationContext);

  const styles = useStyles();
  const { value, unit, infoText } = props;

  return (
    <View style={styles.carbContainer}>
      <Text style={{ textAlign: 'center', fontSize: 17, color: '#37619C' }}>
        {value} {unit}
      </Text>
      <Text style={{ textAlign: 'center', fontSize: 10, color: '#37619C' }}>{infoText}</Text>
      <View style={{ left: 60, top: -0, position: 'absolute' }}>
        <View style={styles.carbIconContainer}>
          <FontAwesome5 name={props.icon} size={17} color="#fff" />
        </View>
      </View>
    </View>
  );
};

export default RoundCarbInfo;

const useStyles = makeStyles(theme => ({
  carbContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#37619C',
    justifyContent: 'center',
    borderRadius: 42.5,
    height: 85,
    width: 85,
    flexDirection: 'column',
  },
  carbIconContainer: {
    backgroundColor: '#37619C',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,
  },
}));
