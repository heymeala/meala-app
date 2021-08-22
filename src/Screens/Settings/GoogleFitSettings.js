import React, { useEffect, useState } from 'react';
import { Button, makeStyles, Text } from 'react-native-elements';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { SafeAreaView } from 'react-native';
import LocalizationContext from '../../../LanguageContext';

const GoogleFitSettings = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [auth, setAuth] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [dailySteps, setDailySteps] = useState();
  // The list of available scopes inside of src/scopes.js file
  const options = {
    scopes: [Scopes.FITNESS_ACTIVITY_READ],
  };

  useEffect(() => {
    GoogleFit.checkIsAuthorized().then(() => {
      console.log(GoogleFit.isAuthorized); // Then you can simply refer to `GoogleFit.isAuthorized` boolean.
      setIsAuth(GoogleFit.isAuthorized);
    });

    GoogleFit.authorize(options)
      .then(authResult => {
        console.log(authResult);
        setAuth(JSON.stringify(authResult));
        if (authResult.success) {
          console.log('SUCCESS');
          GoogleFit.getDailySteps(new Date())
            .then(data => {
              console.log(data);
              setDailySteps(JSON.stringify(data));
            })
            .catch();
        } else {
          console.log('Denied');
        }
      })
      .catch(() => {
        console.log('Error');
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>Google Fit</Text>
      <Text>{auth && auth}</Text>
      <Button disabled={!isAuth} title={'Remove'} onPress={() => GoogleFit.disconnect()} />
      <Text>{dailySteps && dailySteps}</Text>
    </SafeAreaView>
  );
};

export default GoogleFitSettings;

const useStyles = makeStyles(theme => ({}));
