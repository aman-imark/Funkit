import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React,{useEffect, useState} from 'react';
import {colors} from '../../utils/Colors';
import { getAuthToken } from '../../apis/AuthService';

const SplashScreen = ({navigation}) => {

  const [token, setToken] =useState(null);

  const checkAuth = async () => {
    const authToken = await getAuthToken();
    setToken(authToken)
  };
  console.log('authToken:', token);



  useEffect(() => {
    checkAuth()
  },[])


  useEffect(() => {
     const timer =setTimeout(()=>{
      if(token === null || token === undefined || token === ''){
        navigation.replace('Login')
        // navigation.replace('BottomTab')
      }else{
        navigation.replace('BottomTab')
      }
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [token])
  




  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={'light-content'} backgroundColor={colors.AppDefaultColor} /> */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.AppDefaultColor,
  },
  logo: {
    height: 140,
    width: 270,
    resizeMode: 'contain',
    tintColor:colors.white
  },
});
