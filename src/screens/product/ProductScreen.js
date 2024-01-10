import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import ProductCard from '../../components/cards/ProductCard';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import data from '../../utils/Data';
const ProductScreen = ({route,navigation}) => {
const [products,setProducts] =useState()
const [isLoading,setIsLoading] = useState(false)

useEffect(()=>{
setProducts(route.params)
},[])
console.log('prooducts',products);
   
  
  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />
      {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <ImageBackground
        source={require('../../assets/images/background.png')}
        style={styles.products}>
        <View style={styles.titlerow}>
          <Text style={styles.title}>{'Products'}</Text>
        </View>
          <FlatList
            numColumns={3}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item,i}) => (
              <TouchableOpacity   onPress={()=>navigation.navigate('Details',item)}>
                <ProductCard
                  title={item.post_title}
                  imgurl={item.product_image}
                  type={'product'}
                />
              </TouchableOpacity>
            )}
            columnWrapperStyle={{gap:horizontalScale(12), paddingBottom:verticalScale(15)}}
            keyExtractor={item => item.post_id}
            ListFooterComponent={<View style={{height:verticalScale(40),width:'100%'}} />}
          />
      </ImageBackground>
      {/* </View> */}
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  products: {
    height:"90%",
    gap: 15,
    paddingHorizontal: horizontalScale(15),
  },
  titlerow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
  }, 
});
