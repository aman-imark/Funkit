import {StyleSheet, Text, View, TouchableOpacity, Image, FlatList,SafeAreaView,StatusBar} from 'react-native';
import React, { useState,useEffect } from 'react';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import {Swipeable} from 'react-native-gesture-handler'; 
import Loading from '../../utils/Loading';

const OrdersScreen = ({navigation}) => {
  const [isLoading,setIsLoading] = useState(false)
  return (
    <>
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />
    <View style={styles.container}>
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Orders</Text>
      </View>
      <View style={styles.wrapper}>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 20}}
          data={Object.values(products_list)}
          renderItem={({item,i}) => {
             return <Item  item={item} index={i} />;
          }}
          keyExtractor={item => item.post_id}
          ListFooterComponent={<View style={{height:verticalScale(60),width:'100%'}} />}

        /> */}
      </View>
    </View>
    </SafeAreaView>
    {isLoading&&<Loading/>}
    </>
  )
}

export default OrdersScreen

const Item = ({editRoute,item,index}) => {
  
  
  return (
    <>
    <View renderRightActions={renderLeftActions}>
      <View style={styles.swipable}>
        <Image source={{uri:item?.featured_img}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.productName}>{item?.post_title}</Text>
          <Text numberOfLines={1}  style={styles.productDesc}>
            {item?.content}
          </Text>
        </View>
      </View>
    </View> 
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: horizontalScale(20),
    gap: 20,
    paddingBottom: 100,
    paddingTop: verticalScale(20),
    overflow:'hidden'
  },
  titlerow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
  },
  swipable: {
    backgroundColor:colors.white,
    height: verticalScale(90),
    width: '100%',
    borderRadius: 10,
    gap:12,
    // borderTopLeftRadius:10,
    // borderBottomLeftRadius:10,
    borderWidth: 1,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    padding:horizontalScale(12)
  },
  details:{
    width:'80%',
  },
  productName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: colors.black,
  },
  productDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.black,
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  image: {
    height: verticalScale(60),
    width: horizontalScale(80),
    resizeMode: 'contain',
  },
  rightaction: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.grey,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  swipeicon: {
    height: verticalScale(22),
    width: horizontalScale(22),
    resizeMode: 'contain',
  },
  swipebtn: {
    width: horizontalScale(60),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.grey,
  },
})