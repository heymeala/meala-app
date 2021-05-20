import React from 'react';
import { View } from 'react-native';
import MealTags from '../../Components/MealTags';
import LocalizationContext from '../../../LanguageContext';

const StatisticScreen = props => {
  const { t } = React.useContext(LocalizationContext);

  return (
    <View>
      <MealTags t={t} />
    </View>
  );
};

export default StatisticScreen;
