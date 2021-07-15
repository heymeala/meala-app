import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LocalizationContext from '../../../../LanguageContext';
import { Button, Divider, FAB, Icon, makeStyles, Overlay, Text, useTheme } from 'react-native-elements';

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
        <View style={styles.edit}>
          <Icon name={'edit'} size={16} color={theme.colors.white} />
        </View>
        <View style={{ flexDirection: 'column', paddingTop: 8 }} onPress={() => setDateOverlayVisible(true)}>
          <Text style={styles.time}>
            {t('AddMeal.startedEating')} {moment(date.toISOString()).format('LT')}{' '}
          </Text>
          <Text>{t('AddMeal.rightTime')}</Text>
        </View>
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
    fontFamily: 'Secular One',
    textAlign: 'center',
    fontSize: 22,
    color: theme.colors.primary,
  },
  time: {
    fontFamily: 'Secular One',
    fontSize: 18,
    color: theme.colors.primary,
  },
  month: {
    fontFamily: 'Secular One',
    color: theme.colors.primary,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  container: { flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.L },
  touchContainer: {
    marginLeft: theme.spacing.M,
    marginTop: theme.spacing.M,
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    alignItems: 'center',
    padding: theme.spacing.S,
    textAlignVertical: 'center',

    width: 70,
    height: 65,
  },
  edit: {
    backgroundColor: theme.colors.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    left: -10,
    top: -15,
  },
}));
