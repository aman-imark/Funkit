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
import React, {useState, useEffect} from 'react';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import ProductCard from '../../components/cards/ProductCard';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import data from '../../utils/Data';
import {getData, postData} from '../../apis/services';
import Loading from '../../utils/Loading';
const CategoryProducts = ({navigation, route}) => {
  const [products, setProducts] = useState(null);
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {cat_name} = route.params;
    setCategory(cat_name);
    if (route) {
      getProducts(cat_name);
    }
  }, [route]);

  const getProducts = cat_name => {
    console.log('cat_name', cat_name);
    setIsLoading(true);
    getData('/get-categoriesData/v1/getCategoriesData?cat=' + cat_name)
      .then(res => {
        console.log('cat Products res: ', res);
        if (res.status === 'success') {
          setProducts(res.data);
        } else {
          console.log('Something went wrong!', error);
        }
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#FFF'} barStyle={'dark-content'} />
        {/* <View style={styles.container}> */}
        <MainHeader route={navigation} />
        <ImageBackground
          source={require('../../assets/images/background.png')}
          style={styles.products}>
          <Text style={styles.title}>{category}</Text>
          <FlatList
            numColumns={3}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Details', item)}>
                <ProductCard
                  title={item.post_title}
                  imgurl={item.product_image}
                  type={'product'}
                />
              </TouchableOpacity>
            )}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              paddingBottom: verticalScale(15),
            }}
            keyExtractor={(item, i) => i}
            ListFooterComponent={
              <View style={{height: verticalScale(40), width: '100%'}} />
            }
          />
        </ImageBackground>
        {/* </View> */}
      </SafeAreaView>
      {isLoading && <Loading />}
    </>
  );
};

export default CategoryProducts;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  products: {
    height: '90%',
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
    alignSelf: 'center',
  },
  itemsrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
