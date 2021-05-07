import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LocalizationContext from '../../../../LanguageContext';
import {Button, FAB, makeStyles, Overlay, Text} from 'react-native-elements';
import SaveButton from '../../../Common/SaveButton';
import {spacing} from '../../../theme/styles';

export const DatePickerOverlay = ({date, setDate}) => {
  const [datePicker, setDatePicker] = useState(date);
  const [isDateOverlayVisible, setDateOverlayVisible] = useState(false); // Overlay

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {t, locale} = React.useContext(LocalizationContext);
  const styles = useStyles();

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
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        onPress={() => setDateOverlayVisible(true)}>
        <Text style={styles.date}>
          {moment(date.toISOString()).format('lll')}
        </Text>
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
                  titleStyle={{color: 'black'}}
                  buttonStyle={{
                    borderRadius: 5,
                    marginBottom: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    backgroundColor: '#ffffff',
                  }}
                  containerStyle={{paddingVertical: 20}}
                  title={moment(datePicker).format('LL')}
                />

                <Button
                  onPress={showTimepicker}
                  titleStyle={{color: 'black'}}
                  buttonStyle={{
                    borderRadius: 5,
                    marginBottom: 10,
                    borderColor: '#000',
                    borderWidth: 1,
                    backgroundColor: '#ffffff',
                  }}
                  containerStyle={{paddingVertical: 20}}
                  title={moment(datePicker).format('LT')}
                />
              </View>
            )}

            {show && (
              <DateTimePicker
                style={{width: windowWidth}}
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
            buttonStyle={{backgroundColor: 'transparent'}}
            onPress={() => setDateOverlayVisible(false)}
            title={t('AddMeal.close')}
          />
          <FAB
            placement={'right'}
            onPress={() => save()}
            title={t('General.Save')}
          />
        </>
      </Overlay>
    </>
  );
};

const useStyles = makeStyles((theme, props: Props) => ({
  date: {
    textAlign: 'center',
    color: theme.colors.primary,
    paddingBottom: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
}));
