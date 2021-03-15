import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {database} from '../Common/database_realm';

var _ = require('lodash');

export const MealTags = (props) => {
  const [tags, setTags] = useState(undefined);

  useEffect(() => {
    database.getTags().then((items) => setTags(items));
  });

  const tagArray = tags
    ? tags.map((items) => {
        return {tag: items.tagEn};
      })
    : null;

  const result = _(tagArray)
    .groupBy('tag')
    .map((items, name) => ({name, count: items.length}))
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
        <Text style={{padding: 15}}>{props.t('AddMeal.tags')}</Text>
        {result.map((items, i) => (
          <View
              key={i}
            style={{
              backgroundColor: '#dadad2',
              padding: 3,
              margin: 5,
              borderRadius: 15,
              width: 170,
            }}>
            <Text
              style={{
                paddingLeft: 6,
                paddingRight: 6,
                paddingTop: 2,
                paddingBottom: 2,
                color: 'black',
                fontSize: 15,
                textAlign: 'center',
              }}>
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
        <Text style={{padding: 15}}>{props.t('Statistics.noData')}</Text>
      </View>
    );
};
