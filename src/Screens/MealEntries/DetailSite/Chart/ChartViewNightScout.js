import Svg, {Rect} from 'react-native-svg';
import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryScatter,
} from 'victory-native';
import React from 'react';
import moment from 'moment';
import LocalizationContext from '../../../../../LanguageContext';
import {useProfile} from '../../../../hooks/useProfile';
import {analyseTimeInRangeHealthKit} from '../../../../Common/realm/timeInRangeHealthKit';
import {useScreenReader} from '../../../../hooks/useScreenReaderEnabled';
import {analyseTimeInRange} from '../../../../Common/analyseTimeInRange';

function ChartView(props) {
  const {t, locale} = React.useContext(LocalizationContext);
  const {settings} = useProfile();
  const screenReaderEnabled = useScreenReader();

  if (props.loading === false) {
    if (screenReaderEnabled) {
      return (
        <View>
          {props.coordinates.length > 1 ? (
            <>
              <Text style={{padding: 8, fontSize: 18}}>
                {t('Accessibility.MealDetails.values', {
                  values: props.coordinates.length,
                })}{' '}
                {settings.unit === 1 ? 'miligram pro deziliter' : 'mili mol'}
              </Text>
              <Text style={{padding: 8, fontSize: 18}}>
                {analyseTimeInRangeHealthKit(props.coordinates)}{' '}
                {t('Accessibility.MealDetails.percentage')}{' '}
              </Text>

              {props.coordinates
                .filter((data, i) => i % 3 === 0)
                .map((data, i) => (
                  <Text key={i} style={{padding: 8, fontSize: 18}}>
                    {moment(data.x).format('LT')} – {data.y}
                  </Text>
                ))}
            </>
          ) : (
            <Text>{t('Accessibility.Home.dexcom')}</Text>
          )}
        </View>
      );
    } else {
      return (
        <Svg width={Dimensions.get('window').width} height={'300'}>
          <Rect
            x="50"
            y="160"
            width={Dimensions.get('window').width - 75}
            height="70"
            fillOpacity="1"
            fill="#ECFFEC"
          />
          <Rect
            x="50"
            y="160"
            width={Dimensions.get('window').width - 75}
            height="1"
            fillOpacity="0.2"
            fill="#ffd420"
          />
          <Rect
            x="50"
            y="230"
            width={Dimensions.get('window').width - 75}
            height="1"
            fillOpacity="0.2"
            fill="#ac000a"
          />

          <VictoryChart
            standalone={false}
            width={Dimensions.get('window').width + 20}
            minDomain={{y: 50 / settings.unit}}
            scale={{x: 'time'}}
            maxDomain={{y: 300 / settings.unit}}>
            <VictoryAxis
              tickFormat={
                locale === 'de'
                  ? x =>
                      new Date(x).getHours() +
                      ':' +
                      (new Date(x).getMinutes() < 10 ? '0' : '') +
                      new Date(x).getMinutes()
                  : null
              }
            />

            <VictoryAxis dependentAxis tickFormat={y => y} />

            <VictoryGroup>
              <VictoryScatter
                style={{
                  data: {
                    fill: ({datum}) =>
                      datum.y > 160 / settings.unit
                        ? '#ffd420'
                        : datum.y < 70 / settings.unit
                        ? '#ac000a'
                        : '#000',
                  },
                }}
                interpolation="natural"
                data={props.coordinates}
              />
              <VictoryBar
                style={{
                  data: {
                    fill: '#f9de1c',
                    stroke: '#f9de1c',
                    fillOpacity: 0.8,
                    strokeWidth: 0,
                  },
                }}
                size={1.5}
                data={[
                  {
                    x: new Date(moment(props.selectedFood.date).format()),
                    y: 300 / settings.unit,
                  },
                ]}
              />
              <VictoryBar
                style={{
                  data: {
                    fill: '#99E8D7',
                    fillOpacity: 0.7,
                    strokeWidth: 4,
                  },
                }}
                size={2}
                data={props.insulinCoordinates}
              />
              <VictoryBar
                style={{
                  data: {fill: '#37619C', strokeWidth: 1.5},
                }}
                labels={({datum}) =>
                  `${
                    settings.unit === 1
                      ? datum.y - 50
                      : Math.round(
                          (datum.y - 50 / settings.unit) *
                            (300 / settings.unit),
                        )
                  }`
                }
                size={3}
                data={props.carbCoordinates}
              />
            </VictoryGroup>
          </VictoryChart>
        </Svg>
      );
    }
  } else {
    return (
      <ActivityIndicator
        style={{paddingTop: 20, paddingBottom: 20}}
        size="large"
        color="#0000ff"
      />
    );
  }
}

export default ChartView;
