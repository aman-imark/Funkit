import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  RefreshControl,
  Pressable,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import {FlatList, Swipeable} from 'react-native-gesture-handler';
import DeleteModal from '../../components/modals/DeleteModal';
import {getData, postData} from '../../apis/services';
import Loading from '../../utils/Loading';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import ActionSheet from 'react-native-actions-sheet';
import LoginButton from '../../components/buttons/LoginButton';

const Cart_Screen = ({navigation}) => {
  const [cart_Items, setCart_Items] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [numsProduct, setNumsProduct] = useState(0);
  const [total_Price, setTotal_Price] = useState(0);

  // const actionSheetRef = useRef(null);

  const getTotalPrice = items => {
    let total = 0;
    items.map(item => {
      let price = +item?.sale_price ? item?.sale_price : item?.regular_price;
      total += parseInt(price);
    });
    return total;
  };

  const get_Cart = () => {
    setIsLoading(true);
    postData('/get-cart-items/v1/getCartItems')
      .then(res => {
        if ((res.status = 'success')) {
          const cart = res.products_data;
          console.log('cart items res', res);
          if (cart) {
            setNumsProduct(cart.length);
            setTotal_Price(getTotalPrice(cart));
            setCart_Items(cart);
            console.log(
              'Number of products',
              numsProduct,
              'and total price ',
              total_Price,
            );
          }
        } else {
          console.log('error something went wrong!');
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const removeItem = (id, price) => {
    setIsLoading(true);
    setRefreshing(true);
    getData('/delete-cart-items-api/v1/deleteCartItems?id=' + id)
      .then(res => {
        console.log('delete res', res);
        if (res.status === 'Success') {
          setCart_Items(prevProducts =>
            prevProducts.filter(product => product.post_id !== id),
          );
          setNumsProduct(prev => prev - 1);
          setTotal_Price(prev => prev - price);

          Toast.show('Item Successfully deleted from cart!', Toast.LONG);
        } else {
          Toast.show('Something went wrong!!', Toast.LONG);
          console.log('Something went wrong!');
        }
        setIsLoading(false);
        setRefreshing(false);
      })
      .catch(error => {
        setIsLoading(false);
        setRefreshing(false);
        console.log('error', error);
      });
  };

  useEffect(() => {
    get_Cart();
    // console.log('cart :',cart_Items)
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
        {/* <View style={styles.container}> */}
        <MainHeader route={navigation} />
        <View style={styles.titlerow}>
          <Text style={styles.title}>cart </Text>
        </View>
        <View style={styles.wrapper}>
          {cart_Items && cart_Items.length !== 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{gap: 20}}
              data={cart_Items}
              renderItem={({item}) => {
                return (
                  <Pressable>
                    <Item
                      editRoute={() => navigation.navigate('EditProduct')}
                      removeItem={removeItem}
                      item={item}
                    />
                  </Pressable>
                );
              }}
              keyExtractor={item => item.post_id}
              // refreshControl={<RefreshControl
              //   colors={[colors.AppDefaultColor, '#FF5733', '#5733FF']}
              //   refreshing={refreshing}
              //   onRefresh={get_Cart}
              // />}
              ListFooterComponent={
                <View style={styles.price_container}>
                  <View>
                    <Text style={styles.productName}>Price Details</Text>
                    <View style={styles.price_row}>
                      <Text style={styles.price_Text}>
                        Price {'(' + numsProduct + ' Items )'}
                      </Text>
                      <Text style={styles.price_Text}>${total_Price} </Text>
                    </View>
                    <View style={styles.price_row}>
                      <Text style={styles.price_Text}>Dilevery Charges </Text>
                      <Text style={[styles.price_Text, {color: 'green'}]}>
                        Free Dilevery
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.price_row]}>
                    <Text style={styles.productName}>Total Amount</Text>
                    <Text style={[styles.price_Text, {fontSize: 14}]}>
                      ${total_Price}
                    </Text>
                  </View>
                  {/* <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current?.show();
                    }}
                    style={styles.order}>
                    <Text style={[styles.productName, {color: colors.white}]}>
                      Checkout
                    </Text>
                  </TouchableOpacity> */}
                </View>
              }
            />
          ) : (
            <View>
              <Image
                source={require('../../assets/images/empty-cart.png')}
                style={{
                  height: verticalScale(250),
                  width: horizontalScale(250),
                  alignSelf: 'center',
                  top: verticalScale(100),
                }}
              />
            </View>
          )}
          {/* <ActionSheet ref={actionSheetRef} gestureEnabled={true}> */}
            <View style={styles.actionsheet}>
              <View style={styles.content}>
                <View style={styles.actionsheettitle}>
                  <Text style={styles.fontStyle}>Checkout</Text>
                  {/* <TouchableOpacity
                    onPress={() => {
                      actionSheetRef.current?.hide();
                    }}>
                    <Icon name="close" size={35} color={colors.black} />
                  </TouchableOpacity> */}
                </View>
                <Pressable
                  // onPress={() => props.navigation.navigate('CurrentLocation')}
                  style={styles.contentList}>
                  <Text style={styles.listLeftText}>Delivery Address</Text>
                  <View style={styles.contentRightstyle}>
                    <Text numberOfLines={1} style={styles.listRightText}>
                      {
                        // profile && profile.AddressLine1 && profile.AddressLine1 && profile.AddressLine1 && profile.City ?
                        //     profile.AddressLine1.trim() + ', ' + profile.AddressLine2.trim() + ', ' + profile.AddressLine3.trim() + ', ' + profile.City.trim() :
                        'Select Address'
                      }
                    </Text>
                    <Icon
                      name="keyboard-arrow-right"
                      size={25}
                      color={colors.black}
                    />
                  </View>
                </Pressable>
                <View style={styles.contentList}>
                  <Text style={styles.listLeftText}>Payment</Text>
                  <View style={styles.contentRightstyle}>
                    <Text style={styles.listRightText}>Payment</Text>
                    <Icon
                      name="keyboard-arrow-right"
                      size={25}
                      color={colors.black}
                    />
                  </View>
                </View>
                <View style={styles.contentList}>
                  <Text style={styles.listLeftText}>Total Cost</Text>
                  <View style={styles.contentRightstyle}>
                    <Text style={styles.listRightText}>${total_Price}</Text>
                    <Icon
                      name="keyboard-arrow-right"
                      size={25}
                      color={colors.black}
                    />
                  </View>
                </View>

                <LoginButton
                  title={'Place Order'}
                  handlePress={() =>
                    navigation.navigate('Checkout', {amount: total_Price})
                  }
                />
              </View>
            </View>
          {/* </ActionSheet> */}
        </View>
        {/* </View> */}
      </SafeAreaView>
      {isLoading && <Loading />}
    </>
  );
};

export default Cart_Screen;
const Item = ({editRoute, setModalVisible, item, removeItem}) => {
  return (
    <View style={styles.swipable}>
      <Image source={{uri: item?.product_image}} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.productName}>
          {item?.post_title}
        </Text>
        <Text numberOfLines={1} style={styles.productDesc}>
          ${item?.sale_price ? item?.sale_price : item?.regular_price}
        </Text>
        <TouchableOpacity
          onPress={() => {
            removeItem(
              item?.post_id,
              item?.sale_price ? item?.sale_price : item?.regular_price,
            );
          }}
          style={styles.deleteBtn}>
          <Text style={[styles.title, {fontSize: 14, color: '#FE0000'}]}>
            Remove
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    overflow: 'hidden',
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
    backgroundColor: colors.white,
    height: verticalScale(120),
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    padding: horizontalScale(12),
  },
  details: {
    width: '80%',
    height: '100%',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: colors.black,
  },
  productDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.black,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
  image: {
    height: verticalScale(100),
    width: horizontalScale(80),
    resizeMode: 'cover',
  },
  deleteBtn: {
    height: verticalScale(30),
    paddingHorizontal: horizontalScale(12),
    borderWidth: 1,
    borderColor: '#FE0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: '40%',
  },
  price_container: {
    height: verticalScale(200),
    marginBottom: verticalScale(60),
    padding: 12,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.grey,
    justifyContent: 'space-between',
  },
  price_row: {
    height: verticalScale(25),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price_Text: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
  order: {
    backgroundColor: colors.AppDefaultColor,
    width: '100%',
    paddingHorizontal: horizontalScale(12),
    height: verticalScale(40),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  actionsheet: {
    width: '100%',
    height: 430,
    maxHeight: '100%',
    // backgroundColor: colors.bg
  },
  content: {
    width: '90%',
    alignSelf: 'center',
  },
  actionsheettitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  fontStyle: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 22,
  },
  contentList: {
    borderTopWidth: 0.5,
    borderColor: colors.grey,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listLeftText: {
    fontSize: 18,
    color: colors.grey,
  },
  contentRightstyle: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listRightText: {
    width: '90%',
    fontSize: 18,
    color: colors.black,
    paddingRight: 10,
  },
  terms: {
    fontSize: 15,
    color: colors.grey,
    marginBottom: 25,
  },
});
