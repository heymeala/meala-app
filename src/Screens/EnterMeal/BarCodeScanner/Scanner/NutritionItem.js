import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

const NutritionItem = (props) => {
  const {data, nutrition, text, unit} = props;

  return data.nutriments ? (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
      }}>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View>
        <Text style={styles.mainText}>
          {nutrition ?? nutrition}
          {unit && unit}
        </Text>
      </View>
    </View>
  ) : null;
};

export default NutritionItem;

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 16,
  },
  mainText: {
    color: '#000',
    fontSize: 16,

    fontWeight: 'bold',
  },
});
