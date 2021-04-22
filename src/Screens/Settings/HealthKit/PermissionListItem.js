import React from 'react';
import {ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

const PermissionListItem = props => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{props.title}</ListItem.Title>
        <ListItem.Subtitle>
          {props.permission ? 'Zugriff' : 'Kein Zugriff'}
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
