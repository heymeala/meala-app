import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {database} from '../../Common/database_realm';
import {getCurrentPosition} from '../../Common/geolocation';
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import MealInputField from './EnterMealComponents/MealInputField';
import RestaurantInputField from './EnterMealComponents/RestaurantInputField';
import {Cameraoptions} from './EnterMealComponents/OpenCamera';
import Dialog from '../../Components/dialog';
import {uploadImageToServer} from './EnterMealComponents/imageUploadToServer';
import LocalizationContext from '../../../LanguageContext';
import {DatePickerOverlay} from './EnterMealComponents/DatePickerOverlay';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import ScanScreen from './BarCodeScannerScreen';
import PushNotification from 'react-native-push-notification';
import SaveButton from '../../Common/SaveButton';
import PictureSelector from './PictureSelector';
import {wait} from '../../Common/wait';
import PermissionAlert from '../../Common/PermissionAlert';
import {Tags} from './EnterMealComponents/Tags';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useScreenReader} from '../../hooks/useScreenReaderEnabled';
import * as Keychain from 'react-native-keychain';
import {getFoodByDateFromUser} from '../../Common/fatsecret/fatsecretApi';
import {mealTypeByTime} from '../../utils/timeOfDay';
import FatSecretUserDataModal from './EnterMealComponents/FatSecretUserDataModal';
import BlueButton from '../../Common/BlueButton';
import {
  CLARIFAI,
  GOOGLE_API_KEY_ANDROID,
  GOOGLE_API_KEY_IOS,
  COMMUNITY_MEALS_URL,
} from '@env';
var uuid = require('react-native-uuid');
const Clarifai = require('clarifai');
const clarifai = new Clarifai.App({
  apiKey: CLARIFAI,
});
process.nextTick = setImmediate;

const EnterMeal = ({route}, props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  moment.locale(locale);

  const [user_id, setUser_id] = useState('');

  const [avatarSourceLibrary, setAvatarSourceLibrary] = useState(undefined);
  const [avatarSourceCamera, setAvatarSourceCamera] = useState(undefined);

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [mealTitle, setMealTitle] = useState('');
  const [restaurantStreet, setRestaurantStreet] = useState('');

  const [notiz, setNotiz] = useState('');
  const [carbs, setCarbs] = useState(null);
  const [nightscoutInsulin, setNightscoutInsulin] = useState();
  const [nightscoutCarbs, setNightscoutCarbs] = useState();

  const [glucoseDataSource, setGlucoseDataSource] = useState('');
  const [foodPicture, setFoodPicture] = useState('');

  const [clarifaiImagebase, setClarifaiImagebase] = useState('');
  const [predictions, setPredictions] = useState([]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const [errorMessageRestaurantName, setErrorMessageRestaurantName] = useState(
    '',
  ); //ToDO: error Message for all
  const [errorMessageMealTitle, setErrorMessageMealTitle] = useState(''); //ToDO: error Message for all

  const [date, setDate] = useState(new Date());
  const [isDateOverlayVisible, setDateOverlayVisible] = useState(false); // Overlay

  const [cMeals, setCMeals] = useState([]);
  const [mealIsFocused, setMealIsFocused] = useState(false);

  const [mealId, setMealId] = useState(uuid.v4());
  const [userMealId, setUserMealId] = useState(uuid.v4());

  const [scope, setScope] = useState('');

  const [isLoadingcMeals, setIsLoadingcMeals] = useState(true);

  const [nutrition, setNutrition] = useState([]);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const scrollListReftop = useRef();
  const MealInput = useRef();
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tags, setTags] = useState([]);

  const screenReaderEnabled = useScreenReader();

  const [hasKey, setHasKey] = useState(false);
  const [fatSecretData, setFatSecretData] = useState();
  const apiKey =
    Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkGps();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    if (route.params?.scan === true) {
      console.log('Scan param ' + route.params.scan);
      setIsScannerVisible((prevState) => true);
      route.params.scan = false;
    }
  }, [route.params?.scan]);

  useFocusEffect(
    React.useCallback(() => {
      setDate(new Date());
    }, []),
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <Button
            accessible={true}
            accessibilityLabel={t('Accessibility.EnterMeal.reset')}
            titleStyle={{color: 'black', fontSize: 25}}
            buttonStyle={{
              borderRadius: 5,
              backgroundColor: 'transparent',
              fontSize: 20,
            }}
            icon={
              <MaterialIcons
                style={{fontSize: 20}}
                name={'cleaning-services'}
              />
            }
            onPress={() =>
              Dialog(
                t('AddMeal.resetTitle'),
                t('AddMeal.resetMessage'),
                t,
                () => reset(),
              )
            }
          />
          {screenReaderEnabled && (
            <Button
              accessible={true}
              accessibilityLabel={t('General.Save')}
              titleStyle={{color: 'black', fontSize: 25}}
              buttonStyle={{
                borderRadius: 5,
                backgroundColor: 'transparent',
                fontSize: 20,
              }}
              icon={<MaterialIcons style={{fontSize: 20}} name={'save'} />}
              onPress={() => saveAll()}
            />
          )}
        </>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.id) {
      setRestaurantId((prevState) => route.params.id);
      console.log('Scan param ' + route.params.id);
      database
        .getRestaurantName(route.params.id)
        .then((name) => setRestaurantName(name));
    }
  }, [route.params?.id]);

  useEffect(() => {
    if (route.params?.mealid) {
      console.log('Scan param meal id ' + route.params.mealid);
      database.fetchMealbyId(route.params.mealid).then((data) => {
        setMealTitle(data.food);
        setFoodPicture(data.picture);
        // console.log(data);
        //setTags(data.tags);
        setCarbs(data.carbs);
        setNotiz(data.note);
        database
          .getRestaurantName(data.restaurantId)
          .then((name) => setRestaurantName(name));
      });
    }
  }, [route.params?.mealid]);

  useEffect(() => {
    auth()
      .signInAnonymously()
      .then((data) => {
        setUser_id(data.user.uid);
        getSettings().then((r) => console.log(r));
      });
  }, []);

  useEffect(() => {
    // add Breakfast | Lunch | Dinner to Tags and replace if Date updates
    if (tags.length > 0) {
      setTags((prevArray) =>
        prevArray.map((data) => {
          if (data.id === 'mealTime') {
            return {
              id: 'mealTime',
              name: mealTypeByTime(date, t),
              active: true,
            };
          } else {
            return {
              ...data,
            };
          }
        }),
      );
    } else {
      setTags([
        {
          id: 'mealTime',
          name: mealTypeByTime(date, t),
          active: true,
        },
      ]);
    }

    Keychain.hasInternetCredentials(
      'https://www.fatsecret.com/oauth/authorize',
    ).then((result) => {
      if (result !== false) {
        // get Date from DatePicker and Calculate days since epoch
        var myEpoch = Math.trunc(date.getTime() / 1000.0 / 60 / 60 / 24);

        getFoodByDateFromUser(myEpoch, null).then((data) => {
          if (data.food_entries) {
            if (data.food_entries.food_entry.length >= 0) {
              const checkedData = data.food_entries.food_entry.map((data) => {
                return {...data, checked: false};
              });
              setFatSecretData(checkedData);
            } else if (data.food_entries.food_entry) {
              setFatSecretData([
                {...data.food_entries.food_entry, checked: false},
              ]);
            }
            console.log(data);
          } else {
            setFatSecretData();
            console.log('no data');
          }
        });
        setHasKey(true);
      }
    });
  }, [date]);

  useFocusEffect(
    React.useCallback(() => {
      checkGps();
    }, []),
  );

  function checkGps() {
    getCurrentPosition()
      .then((position) => {
        setLng((prevState) => parseFloat(position.coords.longitude));
        setLat((prevState) => parseFloat(position.coords.latitude));
        setGpsEnabled(true);
      })
      .catch(() => {
        setLat('0');
        setLng('0');
        setGpsEnabled(false);
      });
  }

  function toggleScanner() {
    setIsScannerVisible((prevState) => false);
  }

  const handleScannerFood = (data) => {
    setRestaurantName((prevState) => t('General.various'));
    setRestaurantId((prevState) => t('General.various'));
    setNotiz(data.note ? data.note : null);
    setMealId(uuid.v4());
    setUserMealId(uuid.v4());
    setMealTitle(data.meal);
  };

  const offset = Platform.OS === 'android' ? -200 : 64;

  const loadCommunityMeals = (restaurantId) => {
    fetch(COMMUNITY_MEALS_URL + restaurantId)
      .then((response) => response.json())
      .then((data) => {
        setCMeals(data);
        setIsLoadingcMeals(false);
      })
      .catch((error) => {
        setCMeals([]);
        setIsLoadingcMeals(false);
      });
  };

  const [settings, setSettings] = useState();
  async function getSettings() {
    const settings = await database.getSettings();
    setSettings(settings);
    const getGlucoseSource = await database.getGlucoseSource();
    if (settings && getGlucoseSource == 2) {
      setGlucoseDataSource('Nightscout');
    } else if (getGlucoseSource == 1) {
      setGlucoseDataSource('Healthkit');
    } else {
      setGlucoseDataSource('Error');
    }
  }

  function saveAll() {
    const fatSecretUserIds = fatSecretData
      ? fatSecretData
          .filter((data) => data.checked)
          .map((data) => {
            return {foodEntryId: data.food_entry_id};
          })
      : [];

    if (nightscoutCarbs || nightscoutInsulin) {
      try {
        fetch(
          `${settings.nightscoutUrl}/api/v1/treatments?token=${settings.nightscoutToken}`,
          {
            method: 'post',
            headers: {
              Accept: 'accept: */*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([
              {
                created_at: date,
                carbs: nightscoutCarbs || 0,
                insulin: nightscoutInsulin || 0,
                notes: notiz,
                enteredBy: 'meala',
              },
            ]),
          },
        )
          .then((res) => res.json())
          .then((res) => console.log(res));
      } catch (e) {
        console.log(e);
      }
    }

    const defaultMealTitle = mealTitle || mealTypeByTime(date, t);
    const defaultRestaurantName = restaurantName || t('AddMeal.home');
    const defaultRestaurantId = restaurantId || t('AddMeal.home');

    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 10950 * 1000), // in 30 secs
      /* Android Only Properties */
      channelId: 'food-reminder-channel',
      autoCancel: true, // (optional) default: true
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
      /* iOS only properties */
      category: '', // (optional) default: empty string
      /* iOS and Android properties */
      message: t('AddMeal.notificationAfterMeal', {
        mealTitle: defaultMealTitle,
      }), // (required)
      userInfo: {stack: 'Home', screen: 'EnterMealStack', mealId: mealId}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    });

    const restaurantData = {
      clarifaiImagebase,
      user_id,
      restaurantName,
      restaurantStreet,
      restaurantId,
      mealTitle,
      picId: foodPicture,
      notiz,
      lat,
      lng,
      mealId,
      userMealId,
      scope,
      carbs,
      predictions,
      date,
    };
    console.log(restaurantData);
    database
      .saveRestaurant(
        defaultRestaurantName,
        restaurantStreet,
        defaultRestaurantId,
        defaultMealTitle,
        foodPicture,
        notiz,
        lat,
        lng,
        mealId,
        userMealId,
        scope,
        carbs,
        tags,
        date,
        fatSecretUserIds,
      )
      .then(() => uploadImageToServer(restaurantData))
      .then(() =>
        analytics().logEvent('Save_Restaurant', {
          Meal: defaultMealTitle,
          Restaurant: defaultRestaurantName,
        }),
      )
      .then(() => {
        reset();
        navigation.navigate('meala');
      });
  }

  const handleInputMealChange = (text) => setMealTitle(text);

  const handleRestaurantPress = (restaurant, id, scope) => {
    setRestaurantName(restaurant);
    setRestaurantId(id);
    setScope(scope);
    setMealIsFocused(true);
    loadCommunityMeals(id);
    Keyboard.dismiss();
    //     MealInput.current.focus();
  };

  const handleRestaurantName = (text) => {
    setRestaurantName(text);
    setRestaurantId(text);
  };

  const handleMealInputFocus = () => {
    setMealIsFocused(true);
    scrollListReftop.current.scrollTo({x: 0, y: 100, animated: true});
  };

  const handleMealInputBlur = () => setMealIsFocused(false);
  const handleMealPress = (meal, id) => {
    setMealTitle(meal);
    setMealId(id);
    setMealIsFocused(false);
    Keyboard.dismiss();
  };

  function handleImageLoadStates(response) {
    setFoodPicture(
      ((prevState) => Platform.OS === 'android')
        ? response.uri
        : 'data:image/jpeg;base64,' + response.base64,
    );
    setClarifaiImagebase((prevState) => response.base64);
    setDate((prevState) =>
      response.timestamp ? new Date(response.timestamp) : new Date(),
    );
    console.log(response);
    objectDetection(response.base64);
  }

  function selectLibraryTapped() {
    const options = Cameraoptions(t);
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorCode);
          if (response.errorCode === 'permission') {
            PermissionAlert(t);
          }
        } else {
          setAvatarSourceLibrary((prevState) => {
            return {uri: response.uri};
          });
          setAvatarSourceCamera((prevState) => undefined);
          handleImageLoadStates(response);
        }
      },
    );
  }

  const requestCameraPermission = async () => {
    try {
      console.log('Camera permission try');

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: t('AddMeal.Permission'),
          message: t('AddMeal.grantPermission'),
          buttonNegative: t('General.cancel'),
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        selectCameraTapped();
      } else {
        console.log('Camera permission denied');
        PermissionAlert(t);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  function selectCameraTapped() {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 800,
        maxWidth: 800,
        quality: 0.6,
        //  saveToPhotos:true,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled Camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorCode);
          if (response.errorCode === 'permission') {
            PermissionAlert(t);
          }
        } else {
          setAvatarSourceLibrary((prevState) => undefined);
          setAvatarSourceCamera((prevState) => {
            return {uri: response.uri};
          });
          handleImageLoadStates(response);
        }
      },
    );
  }

  const objectDetection = (clarifaiImagebase) => {
    clarifai.models
      .predict('bd367be194cf45149e75f01d59f77ba7', clarifaiImagebase)
      .then((data) => {
        setPredictions((prevState) => []);
        data.outputs[0].data.concepts.slice(0, 3).map((data) => {
          let url = 'https://translation.googleapis.com/language/translate/v2';
          url += '?q=' + data.name;
          url += '&target=de';
          url += '&source=en';
          url += '&key=' + apiKey;

          if (locale === 'de') {
            return fetch(url).then((googleTranslateRes) =>
              googleTranslateRes.json().then((googleTranslateRes) => {
                console.log(
                  googleTranslateRes.data.translations[0].translatedText,
                );
                setPredictions((prevArray) => [
                  ...prevArray,
                  {
                    id: data.id,
                    name:
                      googleTranslateRes.data.translations[0].translatedText,
                  },
                ]);

                setTags((prevArray) => [
                  ...prevArray,
                  {
                    id: data.id,
                    name:
                      googleTranslateRes.data.translations[0].translatedText,
                    active: true,
                  },
                ]);
              }),
            );
          } else {
            setPredictions((prevArray) => [
              ...prevArray,
              {
                id: data.id,
                name: data.name,
              },
            ]);
            setTags((prevArray) => [
              ...prevArray,
              {
                id: data.id,
                name: data.name,
                active: true,
              },
            ]);
          }
        });
      })
      .catch((e) => console.log(e));
  };
  const closeTimeDateOverlay = () => {
    setDateOverlayVisible(false);
  };

  function reset() {
    const newDate = new Date();
    setAvatarSourceLibrary(undefined);
    setAvatarSourceCamera(undefined);
    setRestaurantName('');
    setRestaurantId('');
    setMealTitle('');
    setRestaurantStreet('');
    setNotiz('');
    setCarbs(null);
    setGlucoseDataSource('');
    setFoodPicture('');
    setClarifaiImagebase('');
    setErrorMessageMealTitle('');
    setErrorMessageRestaurantName('');

    setPredictions([]);
    setDateOverlayVisible(false);

    setCMeals([]);
    setMealIsFocused(true);
    setMealId(uuid.v4());
    setUserMealId(uuid.v4());
    setScope('');

    setIsLoadingcMeals(true);
    setNutrition([]);
    const newMealID = uuid.v4();
    const newuserMealId = uuid.v4();
    setMealId(newMealID);
    setUserMealId(newuserMealId);
    setDate(newDate);

    setTags([]);
  }

  function addTag(newTag) {
    setTags((prevArray) => [
      ...prevArray,
      {
        id: uuid.v4(),
        name: newTag,
        active: true,
      },
    ]);
  }

  function removeTag(id) {
    setTags((prevArray) =>
      prevArray.map((data) => {
        if (data.id === id) {
          return {
            id: data.id,
            name: data.name,
            active: false,
          };
        } else {
          return {
            ...data,
          };
        }
      }),
    );
  }

  const [visible, setVisible] = useState(false);

  return isScannerVisible ? (
    <ScanScreen
      test={'test'}
      toggleScanner={toggleScanner}
      handleScannerFood={handleScannerFood}
    />
  ) : (
    <KeyboardAvoidingView
      style={{flexGrow: 1, height: '100%'}}
      behavior="padding"
      enabled
      keyboardVerticalOffset={offset}>
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="automatic"
        refreshControl={
          !gpsEnabled && (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          )
        }
        keyboardShouldPersistTaps="handled"
        ref={scrollListReftop}
        scrollToOverflowEnabled={true}
        contentContainerStyle={styles.container}>
        <PictureSelector
          selectCameraTapped={
            Platform.OS === 'android'
              ? requestCameraPermission
              : selectCameraTapped
          }
          selectLibraryTapped={selectLibraryTapped}
          avatarSourceCamera={avatarSourceCamera}
          avatarSourceLibrary={avatarSourceLibrary}
          setIsScannerVisible={setIsScannerVisible}
        />
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          onPress={() => setDateOverlayVisible(true)}>
          <Text style={styles.date}>
            {moment(date.toISOString()).format('lll')}
          </Text>
        </TouchableOpacity>

        <DatePickerOverlay
          date={date}
          setDate={setDate}
          isVisible={isDateOverlayVisible}
          close={closeTimeDateOverlay}
        />
        <RestaurantInputField
          restaurantName={restaurantName}
          errorMessage={errorMessageRestaurantName}
          handleRestaurantPress={handleRestaurantPress}
          handleRestaurantName={handleRestaurantName}
          lat={lat}
          lng={lng}
          gpsEnabled={gpsEnabled}
        />
        <View>
          {fatSecretData && (
            <>
              <BlueButton
                title={
                  t('AddMeal.fatSecretUserEntries.button') +
                  (fatSecretData.filter((data) => data.checked).length > 0
                    ? '(' +
                      fatSecretData.filter((data) => data.checked).length +
                      ')'
                    : '')
                }
                onPress={() => setVisible(true)}
              />

              <FatSecretUserDataModal
                fatSecretData={fatSecretData}
                setFatSecretData={setFatSecretData}
                visible={visible}
                setVisible={setVisible}
              />
            </>
          )}
        </View>
        <MealInputField
          MealInput={MealInput}
          mealIsFocused={mealIsFocused}
          isLoadingcMeals={isLoadingcMeals}
          cMeals={cMeals}
          handleMealPress={handleMealPress}
          handleMealInputFocus={handleMealInputFocus}
          handleInputMealChange={handleInputMealChange}
          Gericht={mealTitle}
          predictions={predictions}
          handleMealInputBlur={handleMealInputBlur}
          errorMessage={errorMessageMealTitle ? errorMessageMealTitle : null}
        />

        {glucoseDataSource === 'Healthkit' ? (
          <Input
            inputContainerStyle={styles.inputPadding}
            inputStyle={{fontSize: 15}}
            placeholder={t('AddMeal.Carbs')}
            keyboardType={'numeric'}
            renderErrorMessage={false}
            leftIcon={
              !screenReaderEnabled && {
                type: 'ionicon',
                name: 'ios-information-circle',
                containerStyle: {paddingRight: 10},
                iconStyle: {color: '#f9de1c'},
              }
            }
            onChangeText={(text) => setCarbs(parseFloat(text))}
          />
        ) : null}
        {settings && settings.nightscoutTreatmentsUpload && (
          <>
            <Input
              inputContainerStyle={styles.inputPaddingTextarea}
              inputStyle={{fontSize: 15}}
              placeholder={t('AddMeal.Carbs')}
              renderErrorMessage={false}
              keyboardType={'numeric'}
              returnKeyType="done"
              value={nightscoutCarbs}
              leftIcon={
                !screenReaderEnabled && {
                  type: 'font-awesome-5',
                  name: 'cookie-bite',
                  containerStyle: {paddingRight: 10},
                  iconStyle: {color: '#154d80'},
                }
              }
              onChangeText={(text) => setNightscoutCarbs(text)}
            />
            <Input
              inputContainerStyle={styles.inputPaddingTextarea}
              inputStyle={{fontSize: 15}}
              placeholder={t('AddMeal.Insulin')}
              renderErrorMessage={false}
              keyboardType={'numeric'}
              returnKeyType="done"
              value={nightscoutInsulin}
              leftIcon={
                !screenReaderEnabled && {
                  type: 'material-community',
                  name: 'needle',
                  containerStyle: {paddingRight: 10},
                  iconStyle: {color: '#154d80'},
                }
              }
              onChangeText={(text) => setNightscoutInsulin(text)}
            />
          </>
        )}
        <Input
          inputContainerStyle={styles.inputPaddingTextarea}
          inputStyle={{fontSize: 15}}
          placeholder={t('AddMeal.Note')}
          numberOfLines={3}
          renderErrorMessage={false}
          returnKeyType="done"
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          multiline={true}
          value={notiz}
          leftIcon={
            !screenReaderEnabled && {
              type: 'ionicon',
              name: 'ios-information-circle',
              containerStyle: {paddingRight: 10},
              iconStyle: {color: '#154d80'},
            }
          }
          onChangeText={(text) => setNotiz(text)}
        />

        <Tags tags={tags} handleTags={addTag} removeTag={removeTag} />
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 15, flexGrow: 1}}>
            <SaveButton onPress={() => saveAll()} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EnterMeal;

const styles = StyleSheet.create({
  date: {
    textAlign: 'center',
    color: '#419eff',
    paddingBottom: 15,
  },
  centerContainer: {
    flex: 1,

    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  padding: {
    padding: 5,
    fontSize: 18,
    alignItems: 'center',
  },
  inputPadding: {
    // backgroundColor: isDarkMode ? '#ffffff' : '#000000',
    borderRadius: 6,
    marginBottom: 10,
    height: 56,
  },
  inputPaddingTextarea: {
    // backgroundColor: isDarkMode ? '#ffffff' : '#000000',
    borderRadius: 6,
    marginBottom: 10,
    height: 70,
  },
  bottom: {
    bottom: 35,
    padding: 20,
    color: 'black',
  },
  headerComp: {
    backgroundColor: '#f9de1c',
    height: 10,
    flex: 1,
  },
  leftIconStyle: {},
  bottomButton: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
