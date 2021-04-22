import React, {useEffect, useState} from 'react';
import Svg, {Rect} from 'react-native-svg';
import {Dimensions, Text, View} from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryScatter,
} from 'victory-native';
import AppleHealthKit from 'react-native-health';
import moment from 'moment';
import {Image} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import {useProfile} from '../../hooks/useProfile';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import {analyseTimeInRangeHealthKit} from '../../Common/realm/timeInRangeHealthKit';

const ChartViewHealthKit = props => {
  const [HealthKitBloodGlucoseData, setHealthKitBloodGlucoseData] = useState(
    [],
  );
  const {t, locale} = React.useContext(LocalizationContext);
  const {settings} = useProfile();
  const screenReaderEnabled = useScreenReader();
  moment.locale(locale);
  useEffect(() => {

    const permissions = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.BloodGlucose,
          AppleHealthKit.Constants.Permissions.Carbohydrates,
          AppleHealthKit.Constants.Permissions.HeartRate,
        ],
        write: [AppleHealthKit.Constants.Permissions.Steps],
      },
    };
    let fromDate, tillDate;
    tillDate = moment(props.selectedFood.date).add(3, 'hours').toISOString();
    fromDate = moment(props.selectedFood.date)
      .subtract(35, 'minutes')
      .toISOString();

    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      /* Called after we receive a response from the system */

      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }

      /* Can now read or write to HealthKit */
      //   unit: settings.unit === 1 ? 'mgPerdL' : 'mmolPerL', // optional; default 'mmolPerL'

      let options = {
        startDate: fromDate, // required
        endDate: tillDate, // optional; default now
      };

      AppleHealthKit.getHeartRateSamples(options, (callbackError, results) => {
        /* Samples are now collected from HealthKit */
      });
      AppleHealthKit.getBloodGlucoseSamples(
        options,
        (callbackError, results) => {
          /* Samples are now collected from HealthKit */
          if (callbackError) {
            console.log(callbackError);
            return;
          }
          setHealthKitBloodGlucoseData(results);
          console.log(results);
        },
      );
    });
  }, []);

  const healthkitGlucoseDate = HealthKitBloodGlucoseData.map(coordinates => {
    return {
      x: new Date(moment(coordinates.startDate).toISOString()),
      y: coordinates.value / settings.unit,
    };
  });

  if (screenReaderEnabled) {
    return (
      <View>
        {healthkitGlucoseDate.length > 1 ? (
          <>
            <Text style={{padding: 8, fontSize: 18}}>
              {t('Accessibility.MealDetails.values', {
                values: healthkitGlucoseDate.length,
              })}{' '}
              {settings.unit === 1 ? 'miligram pro deziliter' : 'mili mol'}
            </Text>
            <Text style={{padding: 8, fontSize: 18}}>
              {analyseTimeInRangeHealthKit(healthkitGlucoseDate)}{' '}
              {t('Accessibility.MealDetails.percentage')}{' '}
            </Text>

            {healthkitGlucoseDate
              .filter((data, i) => i % 3 === 0)
              .map((data, i) => (
                <Text key={i} style={{padding: 8, fontSize: 18}}>
                  {moment(data.x).format('LT')} – {data.y}
                </Text>
              ))
              .reverse()}
          </>
        ) : (
          <Text>{t('Accessibility.Home.dexcom')}</Text>
        )}
      </View>
    );
  } else {
    if (healthkitGlucoseDate.length > 1) {
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
            scale={{x: 'time', y: 'linear'}}
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
                data={healthkitGlucoseDate}
                domainPadding={{y: 5}}
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
            </VictoryGroup>
          </VictoryChart>
        </Svg>
      );
    } else {
      return (
        <>
          <View>
            <Text style={{padding: 40, color: '#ac000a'}}>
              {t('Entries.notEnoughData')}
            </Text>
            <Image
              source={require('../../assets/meala_graph.png')}
              placeholderStyle={{backgroundColor: '#fff'}}
              style={{width: Dimensions.get('window').width, height: 350}}
            />
          </View>
        </>
      );
    }
  }
};

export default ChartViewHealthKit;
