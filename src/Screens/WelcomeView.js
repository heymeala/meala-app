import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { useAuth } from '../hooks/AuthProvider';
import OnboardingScreen from './OnboardingScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { useScreenReader } from '../hooks/useScreenReaderEnabled';

export function WelcomeView({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, signUp, signIn, projectData } = useAuth();
  const Stack = createNativeStackNavigator();

  const [onboarding, setOnboarding] = useState(undefined);
  const screenReaderEnabled = useScreenReader();
  const showOnboardingFirst = screenReaderEnabled ? 1 : 2;
  const showOnboardingLast = screenReaderEnabled ? 1 : 8;

  useEffect(() => {
    // If there is a user logged in, go to the Projects page.

    if (user !== null  ) {
      navigation.navigate('Home');
    }
  }, [user]);

  /*  useEffect(() => {
          database
              .saveOnbording()
              .then(onboardingState =>
                  onboardingState > showOnboardingFirst && onboardingState !== showOnboardingLast
                      ? setOnboarding(false)
                      : setOnboarding(true),
              );
        }, []);*/

  // The onPressSignIn method calls AuthProvider.signIn with the
  // email/password in state.
  const onPressSignIn = async () => {
    console.log('Press sign in');
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  // The onPressSignUp method calls AuthProvider.signUp with the
  // email/password in state and then signs in.
  const onPressSignUp = async () => {
    try {
      await signUp(email, password);
      signIn(email, password);
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error.message}`);
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text>Signup or Signin:</Text>
        <View>
          <TextInput
            onChangeText={setEmail}
            value={email}
            placeholder="email"
            autoCapitalize="none"
          />
        </View>
        <View>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="password"
            secureTextEntry
          />
        </View>
        <Button onPress={onPressSignIn} title="Sign In" />
        <Button onPress={onPressSignUp} title="Sign Up" />
      </SafeAreaView>

      {/*  {onboarding && (
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
  )}*/}
    </>
  );
}
