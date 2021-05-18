import React from 'react';
import {View} from 'react-native';
import {Badge, Icon, ListItem, makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../LanguageContext';

const CategoryListItem = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();
  const {setQuizType, quizServings, title, subtitle, badge} = props;
  return (
    <ListItem bottomDivider onPress={() => setQuizType(quizServings)}>
      <Icon name={'einstein'} type={'meala'} size={30} />
      <ListItem.Content>
        <ListItem.Title h3>{title}</ListItem.Title>
        {subtitle ? <ListItem.Subtitle>{subtitle}</ListItem.Subtitle> : null}
      </ListItem.Content>
      {badge ? <Badge value={badge} /> : null}

      <ListItem.Chevron />
    </ListItem>
  );
};

export default CategoryListItem;

const useStyles = makeStyles(theme => ({}));
