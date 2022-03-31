# Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. `npm i` to install dependencies
3. `pod install` in ios folder to install dependencies
4. `npm run ios` to start the packager and run the app in the iOS simulator
5. `npm run android` to start the packager and run the app in the Android device/emulator

## It's a project with a lot of integrations - so feel free to contact us to get this project started –> [heymeala](https://heymeala.com)

## Important Environment Variables - Development Keys
You can start the Project without all environment variables in the .env file. But you will see Errors while navigating through the
app. To remove the errors please insert your own keys.
### 1. create an .env file
Here is an example .env file for you. Just create a .env file in your project folder and insert your own keys.

Example: GOOGLE_API_KEY_ANDROID=yourkeyhereyourkeyhere

If you change your .env file in the project, you always have to delete metro cache by
`npm run cleanmetro` and in another terminal `npm run ios` or `npm run android`to run the simulator

paste the following in your .env file
```
# GOOGLE_API_KEY is for fetching Restaurants with the Google service
GOOGLE_API_KEY_ANDROID=
GOOGLE_API_KEY_IOS=

# CLARIFAI is for image analysis and creating tags
CLARIFAI=

# For all informations about the nutritional values - example apple per 100g - Calories ...
FATSECRET_CONSUMER_KEY= 
FATSECRET_CONSUMER_SECRET=

# Communication with glucose sensor https://www.dexcom.com/
DEXCOM_ID=
DEXCOM_SECRET=
```

#### Here are some other fixed Environment Variables. If you want to change them, please contact us.

```
COMMUNITY_MEALS_URL= **please contact us**
COMMUNITY_UPDATE_URL= **please contact us**
COMMUNITY_CREATE_MEAL_URL= **please contact us**
COMMUNITY_MEALS_TOKEN= **please contact us**

# For Quiz and Community advisor
KNOWLEDGE_URL= **please contact us**
EN_KNOWLEDGE_URL= **please contact us**
QUIZ_URL= **please contact us**
QUIZ_CATEGORIES_URL= **please contact us**

CALENDAR_URL= **please contact us**
COMMUNITY_RESTAURANTS= **please contact us**
FEEDBACK_MAIL= **please contact us**
IMAGECONVERTER_API= **please contact us**
```
### 2. Create Google Maps Variable for Android
You will need a Google Maps api key.
Create a file `local.properties` if necessary in ./android folder and insert the following with your own key.
```
MAPS_API_KEY=hereyourgooglemapkey
```

### 3. Firebase Setup
This project is running with Firebase. Contact us for the google service files
#### iOS
Add the GoogleServices-Info.plist file to your /ios folder

#### Andoird
This project includes two Firebase projects. One for release and one for development.
Add the "google-services.json" files to /android/src/debug and /android/src/release

## Release 
####Keystore Properties for Android
This is only needed if you want to build an Android Release Build. 
Create a file `keystore.properties` in android/app/ and add your release keystore details:


```
MYAPP_UPLOAD_STORE_FILE=
MYAPP_UPLOAD_KEY_ALIAS=
MYAPP_UPLOAD_STORE_PASSWORD=
MYAPP_UPLOAD_KEY_PASSWORD=
```

## Troubleshooting
###iOS Signing with XCode
This App uses remote push notifications. You need the right profiles within Apple developer certificates.
Please contact us if you need help.

## Contact us
If you have any questions, please feel free to contact us. mail[at]heymeala.com