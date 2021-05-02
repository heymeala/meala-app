import React from 'react';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import LocalizationContext from '../../../../LanguageContext';

const PermissionListItem = props => {
  const {t, locale} = React.useContext(LocalizationContext);

  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{props.title}</ListItem.Title>
        <ListItem.Subtitle>
          {props.permission
            ? t('Settings.healthKit.hasAccess')
            : t('Settings.healthKit.hasNoAccess')}
        </ListItem.Subtitle>
      </ListItem.Content>
      {props.permission ? (
        <Icon name="ios-checkmark-circle" color={'#3cbd48'} size={30} />
      ) : (
        <Icon name="ios-close-circle" color={'#9f1313'} size={30} />
      )}
    </ListItem>
  );
};

export default PermissionListItem;
