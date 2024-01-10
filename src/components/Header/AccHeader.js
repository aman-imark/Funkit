import { StyleSheet, Text, View,Image, StatusBar, Platform, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../utils/Colors'
import { horizontalScale, verticalScale } from '../../utils/Metrics';

const AccHeader = () => {


  return (
    <>
    <StatusBar />
    <StatusBar barStyle={'light-content'} />
    <ImageBackground source={require('../../assets/images/logoBackground.png')}  resizeMode="cover" >
    <View style={styles.topBox}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
    </ImageBackground>
    </>
  )
}

export default AccHeader


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBox: {
    // width: '100%',
    height: verticalScale(180),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.AppDefaultColor,
    borderColor: 'red',
    // borderBottomStartRadius: '60%',
    // borderBottomEndRadius: '60%',
    // alignSelf:'center',

    // marginTop:-verticalScale(36)
  },
  logo: {
    height: verticalScale(80),
    width: horizontalScale(150),
    resizeMode: 'contain',
    tintColor:colors.white
  },
})