import {Image, Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {colors} from '../utils/Colors';
import { horizontalScale } from '../utils/Metrics';

import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CustomDrawerContent = (props,{drawer}) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      console.log('Logged Out!')
      props.navigation.replace('Login')
     } catch (error) {
      throw error;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={drawer} style={{paddingLeft: horizontalScale(18)}}>
        <Image
          source={require('../assets/images/menu.png')}
          style={{height: 15, width: 20, resizeMode: 'contain'}}
        />
      </TouchableOpacity>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          labelStyle={{
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            color: colors.black,
            marginLeft: -20,
          }}
          label="Logout"
          icon={props => (
            <Image
              source={require('../assets/images/logout.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          )}
          onPress={()=>logout()}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {flex: 1, paddingTop: 20},
});
