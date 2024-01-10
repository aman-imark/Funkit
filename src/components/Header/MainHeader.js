import {Image, StyleSheet, Text, TouchableOpacity, Switch, View} from 'react-native';
import React, { useState,useEffect } from 'react';
import {horizontalScale, verticalScale, width} from '../../utils/Metrics';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../utils/Colors';


import { useToggle } from '../../context/ToggleContext';
import { getData } from '../../apis/services';

const MainHeader = ({route, drawer}) => {

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {!drawer && (
          <TouchableOpacity onPress={()=>route.goBack()}>
            <Icon name={'west'} size={22} color={colors.black} />
          </TouchableOpacity>
        ) }
        {drawer&& (
          <TouchableOpacity onPress={drawer}>
            <Image
              source={require('../../assets/images/menu.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>


      <View style={styles.right}>
      <TouchableOpacity onPress={()=>route.navigate('Search')}>
        <Image
          source={require('../../assets/images/search.png')}
          style={{height: 20, width: 20, resizeMode: 'contain'}}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>route.navigate('Cart')}>
          <Image
            source={require('../../assets/images/bag.png')}
            style={{height: 20, width: 20, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(60),
    paddingHorizontal: horizontalScale(15),
  },
  right: {
    flexDirection: 'row',
    gap: 20,
  },
  visibilityText: {
    fontSize: 16,
    marginLeft: 8,
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }], // Adjust the scale factor as needed
  },
});
