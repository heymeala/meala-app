import React from 'react';
import {View} from 'react-native';
import {Icon, ListItem, makeStyles} from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';

const ListItemWithIcon = props => {
  const {t} = React.useContext(LocalizationContext);
  const styles = useStyles();

  return (
    <ListItem bottomDivider>
      {props.icon && <Icon name={props.icon} type={props.type ? props.type : 'meala'} />}
      <ListItem.Content>
        <ListItem.Title>{props.title}</ListItem.Title>
        {props.subtitle && (
          <ListItem.Subtitle>{props.subtitle}</ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
};

export default ListItemWithIcon;

const useStyles = makeStyles(theme => ({}));
