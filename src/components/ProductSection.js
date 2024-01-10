import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import SectionHeader from './Header/SectionHeader';
import {horizontalScale, verticalScale, width} from '../utils/Metrics';
import {colors} from '../utils/Colors';
import ProductCard from './cards/ProductCard';

const ProductSection = ({products,navigation}) => {
  // console.log(products.length)
  const chunkArray = (array, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      if (i<9) {
        chunkedArray.push(array.slice(i, i + chunkSize));
      }
    }
    return chunkedArray;
  };
  
  return (
    <View style={styles.container}>
      <SectionHeader  route={()=>navigation.navigate('Products',products)} title={'Products'} />
      {products&&chunkArray(products,3)?.map((row,rowIndex)=>{return(
      <View key={rowIndex} style={styles.itemsrow}>
        {row.map((item,i) => {return(
          <TouchableOpacity key={i}  onPress={()=>navigation.navigate('Details',item)}>
            <ProductCard  title={item.post_title} imgurl={item.product_image} type={'product'} />
          </TouchableOpacity>
        )})}
        </View>
      )})}
    </View>
  );
};

export default ProductSection;

const styles = StyleSheet.create({
  container: {
    width: width,
    paddingHorizontal: horizontalScale(15),
    gap: 15, 
  },
  itemsrow: {
    flexDirection: 'row',
    // gap:horizontalScale(20),
    justifyContent:'space-around',
   },
   
});
