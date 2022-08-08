import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, FAB, makeStyles } from 'react-native-elements';
import { database } from '../../Common/database_realm';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import { uploadImageToServer } from './EnterMealComponents/imageUploadToServer';
import LocalizationContext from '../../../LanguageContext';
import { DatePickerOverlay } from './EnterMealComponents/DatePickerOverlay';
import { useFocusEffect } from '@react-navigation/core';
import ScanScreen from './BarCodeScanner/BarCodeScannerScreen';
import PictureSelector from './PictureSelector';
import { Tags } from './EnterMealComponents/Tags';
import { mealTypeByTime } from '../../utils/timeOfDay';
import FatSecretUserDataModal from './EnterMealComponents/FatSecretUserDataModal';
import { COMMUNITY_MEALS_URL } from '@env';
import { addTimeBasedTags } from './addTimebasedTags';
import { getExistingFatSecretProfileData } from './getExistingFatSecretProfileData';
import { checkGps } from './checkGPS';
import { reminderNotification } from './ReminderNotification';
import HeaderRightIconGroup from './HeaderRightIconGroup';
import { uploadToNightScout } from './uploadToNightScout';
import NightScoutInputFields from './NightScoutTreatmentsInputFields';
import HealthKitCarbohydrateField from './HealthKitCarbohydrateField';
import NoteInputField from './NoteInputField';
import { spacing } from '../../theme/styles';
import uuid from 'react-native-uuid';
import { useUserSettings } from '../../hooks/useUserSettings';
import { COPY_MODE, EDIT_MODE, useEnterMealType } from '../../hooks/useEnterMealState';
import { useExistingDataFromDB } from './hooks/useExistingFatSecretIds';
import ReminderSlider from './EnterMealComponents/ReminderSlider';
import SearchRestaurantModal from './EnterMealComponents/SearchRestaurantModal';
import EnterMealNameModal from './EnterMealComponents/MealNameModal/EnterMealNameModal';
import * as Keychain from 'react-native-keychain';
import HealthKitAddInsulin from './HealthKitAddInsulin';
import { saveCarbohydratesToHealthKit, saveInsulinToHealthKit } from '../../hooks/saveToHealthKit';
import { checkAPI } from '../../utils/checkAPI';

const EnterMeal = ({ route, navigation }, props) => {
  const { meal_id, id, scan } = route.params;
  const { t, locale } = React.useContext(LocalizationContext);
  moment.locale(locale);
  const styles = useStyles(props);
  const { userSettings } = useUserSettings();
  const [user_id, setUser_id] = useState('');
  const { type, changeType } = useEnterMealType();
  const [avatarSourceLibrary, setAvatarSourceLibrary] = useState(undefined);
  const [avatarSourceCamera, setAvatarSourceCamera] = useState(undefined);

  const [restaurantName, setRestaurantName] = useState(t('AddMeal.home'));
  const [restaurantId, setRestaurantId] = useState(t('AddMeal.home'));

  const [note, setNote] = useState('');
  const [carbs, setCarbs] = useState(null);
  const [nsTreatmentsUpload, setNsTreatmentsUpload] = useState(null);
  const [foodPicture, setFoodPicture] = useState('');
  const [base64ImageData, setBase64ImageData] = useState('');
  const [predictions, setPredictions] = useState([]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const [date, setDate] = useState(new Date());
  const [mealTitle, setMealTitle] = useState(mealTypeByTime(date, t));

  const [cMeals, setCMeals] = useState(null);
  const [mealIsFocused, setMealIsFocused] = useState(false);

  const [mealId, setMealId] = useState(uuid.v4());
  const [userMealId, setUserMealId] = useState(uuid.v4());

  const [scope, setScope] = useState('');

  const [isLoadingcMeals, setIsLoadingcMeals] = useState(true);

  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const scrollListReftop = useRef();
  const MealInput = useRef();
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [tags, setTags] = useState([]);
  const [fatSecretData, setFatSecretData] = useState(null);
  const [existingFatSecretIds, setExistingFatSecretIds] = useState(null);

  const [loadingOnSave, setLoadingOnSave] = useState(false);
  const [value, setValue] = useState(3);
  const defaultHealthKitValues = { carbs: null, insulin: { date: null, value: null, minutes: null } };
  const [healthKitData, setHealthKitData] = useState(defaultHealthKitValues);
  const defaultMealTitle = mealTitle.trim() || mealTypeByTime(date, t);
  const defaultRestaurantName = restaurantName || t('AddMeal.home');
  const defaultRestaurantId = restaurantId || t('AddMeal.home');
  const [hasFatSecretCredentials, setFatSecretCredentials] = useState(false);
  const fatSecretButtonText = fatSecretData
    ? t('AddMeal.fatSecretUserEntries.button') +
      (fatSecretData && fatSecretData.filter(data => data.checked).length > 0
        ? ` (${fatSecretData.filter(data => data.checked).length})`
        : '')
    : t('AddMeal.fatSecretUserEntries.noData');

  React.useEffect(() => {
    if (scan === true) {
      setIsScannerVisible(prevState => true);
    }
  }, [scan]);

  useFocusEffect(
    React.useCallback(() => {
      if (type.mode !== EDIT_MODE) {
        setDate(new Date());
      }
      Keychain.hasInternetCredentials('https://www.fatsecret.com/oauth/authorize').then(result => {
        console.log(result);
        setFatSecretCredentials(result !== false);
      });

      return () => {};
    }, []),
  );

  useExistingDataFromDB(
    meal_id,
    setTags,
    setExistingFatSecretIds,
    setMealTitle,
    setUserMealId,
    setRestaurantId,
    setMealId,
    setDate,
    setFoodPicture,
    setAvatarSourceCamera,
    setNote,
    setRestaurantName,
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title:
        type.mode === EDIT_MODE
          ? t('AddMeal.edit')
          : type.mode === COPY_MODE
          ? t('AddMeal.copy')
          : t('AddMeal.AddMealTitle'),
      headerRight: () => {
        if (type.mode !== EDIT_MODE) {
          return <HeaderRightIconGroup reset={reset} saveAll={validateTimeBeforeSave} />;
        }
      },
    });
    return () => {};
  }, [navigation, type]);

  useEffect(() => {
    if (id) {
      setRestaurantId(prevState => id);
      database.getRestaurantName(id).then(name => setRestaurantName(name));
    }
  }, [id]);

  //todo: move to app
  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(data => {
        //  console.log(data.user.uid)
        setUser_id(data.user.uid);
      });
  }, []);

  useEffect(() => {
    // add Breakfast | Lunch | Dinner to Tags and replace if Date updates
    if (type.mode !== EDIT_MODE) {
      addTimeBasedTags(tags, setTags, date, t);
      const mealDefaultNames = [t('AddMeal.lunch'), t('AddMeal.dinner'), t('AddMeal.breakfast')];
      if (mealDefaultNames.includes(mealTitle)) {
        setMealTitle(mealTypeByTime(date, t));
      }
    }
    getExistingFatSecretProfileData(date, existingFatSecretIds, setFatSecretData);
    setHealthKitData({ carbs: healthKitData.carbs, insulin: { ...defaultHealthKitValues.insulin } });
  }, [date]);

  useFocusEffect(
    React.useCallback(() => {
      checkGps(setLng, setLat, setGpsEnabled);
    }, [gpsEnabled]),
  );

  function cancel() {
    reset();
    navigation.setParams({
      meal_id: null,
    });
    changeType({ mode: 'default', meal_id: null });
    navigation.goBack();
  }

  const handleScannerFood = data => {
    setRestaurantName(prevState => t('General.various'));
    setRestaurantId(prevState => t('General.various'));
    setNote(data.note ? data.note : null);
    setMealId(uuid.v4());
    setUserMealId(uuid.v4());
    setMealTitle(data.meal);
  };

  const offset = Platform.OS === 'android' ? -200 : 64;

  const loadCommunityMeals = id => {
    console.log('Search C MEals');
    checkAPI('COMMUNITY_MEALS_URL', COMMUNITY_MEALS_URL);
    fetch(COMMUNITY_MEALS_URL + id)
      .then(response => response.json())
      .then(data => {
        setCMeals(data);
        setIsLoadingcMeals(false);
      })
      .catch(error => {
        setCMeals(null);
        setIsLoadingcMeals(false);
      });
  };

  function validateTimeBeforeSave() {
    const currentTime = new Date().getTime() - 900000;
    if (date.getTime() < currentTime) {
      Alert.alert(t('AddMeal.timeAlertTitle'), t('AddMeal.timeAlertDescription'), [
        {
          text: t('General.cancel'),
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: t('General.yesSave'),
          onPress: () => {
            console.log('OK Pressed');
            saveAll();
          },
        },
      ]);
    } else {
      saveAll();
    }
  }

  function saveAll() {
    setLoadingOnSave(true);

    const fatSecretUserIds = fatSecretData
      ? fatSecretData
          .filter(data => data.checked)
          .map(data => {
            return { foodEntryId: data.food_entry_id };
          })
      : [];

    if (type.mode !== EDIT_MODE) {
      reminderNotification(userMealId, mealId, t, defaultMealTitle, value);
      uploadToNightScout(nsTreatmentsUpload, note, userSettings, date);
    }

    if (type.mode === EDIT_MODE) {
      database
        .editRestaurantAndMeal(
          defaultMealTitle,
          foodPicture,
          note,
          mealId,
          userMealId,
          date,
          fatSecretUserIds,
          tags,
        )
        .then(() => {
          setLoadingOnSave(false);
          reset();
          navigation.setParams({
            meal_id: null,
          });
          changeType({ mode: 'default', meal_id: null });
          navigation.navigate('meala');
        });
    } else {
      const restaurantData = {
        base64ImageData: base64ImageData,
        user_id,
        restaurantName,
        restaurantId,
        mealTitle,
        picId: foodPicture,
        lat,
        lng,
        mealId,
        userMealId,
        scope,
        carbs,
        predictions,
        date,
      };

      if (healthKitData.insulin.value && Platform.OS === 'ios') {
        saveInsulinToHealthKit(healthKitData.insulin.value, healthKitData.insulin.date);
      }
      if (healthKitData.carbs && Platform.OS === 'ios') {
        saveCarbohydratesToHealthKit(healthKitData.carbs, date);
      }

      database
        .saveRestaurant(
          defaultRestaurantName,
          defaultRestaurantId,
          defaultMealTitle,
          foodPicture,
          note,
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
        .then(() => {
          setLoadingOnSave(false);
          analytics().logEvent('Save_Restaurant', {
            Meal: defaultMealTitle,
            Restaurant: defaultRestaurantName,
          });
          reset();
          navigation.setParams({
            meal_id: null,
          });
          changeType({ mode: 'default', meal_id: null });
          navigation.navigate('meala');
        });
    }
  }

  const handleInputMealChange = text => {
    setMealTitle(text);
  };

  const handleRestaurantPress = (restaurant, id, scopeInfo) => {
    setRestaurantName(restaurant);
    setRestaurantId(id);
    setScope(scopeInfo);
    setMealIsFocused(true);
    console.log(scopeInfo);
    loadCommunityMeals(id);

    Keyboard.dismiss();
  };
  //todo: real id?
  const handleRestaurantName = text => {
    setRestaurantName(text);
    setRestaurantId(text);
  };

  const handleMealPress = (meal, id) => {
    setMealTitle(meal);
    setMealId(id); // comes from database
  };

  function reset() {
    const newDate = new Date();
    setHealthKitData(defaultHealthKitValues);
    setAvatarSourceLibrary(undefined);
    setAvatarSourceCamera(undefined);
    setRestaurantName(t('AddMeal.home'));
    setRestaurantId(t('AddMeal.home'));
    setMealTitle(mealTypeByTime(date, t));
    setNote('');
    setCarbs(null);
    setFoodPicture('');
    setBase64ImageData('');
    setNsTreatmentsUpload(null);
    setPredictions([]);

    setCMeals(null);
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
    <ScanScreen toggleScanner={() => setIsScannerVisible(false)} handleScannerFood={handleScannerFood} />
  ) : (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled keyboardVerticalOffset={offset}>
      <ScrollView
        bounces={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        ref={scrollListReftop}
        scrollToOverflowEnabled={true}
        contentContainerStyle={styles.container}>
        <PictureSelector
          userMealId={userMealId}
          setFoodPicture={setFoodPicture}
          setClarifaiImagebase={setBase64ImageData}
          setDate={setDate}
          setPredictions={setPredictions}
          setTags={setTags}
          avatarSourceCamera={avatarSourceCamera}
          setAvatarSourceCamera={setAvatarSourceCamera}
          avatarSourceLibrary={avatarSourceLibrary}
          setAvatarSourceLibrary={setAvatarSourceLibrary}
          setIsScannerVisible={setIsScannerVisible}
        />

        <DatePickerOverlay date={date} setDate={setDate} />
        <SearchRestaurantModal
          editMode={type.mode === EDIT_MODE}
          handleRestaurantPress={handleRestaurantPress}
          handleRestaurantName={handleRestaurantName}
          lat={lat}
          lng={lng}
          gpsEnabled={gpsEnabled}
          restaurantName={restaurantName}
        />

        <View style={styles.spacing}>
          {hasFatSecretCredentials ? (
            <>
              <Button
                disabled={!fatSecretData}
                buttonStyle={styles.fatSecretButton}
                title={fatSecretButtonText}
                onPress={() => setVisible(true)}
              />
              {fatSecretData && (
                <FatSecretUserDataModal
                  fatSecretData={fatSecretData}
                  setFatSecretData={setFatSecretData}
                  visible={visible}
                  setVisible={setVisible}
                />
              )}
            </>
          ) : null}
        </View>
        <EnterMealNameModal
          MealInput={MealInput}
          isLoadingcMeals={isLoadingcMeals}
          cMeals={cMeals}
          handleMealPress={handleMealPress}
          handleInputMealChange={handleInputMealChange}
          mealName={mealTitle}
          predictions={predictions}
        />

        <HealthKitCarbohydrateField
          date={date}
          setHealthKitData={setHealthKitData}
          healthKitData={healthKitData}
        />
        <HealthKitAddInsulin date={date} healthKitData={healthKitData} setHealthKitData={setHealthKitData} />
        <NightScoutInputFields
          nsTreatmentsUpload={nsTreatmentsUpload}
          setNsTreatmentsUpload={setNsTreatmentsUpload}
        />
        <NoteInputField notiz={note} setNotiz={setNote} />

        <Tags tags={tags} handleTags={addTag} removeTag={removeTag} mode={type.mode} />
        <ReminderSlider value={value} setValue={setValue} />
      </ScrollView>
      <FAB
        loading={loadingOnSave}
        title={t('AddMeal.save')}
        onPress={() => validateTimeBeforeSave()}
        size={'small'}
        placement={'right'}
        buttonStyle={{ height: 40, width: 150 }}
        icon={{ name: 'save', color: 'black' }}
      />
      {type.mode === EDIT_MODE || type.mode === COPY_MODE ? (
        <FAB
          title={t('General.cancel')}
          titleStyle={'white'}
          buttonStyle={styles.cancelButton}
          onPress={() => cancel()}
          size={'small'}
          placement={'left'}
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default EnterMeal;

const useStyles = makeStyles((theme, props: Props) => ({
  wrapper: { flexGrow: 1, height: '100%' },

  spacing: {
    alignItems: 'flex-start',
  },
  fatSecretButton: {
    paddingHorizontal: theme.spacing.M,
    marginHorizontal: spacing.M,
    marginTop: theme.spacing.L,
  },
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cancelButton: {
    height: 40,
    backgroundColor: theme.colors.error,
    color: theme.colors.white,
  },
}));
