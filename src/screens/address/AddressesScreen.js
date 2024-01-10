import {StyleSheet, Text, TouchableOpacity, View,StatusBar,SafeAreaView} from 'react-native';
import React from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {colors} from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const AddressesScreen = ({navigation}) => {
  return (
    
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />
    {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Address</Text>
        <Text style={styles.desc}>
          The following addresses will be used on the{'\n'} checkout page by
          default.
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <View style={styles.type}>
            <Text style={styles.addtitle}>Billing Address</Text>
            <Text style={styles.span}>You have not set up this type of address yet.</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Billing')} style={styles.btn}>
            <Text style={styles.btntext}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.type}>
            <Text style={styles.addtitle}>Shipping Address</Text>
            <Text style={styles.span}>You have not set up this type of address yet.</Text>
          </View>
          <TouchableOpacity onPress={()=>navigation.navigate('Shipping')} style={styles.btn}> 
            <Text style={styles.btntext}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    {/* </View> */}
    </SafeAreaView>
  );
};

export default AddressesScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },

  titlerow: {
    width: '100%',
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: colors.txtgrey,
    textAlign: 'center',
    
  },
  wrapper: {
    width: '100%',
    paddingTop:verticalScale(30),
    paddingHorizontal: horizontalScale(20),
    gap: 20, 
  },
  card:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#F3F3F3',
    borderRadius:5,
    padding:15
  },
  type:{
    gap:-2,
    width:'80%'
  },
  addtitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: colors.black,
  },
  span:{
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: colors.txtgrey,
  },
  btn:{
    width:horizontalScale(65),
    height:verticalScale(34),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.black,
    borderRadius:5
  },
  btntext:{
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.white,
  }
});
