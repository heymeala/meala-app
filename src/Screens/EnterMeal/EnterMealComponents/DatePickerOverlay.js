import React, {useEffect, useState} from 'react';
import {Dimensions, Platform, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import LocalizationContext from '../../../../LanguageContext';
import {Button, Overlay} from 'react-native-elements';
import SaveButton from '../../../Common/SaveButton';

export const DatePickerOverlay = ({date, setDate, isVisible, close}) => {
  const [datePicker, setDatePicker] = useState(date);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {t, locale} = React.useContext(LocalizationContext);

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

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  function save() {
    setDate(datePicker);
    close();
  }

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const windowWidth = Dimensions.get('window').width;
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
      fullScreen={true}
      title={'Change Time'}
      overlayStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
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
          type={'outline'}
          titleStyle={{color: 'black'}}
          buttonStyle={{
            marginBottom: 10,
            borderColor: 'black',
          }}
          containerStyle={{paddingVertical: 20}}
          onPress={() => close()}
          title={t('AddMeal.close')}
        />
        <SaveButton
          onPress={() => save()}
          title={t('General.Save')}
          containerStyle={{position: 'absolute', bottom: 30}}
        />
      </>
    </Overlay>
  );
};
