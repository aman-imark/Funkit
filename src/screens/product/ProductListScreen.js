import {StyleSheet, Text, View, TouchableOpacity, Image,FlatList,SafeAreaView,StatusBar} from 'react-native';
import React, { useState,useEffect } from 'react';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import {Swipeable} from 'react-native-gesture-handler';
import DeleteModal from '../../components/modals/DeleteModal';
import { getData, postData } from '../../apis/services';
import Loading from '../../utils/Loading';

const ProductListScreen = ({navigation}) => {
  const [products_list,setProduct_list]=useState([])
  const [isLoading,setIsLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  
  const getProducts =()=>{ 
    setIsLoading(true);  
    postData('/list-products-api/v1/listProducts')
      .then((res)=>{
        console.log('Something res ',res)
        if (res.status==='success') {
          const list =res?.products_data
          if (list) {
            setProduct_list(list)
          }
        }else{
          console.log('Something went wrong ',res)
        }
        setIsLoading(false)
      })
      .catch((error)=>{
        setIsLoading(false)
        Toast.show('Somthing went wrong!!', Toast.LONG);
        console.log('error',error)
      })
  } 

  

  useEffect(() => {
    getProducts();
  }, []);
   
  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />
      {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>List Products</Text>
      </View>
      <View style={styles.wrapper}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: 20}}
          data={Object.values(products_list)}
          renderItem={({item,i}) => {
             return <Item  editRoute={()=>navigation.navigate('EditProduct',item)} modalVisible={modalVisible}  setModalVisible={setModalVisible} item={item} index={i} />;
          }}
          keyExtractor={item => item.post_id}
          ListFooterComponent={<View style={{height:verticalScale(60),width:'100%'}} />}
        />
      </View>
      {/* </View> */}
      
    {isLoading&&<Loading/>}
    </>
  );
};

export default ProductListScreen;

const Item = ({editRoute,modalVisible, setModalVisible,item,index}) => {
  const deleteProduct=()=>{
    postData('/delete-product-api/v1/deleteProduct?id='+item.post_id).then((res)=>{
      console.log('delete res',res)
    }).catch((error)=>{
      console.log('error',error);
    })
  }
   const renderLeftActions = () => {
    return (
      
        <View style={styles.rightaction}>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.swipebtn}>
            <Image
              source={require('../../assets/images/delete.png')}
              style={styles.swipeicon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={editRoute} style={styles.swipebtn}>
            <Image
              source={require('../../assets/images/edit.png')}
              style={styles.swipeicon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.swipebtn}>
            <Image
              source={require('../../assets/images/Show.png')}
              style={styles.swipeicon}
            />
          </TouchableOpacity>
        </View>
    );
  };
  return (
    <>
    <Swipeable renderRightActions={renderLeftActions}>
      <View style={styles.swipable}>
        <View style={styles.image}>
        {
          item?.featured_img&&
          <Image source={{uri:item.featured_img}} style={styles.image} />
        }
        </View>
        <View style={styles.details}>
          <Text style={styles.productName}>{item?.post_title}</Text>
          <Text numberOfLines={1}  style={styles.productDesc}>
            {item?.content}
          </Text>
        </View>
      </View>
    </Swipeable>
    <DeleteModal modalVisible={modalVisible} deleteProduct={deleteProduct} setModalVisible={setModalVisible} />

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
});
