import Svg, { G, Rect } from 'react-native-svg';
import { Dimensions, Text, View } from 'react-native';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryGroup, VictoryScatter } from 'victory-native';
import React from 'react';
import moment from 'moment';
import LocalizationContext from '../../../../../LanguageContext';
import { useProfile } from '../../../../hooks/useProfile';
import { analyseTimeInRangeHealthKit } from '../../../../Common/realm/timeInRangeHealthKit';
import { useScreenReader } from '../../../../hooks/useScreenReaderEnabled';
import LoadingSpinner from '../../../../Common/LoadingSpinner';
import { Icon, makeStyles, useTheme } from 'react-native-elements';
import { spacing } from '../../../../theme/styles';
import { MAX_CHART_VALUE, MIN_CHART_VALUE } from './chartConstant';
import { LIBRETWOAPP } from '../../../Settings/glucoseSourceConstants';
import { useUserSettings } from '../../../../hooks/useUserSettings';

function GeneralChartView(props) {
  const { t, locale } = React.useContext(LocalizationContext);
  const { settings } = useProfile();
  const screenReaderEnabled = useScreenReader();
  const styles = useStyles();
  const window = Dimensions.get('window');
  const { theme } = useTheme();
  const { userSettings } = useUserSettings();

  const CustomLabel = props => (
    <G x={props.x} y={props.y}>
      <View
        style={{
          alignSelf: 'center',
          top: props.y - 28,
          left: props.x - 6,
          position: 'absolute',
        }}>
        <Icon name={'eat'} type={'meala'} size={16} />
        <Text>{props.text}</Text>
      </View>
    </G>
  );

  function mapUnitBack(value) {
    return settings.unit === 1
      ? value - MIN_CHART_VALUE
      : Math.round((value - MIN_CHART_VALUE / settings.unit) * (MAX_CHART_VALUE / settings.unit));
  }

  const eatingChartStyle = {
    data: {
      fill: theme.colors.secondary,
      stroke: theme.colors.secondary,
      fillOpacity: 0.8,
      strokeWidth: 0,
    },
  };

  if (props.loading === false) {
    if (screenReaderEnabled) {
      return (
        <View>
          {props.coordinates && props.coordinates.length > 1 ? (
            <>
              <Text style={styles.text}>
                {t('Accessibility.MealDetails.values', {
                  values: props.coordinates.length,
                })}
                {settings.unit === 1 ? 'miligram pro deziliter' : 'mili mol'}
              </Text>
              <Text style={styles.text}>
                {analyseTimeInRangeHealthKit(props.coordinates)}
                {t('Accessibility.MealDetails.percentage')}
              </Text>

              {props.coordinates
                .filter((data, i) => i % 3 === 0)
                .map((data, i) => (
                  <Text key={i} style={styles.text}>
                    {moment(data.x).format('LT')} – {data.y.toFixed(settings.unit === 1 ? 0 : 1)}
                  </Text>
                ))}
            </>
          ) : (
            <Text>
              {userSettings.glucoseSource === LIBRETWOAPP
                ? t('Accessibility.Home.libre')
                : t('Accessibility.Home.dexcom')}
            </Text>
          )}
        </View>
      );
    } else {
      return (
        <Svg width={window.width} height={'300'}>
          <Rect x="50" y="160" width={window.width - 75} height="70" fillOpacity="1" fill="#ECFFEC" />
          <Rect x="50" y="160" width={window.width - 75} height="1" fillOpacity="0.2" fill="#ffd420" />
          <Rect x="50" y="230" width={window.width - 75} height="1" fillOpacity="0.2" fill="#ac000a" />

          <VictoryChart
            standalone={false}
            width={window.width + 20}
            minDomain={{ y: 50 / settings.unit }}
            scale={{ x: 'time' }}
            maxDomain={{ y: 300 / settings.unit }}>
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
              {props.coordinates && props.coordinates.length >= 3 && (
                <VictoryScatter
                  style={{
                    data: {
                      fill: ({ datum }) =>
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
              )}
              <VictoryBar
                barWidth={3}
                style={eatingChartStyle}
                labels={['']}
                labelComponent={<CustomLabel />}
                data={[
                  {
                    x: new Date(moment(props.selectedFood.date).format()),
                    y: 270 / settings.unit,
                  },
                ]}
              />
              {props.insulinCoordinates !== null && (
                <VictoryBar
                  barWidth={5}
                  style={{
                    data: {
                      fill: '#99E8D7',
                      fillOpacity: 0.7,
                      strokeWidth: 1,
                    },
                  }}
                  data={props.insulinCoordinates}
                />
              )}
              {props.coordinates && props.carbCoordinates.length > 0 && (
                <VictoryBar
                  barWidth={1}
                  style={{
                    data: { fill: '#37619C', strokeWidth: 1.5 },
                  }}
                  labels={({ datum }) => `${mapUnitBack(datum.y)}`}
                  data={props.carbCoordinates}
                />
              )}
            </VictoryGroup>
          </VictoryChart>
        </Svg>
      );
    }
  } else {
    return <LoadingSpinner />;
  }
}

export default GeneralChartView;

const useStyles = makeStyles(theme => ({
  text: { padding: spacing.S, fontSize: 18 },
}));
