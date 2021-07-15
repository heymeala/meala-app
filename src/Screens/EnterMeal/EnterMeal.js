import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, FAB, makeStyles } from 'react-native-elements';
import { database } from '../../Common/database_realm';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import MealInputField from './EnterMealComponents/MealInputField';
import RestaurantInputField from './EnterMealComponents/RestaurantInputField';
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
import HealthKitInputField from './HealthKitInputField';
import NoteInputField from './NoteInputField';
import { spacing } from '../../theme/styles';
import uuid from 'react-native-uuid';
import { useUserSettings } from '../../hooks/useUserSettings';
import { COPY_MODE, EDIT_MODE, useEnterMealType } from '../../hooks/useEnterMealState';
import { useExistingDataFromDB } from './hooks/useExistingFatSecretIds';

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

  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [mealTitle, setMealTitle] = useState('');

  const [note, setNote] = useState('');
  const [carbs, setCarbs] = useState(null);
  const [nsTreatmentsUpload, setNsTreatmentsUpload] = useState(null);
  const [foodPicture, setFoodPicture] = useState('');
  const [base64ImageData, setBase64ImageData] = useState('');
  const [predictions, setPredictions] = useState([]);

  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const [date, setDate] = useState(new Date());

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
  const [tags, setTags] = useState([]);
  const [fatSecretData, setFatSecretData] = useState(null);
  const [existingFatSecretIds, setExistingFatSecretIds] = useState(null);

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
      return () => {
      };
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
          return <HeaderRightIconGroup reset={reset} saveAll={saveAll} />;
        }
      },
    });
    return () => {
    };
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
    }
    getExistingFatSecretProfileData(date, existingFatSecretIds, setFatSecretData);
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

  function saveAll() {
    const fatSecretUserIds = fatSecretData
      ? fatSecretData
        .filter(data => data.checked)
        .map(data => {
          return { foodEntryId: data.food_entry_id };
        })
      : [];

    const defaultMealTitle = mealTitle || mealTypeByTime(date, t);
    const defaultRestaurantName = restaurantName || t('AddMeal.home');
    const defaultRestaurantId = restaurantId || t('AddMeal.home');

    if (type.mode !== EDIT_MODE) {
      reminderNotification(userMealId, mealId, t, defaultMealTitle);
      uploadToNightScout(nsTreatmentsUpload, note, userSettings, date);
    }

    if (type.mode === EDIT_MODE) {
      database
        .editRestaurantAndMeal(mealTitle, foodPicture, note, mealId, userMealId, date, fatSecretUserIds, tags)
        .then(() => {
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
        .then(() =>
          analytics().logEvent('Save_Restaurant', {
            Meal: defaultMealTitle,
            Restaurant: defaultRestaurantName,
          }),
        )
        .then(() => {
          reset();
          navigation.setParams({
            meal_id: null,
          });
          changeType({ mode: 'default', meal_id: null });
          //navigation.goBack();
          navigation.navigate('meala');
        });
    }
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
    scrollListReftop.current.scrollTo({ x: 0, y: 100, animated: true });
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
    setNote('');
    setCarbs(null);
    setFoodPicture('');
    setBase64ImageData('');
    setNsTreatmentsUpload(null);
    setPredictions([]);

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
        <RestaurantInputField
          editMode={type.mode === EDIT_MODE}
          restaurantName={restaurantName}
          handleRestaurantPress={handleRestaurantPress}
          handleRestaurantName={handleRestaurantName}
          lat={lat}
          lng={lng}
          gpsEnabled={gpsEnabled}
        />

        <View style={styles.spacing}>
          {fatSecretData && (
            <>
              <Button
                buttonStyle={styles.fatSecretButton}
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
        />
        <HealthKitInputField carbs={carbs} setCarbs={setCarbs} />

        <NightScoutInputFields
          nsTreatmentsUpload={nsTreatmentsUpload}
          setNsTreatmentsUpload={setNsTreatmentsUpload}
        />
        <NoteInputField notiz={note} setNotiz={setNote} />

        <Tags tags={tags} handleTags={addTag} removeTag={removeTag} />
      </ScrollView>
      <FAB
        title={t('AddMeal.save')}
        onPress={() => saveAll()}
        size={'small'}
        placement={'right'}
        buttonStyle={{ height: 40 }}
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
          icon={{ name: 'cancel', color: 'white' }}
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
    paddingHorizontal: spacing.L,
    marginBottom: spacing.M,
  },
  fatSecretButton: { paddingHorizontal: spacing.L },
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
