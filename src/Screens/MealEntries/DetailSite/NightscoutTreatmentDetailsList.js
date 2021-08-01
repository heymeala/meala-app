import React, { useState } from 'react';
import { View } from 'react-native';
import { ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
//todo: Unused component
const NightscoutTreatmentsDetailsList = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { treatments } = props;
  const [expanded, setExpanded] = useState(false);
  const sortedList =
    treatments &&
    treatments.sort((a, b) =>
      a.eventType > b.eventType ? 1 : a.eventType === b.eventType ? (a.timestamp > b.timestamp ? 1 : -1) : -1,
    );
  console.log(sortedList);

  return (
    <>
      <View>
        {sortedList &&
          sortedList.map((item, i) => {
            return (
              <View key={i}>
                <Text>{item.eventType}</Text>
                {item.carbs && <Text>Carbs {item.carbs}</Text>}
                {item.insulin && <Text>Insulin {item.insulin}</Text>}

                <Text>{new Date(item.timestamp).toLocaleTimeString()}</Text>
              </View>
            );
          })}
      </View>
      <Text h2>Correction Bolus</Text>
      {sortedList &&
        sortedList
          .filter(data => data.eventType === 'Correction Bolus')
          .map((item, i) => {
            return (
              <ListItem key={i} bottomDivider containerStyle={{ padding: 5 }}>
                <ListItem.Content>
                  <ListItem.Title>
                    {item.carbs && `Carbs: + ${item.carbs} |`}Insulin: {item.insulin}
                  </ListItem.Title>
                  <ListItem.Subtitle>{new Date(item.timestamp).toLocaleTimeString()}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}
    </>
  );
};

export default NightscoutTreatmentsDetailsList;

const useStyles = makeStyles(theme => ({}));
