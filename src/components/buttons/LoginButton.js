import {StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import { verticalScale } from '../../utils/Metrics';

const LoginButton = ({navigation, title, handlePress, bgColor}) => {
  return (
    <TouchableOpacity  onPress={handlePress} style={[styles.container,{backgroundColor:bgColor?bgColor:colors.black}]}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default LoginButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(50),
    marginTop:10,
    // backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:4
  },
  title:{
    color:colors.white,
    fontFamily:'Poppins-Regular',
    fontSize:18
  }
});
