import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from './Colors';
import LottieView from 'lottie-react-native';
import { horizontalScale, verticalScale } from './Metrics';



const Loading = () => {
  return (
  <View style={styles.container}> 
   <LottieView source={require('../assets/animation/loading.json')} style={{height:verticalScale(250),width:horizontalScale(250),bottom:verticalScale(50)}} autoPlay loop />
    {/* <ActivityIndicator size='large' color={colors.AppDefaultColor} /> */}
  </View>
  )
}

export default Loading

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
        width:'100%',
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'#000000aa',
        position:'absolute',
        bottom:0
      },
})