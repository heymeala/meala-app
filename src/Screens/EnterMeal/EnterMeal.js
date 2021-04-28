import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {FAB, makeStyles, Text, Button} from 'react-native-elements';
import {database} from '../../Common/database_realm';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import MealInputField from './EnterMealComponents/MealInputField';
import RestaurantInputField from './EnterMealComponents/RestaurantInputField';
import {uploadImageToServer} from './EnterMealComponents/imageUploadToServer';
import LocalizationContext from '../../../LanguageContext';
import {DatePickerOverlay} from './EnterMealComponents/DatePickerOverlay';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import ScanScreen from './BarCodeScanner/BarCodeScannerScreen';
import PictureSelector from './PictureSelector';
import {wait} from '../../Common/wait';
import {Tags} from './EnterMealComponents/Tags';
import {mealTypeByTime} from '../../utils/timeOfDay';
import FatSecretUserDataModal from './EnterMealComponents/FatSecretUserDataModal';
import BlueButton from '../../Common/BlueButton';
import {COMMUNITY_MEALS_URL} from '@env';
import {addTimeBasedTags} from './addTimebasedTags';
import {getExistingFatSecretProfileData} from './getExistingFatSecretProfileData';
import {checkGps} from './checkGPS';
import {reminderNotification} from './ReminderNotification';
import HeaderRightIconGroup from './HeaderRightIconGroup';
import {uploadToNightScout} from './uploadToNightScout';
import NightScoutInputFields from './NightScoutTreatmentsInputFields';
import HealthKitInputField from './HealthKitInputField';
import NoteInputField from './NoteInputField';

var uuid = require('react-native-uuid');

process.nextTick = setImmediate;

const EnterMeal = ({route}, props) => {
  const {t, locale} = React.useContext(LocalizationContext);
  const navigation = useNavigation();
  moment.locale(locale);
  const styles = useStyles(props);

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
  );
  const [errorMessageMealTitle, setErrorMessageMealTitle] = useState('');

  const [date, setDate] = useState(new Date());
  const [isDateOverlayVisible, setDateOverlayVisible] = useState(false); // Overlay

  const [cMeals, setCMeals] = useState([]);
  const [mealIsFocused, setMealIsFocused] = useState(false);

  const [mealId, setMealId] = useState(uuid.v4());
  const [userMealId, setUserMealId] = useState(uuid.v4());

  const [scope, setScope] = useState('');

  const [isLoadingcMeals, setIsLoadingcMeals] = useState(true);

  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const scrollListReftop = useRef();
  const MealInput = useRef();
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tags, setTags] = useState([]);
  const [settings, setSettings] = useState();

  const [fatSecretData, setFatSecretData] = useState();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    checkGps();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    if (route.params?.scan === true) {
      console.log('Scan param ' + route.params.scan);
      setIsScannerVisible(prevState => true);
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
        <HeaderRightIconGroup reset={reset} saveAll={saveAll} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.id) {
      setRestaurantId(prevState => route.params.id);
      console.log('Scan param ' + route.params.id);
      database
        .getRestaurantName(route.params.id)
        .then(name => setRestaurantName(name));
    }
  }, [route.params?.id]);

  useEffect(() => {
    if (route.params?.mealid) {
      console.log('Scan param meal id ' + route.params.mealid);
      database.fetchMealbyId(route.params.mealid).then(data => {
        setMealTitle(data.food);
        setFoodPicture(data.picture);
        setCarbs(data.carbs);
        setNotiz(data.note);
        database
          .getRestaurantName(data.restaurantId)
          .then(name => setRestaurantName(name));
      });
    }
  }, [route.params?.mealid]);

  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(data => {
        setUser_id(data.user.uid);
        getSettings().then(r => console.log(r));
      });
  }, []);

  useEffect(() => {
    // add Breakfast | Lunch | Dinner to Tags and replace if Date updates
    addTimeBasedTags(tags, setTags, date, t);
    getExistingFatSecretProfileData(date, setFatSecretData);
  }, [date]);

  useFocusEffect(
    React.useCallback(() => {
      checkGps(setLng, setLat, setGpsEnabled);
    }, [gpsEnabled]),
  );

  function toggleScanner() {
    setIsScannerVisible(prevState => false);
  }

  const handleScannerFood = data => {
    setRestaurantName(prevState => t('General.various'));
    setRestaurantId(prevState => t('General.various'));
    setNotiz(data.note ? data.note : null);
    setMealId(uuid.v4());
    setUserMealId(uuid.v4());
    setMealTitle(data.meal);
  };

  const offset = Platform.OS === 'android' ? -200 : 64;

  const loadCommunityMeals = id => {
    fetch(COMMUNITY_MEALS_URL + id)
      .then(response => response.json())
      .then(data => {
        setCMeals(data);
        setIsLoadingcMeals(false);
      })
      .catch(error => {
        setCMeals([]);
        setIsLoadingcMeals(false);
      });
  };

  async function getSettings() {
    const profileSettings = await database.getSettings();
    setSettings(profileSettings);
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
          .filter(data => data.checked)
          .map(data => {
            return {foodEntryId: data.food_entry_id};
          })
      : [];

    uploadToNightScout(
      nightscoutCarbs,
      nightscoutInsulin,
      notiz,
      settings,
      date,
    );

    const defaultMealTitle = mealTitle || mealTypeByTime(date, t);
    const defaultRestaurantName = restaurantName || t('AddMeal.home');
    const defaultRestaurantId = restaurantId || t('AddMeal.home');

    reminderNotification(userMealId, mealId, t, defaultMealTitle);

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

  const handleInputMealChange = text => setMealTitle(text);

  const handleRestaurantPress = (restaurant, id, scopeInfo) => {
    setRestaurantName(restaurant);
    setRestaurantId(id);
    setScope(scopeInfo);
    setMealIsFocused(true);
    loadCommunityMeals(id);
    Keyboard.dismiss();
  };

  const handleRestaurantName = text => {
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
    const newMealID = uuid.v4();
    const newuserMealId = uuid.v4();
    setMealId(newMealID);
    setUserMealId(newuserMealId);
    setDate(newDate);

    setTags([]);
  }

  function addTag(newTag) {
    setTags(prevArray => [
      ...prevArray,
      {
        id: uuid.v4(),
        name: newTag,
        active: true,
      },
    ]);
  }

  function removeTag(id) {
    setTags(prevArray =>
      prevArray.map(data => {
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
          setFoodPicture={setFoodPicture}
          setClarifaiImagebase={setClarifaiImagebase}
          setDate={setDate}
          setPredictions={setPredictions}
          setTags={setTags}
          avatarSourceCamera={avatarSourceCamera}
          setAvatarSourceCamera={setAvatarSourceCamera}
          avatarSourceLibrary={avatarSourceLibrary}
          setAvatarSourceLibrary={setAvatarSourceLibrary}
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
          close={() => setDateOverlayVisible(false)}
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
              <Button
                title={
                  t('AddMeal.fatSecretUserEntries.button') +
                  (fatSecretData.filter(data => data.checked).length > 0
                    ? ` (${fatSecretData.filter(data => data.checked).length})`
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
        <HealthKitInputField
          glucoseDataSource={glucoseDataSource}
          setCarbs={setCarbs}
        />

        <NightScoutInputFields
          settings={settings}
          nightscoutCarbs={nightscoutCarbs}
          setNightscoutCarbs={setNightscoutCarbs}
          nightscoutInsulin={nightscoutInsulin}
          setNightscoutInsulin={setNightscoutInsulin}
        />
        <NoteInputField notiz={notiz} setNotiz={setNotiz} />

        <Tags tags={tags} handleTags={addTag} removeTag={removeTag} />
        <FAB
          title={t('AddMeal.save')}
          onPress={() => saveAll()}
          size={'small'}
          placement={'right'}
          icon={{name: 'save', color: 'black'}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EnterMeal;

const useStyles = makeStyles((theme, props: Props) => ({
  date: {
    textAlign: 'center',
    color: theme.colors.primary,
    paddingBottom: 15,
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));
