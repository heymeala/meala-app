import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Icon, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';
import FadeInView from '../../Common/FadeInView';
import { useNavigation } from '@react-navigation/core';

const KnowledgeScreen = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.quoteContainer}>
        <Text h1 h1Style={styles.quote}>
          {t('Quiz.quote')}
        </Text>
        <Text h4 h4Style={styles.author}>
          – Marie von Ebner-Eschenbach
        </Text>
      </FadeInView>
      <TouchableOpacity onPress={() => navigation.navigate('GeneralQuizCategories')}>
        <View style={styles.button}>
          <Icon style={styles.icon} name="community" type="meala" size={35} />
          <Text h2 style={styles.text}>
            Community Quiz
          </Text>
          <Text style={styles.subtitle}>{t('Quiz.community_quiz_desc')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Quiz')}>
        <View style={styles.button}>
          <Icon style={styles.icon} name="einstein" type="meala" size={28} />
          <Text h2 style={styles.text}>
            {t('Quiz.meal_quiz')}
          </Text>
          <Text style={styles.subtitle}>{t('Quiz.meal_quiz_desc')}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Knowledge')}>
        <View style={styles.button}>
          <Icon style={styles.icon} name="simple_recipe" type="meala" size={28} />
          <Text h2 style={styles.text}>
            {t('Quiz.guide')}
          </Text>
          <Text style={styles.subtitle}> {t('Quiz.guide_desc')}</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default KnowledgeScreen;

const useStyles = makeStyles(theme => ({
  container: { backgroundColor: theme.colors.primary, flex: 1 },
  quote: { color: theme.colors.white, fontFamily: 'Secular One' },
  quoteContainer: { padding: theme.spacing.L },
  author: { color: theme.colors.white, fontFamily: 'Secular One', textAlign: 'right' },
  text: { textAlign: 'center' },
  subtitle: { color: theme.colors.grey2, textAlign: 'center', paddingTop: theme.spacing.XS },
  icon: { paddingBottom: theme.spacing.M },
  button: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: theme.spacing.L,
    marginHorizontal: theme.spacing.L,
    marginVertical: theme.spacing.S,
  },
}));
