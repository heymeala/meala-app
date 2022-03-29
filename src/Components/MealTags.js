import { Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { database } from '../Common/realm/database';
import { makeStyles } from 'react-native-elements';
import { spacing } from '../theme/styles';

var _ = require('lodash');

const MealTags = props => {
  const [tags, setTags] = useState(undefined);
  const styles = useStyles();

  useEffect(() => {
    let isMounted = true;
    database.getTags().then(items => {
      if (isMounted) {
        setTags(items);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const tagArray = tags
    ? tags.map(items => {
        return { tag: items.tagEn };
      })
    : null;

  const result = _(tagArray)
    .groupBy('tag')
    .map((items, name) => ({ name, count: items.length }))
    .sortBy('count')
    .reverse()
    .take(8)
    .value();

  if (tags !== undefined) {
    return (
      <View
        style={{
          paddingTop: 30,
          alignItems: 'center',
        }}>
        <Text style={{ padding: 15 }}>{props.t('AddMeal.tags')}</Text>
        {result.map((items, i) => (
          <View key={i} style={styles.container}>
            <Text style={styles.text}>
              {items.count} x {items.name}
            </Text>
          </View>
        ))}
      </View>
    );
  } else
    return (
      <View
        style={{
          paddingTop: 30,
          alignItems: 'center',
        }}>
        <Text style={{ padding: 15 }}>{props.t('Statistics.noData')}</Text>
      </View>
    );
};

export default MealTags;

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#dadad2',
    padding: spacing.XS,
    margin: spacing.XS,
    borderRadius: 15,
    width: 170,
  },
  text: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    paddingBottom: 2,
    color: theme.colors.black,
    fontSize: 15,
    textAlign: 'center',
  },
}));
