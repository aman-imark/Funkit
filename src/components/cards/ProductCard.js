import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import { colors } from '../../utils/Colors';

const ProductCard = ({title,price,imgurl,type,text_color}) => {
    return (
    <View style={styles.card}>
      <View>
        {<Image
          source={{uri:imgurl?imgurl:"https://5.imimg.com/data5/ANDROID/Default/2021/7/VD/GM/DZ/44196072/product-jpeg-500x500.jpg"}}
          style={type=='trend'?styles.trendImg:styles.productimg}
          resizeMethod="resize"
          resizeMode='cover'
        /> }
      </View>
      <View style={styles.cardDetails}>
        <Text numberOfLines={2} style={[styles.itemsTitle,{color:text_color?text_color:colors.txtgrey}]}>{title}</Text>
        {price&&<Text style={styles.itemsPrice}>{price}</Text>}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
    card: {
        gap: 5,
        width: horizontalScale(110),
        },
      trendImg: {
        height: verticalScale(180),
        width: horizontalScale(110),
      },
      productimg: {
        height: verticalScale(115),
        width: horizontalScale(115),
      },
      cardDetails: {
        justifyContent: 'space-between',
        alignItems: 'center',
       },
      itemsTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        color: colors.txtgrey,
        textAlign:'left'
      },
      itemsPrice: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        color: colors.black,
      },
});
