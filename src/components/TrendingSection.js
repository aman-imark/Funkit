import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../utils/Metrics';
import {colors} from '../utils/Colors';
import SectionHeader from './Header/SectionHeader';
import ProductCard from './cards/ProductCard';

const TrendingSection = ({trending_Cat, navigation}) => {
   return (
    <View style={styles.container}>
      <SectionHeader title={'Trending'} />
      <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} contentContainerStyle={styles.itemsrow}>
      {trending_Cat?.map((cat)=>{
        return(
          <TouchableOpacity onPress={()=>navigation.navigate('Cat_Products',{cat_name:cat?.cat_name})} key={cat.cat_id}>
            <ProductCard title={cat?.cat_name} price={cat?.cat_price} imgurl={cat?.cat_image} type={'trend'} />
          </TouchableOpacity>
        )})} 
        </ScrollView>
    </View>
  );
};

export default TrendingSection;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(15),
    gap: 15,
    height: verticalScale(280)
   },
  itemsrow: {
    flexDirection: 'row',
    gap:10
    // justifyContent:'space-between',
   },
   
});
