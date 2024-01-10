import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  height,
  horizontalScale,
  verticalScale,
  width,
} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import LoginButton from '../../components/buttons/LoginButton';
import {getData, postData} from '../../apis/services';
import {getAuthToken} from '../../apis/AuthService';
import Loading from '../../utils/Loading';
// import Animated from 'react-native-reanimated';


 const ProductDetailsScreen = ({route, navigation}) => {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(null);
  const checkAuth = async () => {
    const authToken = await getAuthToken();
    setToken(authToken);
  };

  useEffect(() => {
    console.log(route.params);
    setProduct(route.params);
    checkAuth();
    getCartItems();
    getProfile();
  }, []);

  const getCartItems = () => {
    setIsLoading(true);
    postData('/get-cart-items/v1/getCartItems')
      .then(res => {
        console.log('cart items res', res);
        if (res.status === 'success') {
          setCart(res.products_data);
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

  const getProfile = () => {
    setIsLoading(true);
    getData('/user-profile-api/v1/userProfile')
      .then(res => {
        console.log('response : ', res);
        if (res.status === 'ok') {
          setUser(res);
        } else {
          Toast.show(res.success_msg, Toast.LONG);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Toast.show('Somthing went wrong!'+error, Toast.LONG);
        console.log('error', error);
      });
  }; 

  const addToCart = () => {
    console.log('product', product);

    const payload = {
      product_id: product.post_id,
      product_name: product.post_title,
      user_id: user.user_id,
    };
    setIsLoading(true);
    postData('/add-to-cart/v1/ProductAddToCart', payload)
      .then(res => {
        console.log('add to cart res', res);
        if (res.status === 'success') {
          setCart(prev => [...prev, product]);
          Toast.show('Added to Cart', Toast.LONG);
        } else {
          console.log('Something went wrong!', error);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        Toast.show('Network error!', Toast.LONG);
        console.log('error', error);
      });
  };
  //  const foundItem = items.find(item => item.post_id === postIdToFind);
  const isAvailable = cart.find(item => item.post_id == product?.post_id);

  console.log('is item in cart', isAvailable);
 

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: verticalScale(100),}}>
          <ImageBackground
            source={require('../../assets/images/background.png')}
            style={{}}>
            <View style={styles.wrapper}>
              {/* <Swiper
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                activeDotStyle={[
                  {backgroundColor: colors.AppDefaultColor},
                  styles.dot,
                ]}
                loop={true}
                paginationStyle={{gap: 10, bottom: 15}}>
                {product?.product_image && (
              
                    <View style={styles.slide1}>
                    <Animated.Image
                      style={styles.img}
                      source={{uri: product?.product_image}}
                      resizeMethod="resize"
                      resizeMode="contain"
                      />
                  </View>
            
                )}
                {product?.gallery_images[0]?.gallery_images_url && (

                  <View style={styles.slide1}>
                    <Animated.Image
                      style={styles.img}
                      source={{
                        uri: product?.gallery_images[0]?.gallery_images_url,
                      }}
                      resizeMethod="resize"
                      resizeMode="contain"
                    /> 
                  </View>
     
                )}
                {product?.gallery_images[1]?.gallery_images_url && (

                  <View style={styles.slide1}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: product?.gallery_images[1]?.gallery_images_url,
                      }}
                      resizeMethod="resize"
                      resizeMode="contain"
                    />
                  </View>
           
                )}
              </Swiper> */}
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.back}>
                <Icon name={'west'} size={22} color={colors.black} />
              </TouchableOpacity>
            </View>
            <View style={styles.details}>
              <View>
                <Text style={styles.title}>{product?.post_title}</Text>
                <Text style={styles.price}>
                  $
                  {product?.sale_price
                    ? product?.sale_price
                    : product?.regular_price}
                </Text>
                <Text style={styles.desc}>{product?.description}</Text>
              </View>
              {isAvailable ? (
                <LoginButton
                  handlePress={() => navigation.navigate('Cart')}
                  bgColor={colors.AppDefaultColor}
                  title={'Go to Cart'}
                />
              ) : (
                <LoginButton handlePress={addToCart} title={'Add to Cart'} />
              )}
            </View>
          </ImageBackground>
        </ScrollView>
      </SafeAreaView>
      {isLoading && <Loading />}
    </>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: verticalScale(100),
  },
  back: {
    height: 35,
    width: 35,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 15,
    top: 10,
  },
  wrapper: {
    height: verticalScale(340),
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 11,
    width: 11,
    borderRadius: 20,
    backgroundColor: colors.grey,
  },
  activeDot: {
    height: 11,
    width: 11,
    borderRadius: 20,
    backgroundColor: colors.AppDefaultColor,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  img: {
    height: verticalScale(230),
    width: horizontalScale(300),
    position: 'absolute',
  },
  details: {
    backgroundColor: colors.white,
    display: 'flex',
    paddingHorizontal: horizontalScale(25),
    paddingTop: verticalScale(25),
    height: verticalScale(height - verticalScale(340)),
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
  },
  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    fontWeight: '600',
  },
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
});
