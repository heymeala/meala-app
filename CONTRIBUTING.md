# Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. `npm i` to install dependencies
3. `pod install` in ios folder to install dependencies
4. `npm run ios` to start the packager and run the app in the iOS simulator
5. `npm run android` to start the packager and run the app in the Android device/emulator

****: write here what environment variables are used

## Important environment variables - Development Keys
You can start the Project without all environment variables in the .env file. But you will see Errors while navigating through the
app. To remove the errors please insert your own keys.
### 1. create an .env file
Her is a example .env file for you. Just create a .env file in the your project folder and insert your own keys.

Example: GOOGLE_API_KEY_ANDROID=yourkeyhereyourkeyhere

If you change your .env file in the project, you always have to delete metro cache by
`npm run cleanmetro` and in another terminal `npm run ios` or `npm run android`to run the simulator

paste this in your .env file
```
# GOOGLE_API_KEY is for the fetching Restaurants with the Google service
GOOGLE_API_KEY_ANDROID=
GOOGLE_API_KEY_IOS=

# CLARIFAI is for image analysis and tags
CLARIFAI=

# For all infos about the nutritional values - example apple per 100g - Calories ...
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
### 2. create Google Maps variable for android
You will need a Google Maps api key.
Create a file `local.properties` if necessary in ./android folder and insert the following with your own key.
```
MAPS_API_KEY=hereyourgooglemapkey
```


## release 
####keystore properties for android
Create a file `debug.keystore` in android/app/ and insert:
```
MYAPP_UPLOAD_STORE_FILE=
MYAPP_UPLOAD_KEY_ALIAS=
MYAPP_UPLOAD_STORE_PASSWORD=
MYAPP_UPLOAD_KEY_PASSWORD=
```

## Troubleshooting
###Signing - XCode
Please contact us.

###Errors

Failed to launch the app on simulator, An error was encountered processing the command (domain=com.apple.CoreSimulator.SimError, code=405):
Unable to lookup in current state: Shutdown

Solution:
- Delete Xcode cache
- Delete Project Build and indexes
- Path:>about this Mac>Storage>Manage>Developer
[More](https://stackoverflow.com/questions/69312343/build-error-domain-com-apple-coresimulator-simerror-code-405)

## Contact us
If you have any questions, please feel free to contact us. kr[at]lumind-solutions.de