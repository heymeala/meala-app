import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import MealQuiz from '../Screens/Quiz/MealQuiz';
import Knowledge from '../Screens/Settings/Knowledge/Knowledge';
import KnowledgeDetails from '../Screens/Settings/Knowledge/KnowledgeDetails';
import GeneralQuiz from '../Screens/Quiz/GeneralQuiz/GeneralQuiz';
import KnowledgeScreen from '../Screens/Quiz/KnowledgeScreen';
import LocalizationContext from '../../LanguageContext';

function QuizStack() {
  const { t } = React.useContext(LocalizationContext);
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="KnowledgeOverview"
    >
      <Stack.Screen
        name="KnowledgeOverview"
        component={KnowledgeScreen}
        options={{
          title: t('Quiz.name'),
          headerShown: false,
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',

            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
        }}
      />
      <Stack.Screen
        name="Knowledge"
        component={Knowledge}
        options={{
          title: t('Knowledge.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="KnowledgeDetails"
        initialParams={{ itemId: null }}
        component={KnowledgeDetails}
        options={{
          title: t('Knowledge.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',
          },
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={MealQuiz}
        options={{
          title: t('Quiz.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',

            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
        }}
      />
      <Stack.Screen
        name="GeneralQuiz"
        component={GeneralQuiz}
        options={{
          title: t('Quiz.name'),
          headerTitleStyle: {
            fontFamily: 'SecularOne-Regular',

            textAlign: 'left',
            flexGrow: 1,
            fontSize: 30,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default QuizStack;
