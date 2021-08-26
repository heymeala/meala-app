import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LocalizationContext from '../../../../LanguageContext';
import { Button, Divider, FAB, makeStyles, Overlay, Text, useTheme } from 'react-native-elements';
import EditIcon from './EditIcon';

export const DatePickerOverlay = ({ date, setDate }) => {
  const [datePicker, setDatePicker] = useState(date);
  const [isDateOverlayVisible, setDateOverlayVisible] = useState(false); // Overlay

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const { t, locale } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const { theme } = useTheme();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      setMode('datetime');
      setShow(true);
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDatePicker(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  function save() {
    setDate(datePicker);
    setDateOverlayVisible(false);
  }

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <Divider />
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        style={styles.container}
        onPress={() => setDateOverlayVisible(true)}>
        <View style={styles.touchContainer}>
          <Text style={styles.date}>{moment(date.toISOString()).format('Do')}</Text>
          <Text style={styles.month}>{moment(date.toISOString()).format('MMM')}</Text>
        </View>
        <View style={styles.textContainer} onPress={() => setDateOverlayVisible(true)}>
          <Text style={styles.time}>
            {t('AddMeal.startedEating')} {moment(date.toISOString()).format('LT')}{' '}
          </Text>
          <Text style={styles.subtitle}>{t('AddMeal.rightTime')}</Text>
        </View>
        <EditIcon />
      </TouchableOpacity>
      <Overlay
        isVisible={isDateOverlayVisible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        fullScreen={true}
        title={'Change Time'}
        overlayStyle={styles.overlay}>
        <>
          <View>
            {Platform.OS === 'ios' ? null : (
              <View>
                <Button
                  onPress={showDatepicker}
                  titleStyle={{ color: 'black' }}
                  buttonStyle={{
                    borderRadius: 5,
                    marginBottom: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    backgroundColor: '#ffffff',
                  }}
                  containerStyle={{ paddingVertical: 20 }}
                  title={moment(datePicker).format('LL')}
                />

                <Button
                  onPress={showTimepicker}
                  titleStyle={{ color: 'black' }}
                  buttonStyle={{
                    borderRadius: 5,
                    marginBottom: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    backgroundColor: '#ffffff',
                  }}
                  containerStyle={{ paddingVertical: 20 }}
                  title={moment(datePicker).format('LT')}
                />
              </View>
            )}

            {show && (
              <DateTimePicker
                style={{ width: windowWidth }}
                testID="dateTimePicker"
                value={datePicker}
                mode={mode}
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={onChange}
                locale={locale}
                maximumDate={new Date().setHours(23, 59, 59, 999)}
              />
            )}
          </View>
          <Button
            type={'clear'}
            buttonStyle={{ backgroundColor: 'transparent' }}
            onPress={() => setDateOverlayVisible(false)}
            title={t('AddMeal.close')}
          />
          <FAB placement={'right'} onPress={() => save()} title={t('General.Save')} />
        </>
      </Overlay>
    </>
  );
};

const useStyles = makeStyles((theme, props: Props) => ({
  date: {
    fontFamily: 'SecularOne-Regular',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 35,
    marginBottom: -5,
  },
  time: {
    fontFamily: 'SecularOne-Regular',
    fontSize: 18,
    textAlign: 'left',
  },
  month: {
    fontFamily: 'SecularOne-Regular',
    fontSize: 14,
    lineHeight: 16,
  },
  subtitle: { fontSize: 12 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.L,
    marginTop: theme.spacing.L,
  },
  touchContainer: {
    marginLeft: theme.spacing.M,
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    alignItems: 'center',
    padding: theme.spacing.S,
    textAlignVertical: 'center',
    width: 65,
    height: 65,
  },
  edit: {
    backgroundColor: theme.colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    left: -15,
    top: -25,
  },
  textContainer: { flexShrink: 1, paddingLeft: 24, width: '100%', flexDirection: 'column', paddingTop: 8 },
}));
