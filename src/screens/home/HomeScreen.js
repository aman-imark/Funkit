import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {colors} from '../../utils/Colors';
import TrendingSection from '../../components/TrendingSection';
import ProductSection from '../../components/ProductSection';
import { getData } from '../../apis/services';
import Loading from '../../utils/Loading';
import SwitchMainHeader from '../../components/Header/SwitchMainHeader';

const HomeScreen = ({navigation}) => {
  const [isLoading,setIsLoading] = useState(false)
  const [trending_Cat,setTrending_Cat] =useState(null)
  const [products,setProducts] =useState(null)
  const [refreshing, setRefreshing] = useState(false);

  const getCategories = ()=>{
    setIsLoading(true);
    setRefreshing(true);
    getData('/home-trending-cat-api/v1/homeTrendingCat').then((res)=>{
      if (res.status==='Success') {
        setTrending_Cat(res.data)
      }else{
        // console.log('trending categories',res);
        Toast.show('Something went wrong!', Toast.LONG);
      }
      setIsLoading(false)
      setRefreshing(false)
    }).catch((err)=>{
      setIsLoading(false)
      setRefreshing(false)
      Toast.show('Something went wrong!'+err, Toast.LONG);
      console.log(err)
    })
  }
  const getHomeProducts = ()=>{
    setIsLoading(true);
    getData('/home-products-api/v1/homeProducts').then((res)=>{
      if (res.status==='Success') {
        setProducts(res.data)
      }else{
        // console.log('Products :',res);
        Toast.show('Something went wrong!', Toast.LONG);
      }
      setIsLoading(false)
      setRefreshing(false)
    }).catch((err)=>{
      setIsLoading(false)
      setRefreshing(false)
      Toast.show('Something went wrong!'+err, Toast.LONG);
      console.log(err)
    })
  }
  useEffect(()=>{
    getCategories();
    getHomeProducts();
  },[])

  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />

      <SwitchMainHeader drawer={()=>navigation.openDrawer()} route={navigation} />
      <ScrollView  
        contentContainerStyle={{ paddingBottom:100}} 
        nestedScrollEnabled={true}
        refreshControl={
            <RefreshControl
              tintColor={colors.AppDefaultColor}
              refreshing={refreshing}
              onRefresh={()=>{
                getCategories();
                getHomeProducts();
              }}
              colors={[colors.AppDefaultColor, '#FF5733', '#5733FF']}
            />
          }>
        <TrendingSection navigation={navigation} trending_Cat={trending_Cat}  />
        <ImageBackground
          style={{flex: 1,}}
          source={require('../../assets/images/background.png')}>
          <ProductSection products={products} navigation={navigation} />
        </ImageBackground>
      </ScrollView>
  
    {isLoading&&<Loading/>}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
});
