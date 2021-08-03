import React, { useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { Button, Icon, ListItem, makeStyles, Text } from 'react-native-elements';
import LocalizationContext from '../../../../LanguageContext';
import Modal from 'react-native-modal';
import { fetchGoogleRestaurants, getLocalDatabaseRestaurants } from '../GoogleMapsApi/searchRestaurants';

const SearchRestaurantModal = props => {
  const { t } = React.useContext(LocalizationContext);
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [restaurants, setRestaurants] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const searchForRestaurants = async text => {
    setSearchText(text);
    const localDatabaseRestaurants = await getLocalDatabaseRestaurants(text);
    const googleRestaurants = await fetchGoogleRestaurants(text, props.lat, props.lng);

    const createLocalRestaurantList =
      localDatabaseRestaurants &&
      localDatabaseRestaurants.map(item => {
        return {
          id: item.id,
          name: item.restaurant_name,
          type: item.scope || 'local',
          lat: item.lat,
          lng: item.long,
          address: item.address,
          rating: null,
        };
      });
    const createGoogleRestaurantList =
      googleRestaurants &&
      googleRestaurants.map(item => {
        return {
          id: item.place_id,
          name: item.name,
          type: 'GOOGLE',
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng,
          address: item.formatted_address,
          rating: item.rating,
        };
      });
    const mergeLists = (localList, googleList) => {
      if (localList && googleList) {
        return [...localList, ...googleList];
      } else if (localList) {
        return [...localList];
      } else if (googleList) {
        return [...googleList];
      }
    };
    const restaurantsList = mergeLists(createLocalRestaurantList, createGoogleRestaurantList);
    console.log('list', restaurantsList);
    setRestaurants(restaurantsList);
  };

  const FlatListItem = ({ item }) => (
    <ListItem bottomDivider>
      <View>
        <Icon
          size={16}
          name={item.type === 'local' ? 'eat' : 'logo-google'}
          type={item.type === 'local' ? 'meala' : 'ionicon'}
        />
        <Text>{item.rating}</Text>
      </View>
      <ListItem.Content>
        <ListItem.Title h4>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
      </ListItem.Content>
      <Button
        onPress={() => {
          props.handleRestaurantPress(item.name, item.id, item.type);
          setOpen(false);
        }}
        iconRight
        titleStyle={{ fontSize: 10 }}
        icon={<Icon name={'add-circle'} type={'ionicon'} />}
      />
    </ListItem>
  );
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={styles.touchContainer}>
          <Icon name={'map'} type={'meala'} size={30} />
        </View>
        <View style={{ flexShrink: 1, paddingLeft: 24, width: '100%' }}>
          <Text style={{ textAlign: 'left', fontFamily: 'SecularOne-Regular' }}>Wo isst Du?</Text>
          <Text>{props.restaurantName}</Text>
        </View>
        <View style={{ margin: 8 }}>
          <Button
            disabled={props.editMode}
            icon={<Icon name={'edit'} />}
            accessibilityLabel={'Bearbeiten'}
            onPress={() => setOpen(true)}
          />
        </View>
      </View>

      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        isVisible={open}
        backdropOpacity={0.3}
        onBackdropPress={() => setOpen(false)}
        style={styles.modal}
        onAccessibilityEscape={() => setOpen(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              clearButtonMode={'while-editing'}
              style={styles.input}
              returnKeyType={'search'}
              returnKeyLabel={'Search'}
              //  enablesReturnKeyAutomatically={true}
              value={searchText}
              //   platform={Platform.OS}
              onChangeText={text => searchForRestaurants(text)}
            />
            <FlatList
              ListEmptyComponent={
                <View>
                  <Text>
                    Trage den Ort ein an dem Du isst, wenn du kein Ort einträgst bleibt er bei "Zuhause"
                  </Text>
                  <Text>
                    Suche außerdem nach dem Namen deines Lieblingsrestaurants oder dem Straßenname in dem sich
                    das Restaurant befindet in dem du gerade bist{' '}
                  </Text>
                  <Button
                    title={'Büro'}
                    onPress={() => props.handleRestaurantPress('Büro', 'Büro', 'local')}
                  />
                  <Button
                    title={'Flugzeug'}
                    onPress={() => props.handleRestaurantPress('Flugzeug', 'Flugzeug', 'local')}
                  />
                  <Button title={'Bahn'} />
                  <Button title={'Unterwegs'} />
                  <Button title={'Bei Oma'} />
                </View>
              }
              keyExtractor={keyExtractor}
              data={restaurants}
              renderItem={FlatListItem}
            />
            <View style={styles.buttonsContainer}>
              <Button type={'clear'} title={t('General.close')} onPress={() => setOpen(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SearchRestaurantModal;

const useStyles = makeStyles(theme => ({
  touchContainer: {
    marginLeft: theme.spacing.M,
    justifyContent: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 16,
    alignItems: 'center',
    padding: theme.spacing.S,
    textAlignVertical: 'center',

    width: 65,
    height: 65,
  },
  modal: { marginHorizontal: 4 },
  input: {
    height: 40,
    margin: 12,
    alignSelf: 'center',
    width: '100%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  centeredView: {
    //flex: 1,
    // height:300,
    justifyContent: 'center',
  },
  modalView: {
    margin: theme.spacing.S,
    backgroundColor: 'white',
    height: '90%',
    borderRadius: 20,
    padding: theme.spacing.S,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    margin: theme.spacing.XS,
  },
}));
