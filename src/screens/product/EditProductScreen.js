import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import InputCard from '../../components/cards/InputCard';
import {
  height,
  horizontalScale,
  verticalScale,
  width,
} from '../../utils/Metrics';
import Pickercard from '../../components/cards/Pickercard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginButton from '../../components/buttons/LoginButton';
// import ImagePicker from 'react-native-image-crop-picker';
import BASE_URL, { change_product_list, condition_list, productColors, size_list } from '../../utils/Constants';
import Loading from '../../utils/Loading';
import { postData } from '../../apis/services';
const EditProductScreen = ({route,navigation}) => {
  const [product_Id, setProduct_Id] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [trend, setTrend] = useState('');
  const [productColor, setProductColor] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [change_Product_Name, setChange_Product_Name] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); 
  const [isLoading,setIsLoading] = useState(false)
  const [modalVisible,setModalVisible] = useState(false)
   

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  const PickImage=()=>{console.log('piclke');

    setModalVisible(true)
  }

  const  Gallery =(setImage)=>{
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true
    // }).then(image => {
    //   setImage(image.path);
    //   console.log(image);
    // }).catch(e => {
    //   Alert.alert(e+'Something went wrong');
    //   console.log(e);
    // });
  }

  const Camera = setImage => {
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // })
    //   .then(image => {
    //     setImage(image.path);
    //    })
    //   .catch(e => {
    //     Alert.alert('Something went wrong');
    //     console.log(e);
    //   });
  };
  const RemoveImage = (imagepath, setPath) => {
    setPath('')
    // ImagePicker.cleanSingle(imagepath)
    //   .then(() => {
    //     console.log('removed tmp image from tmp directory');
    //     setPath('');
    //   })
    //   .catch(e => {
    //     Alert.alert(e);
    //   });
  };

  const ChooseOption=({modalVisible,setModalVisible})=>{
    return(
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
      
      >
      <View>
        <View style={styles.modalview}>
          <TouchableOpacity style={styles.btn}>
              <Text style={styles.btntext}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            {/* <TouchableOpacity style={styles.btn} onPress={() => {setModalVisible(false)}}> */}
              <Text style={styles.btntext}>Choose from Gallery</Text>
            {/* </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.btn} onPress={confirm_Delete}> */}
              {/* <Text style={styles.btntext}>OK</Text> */}
            {/* </TouchableOpacity> */}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    )
  }

  function handlePress() {
    validateForm();
    const payload={
      'product_Name': name,
      'Product_Desciption': desc,
      'color': productColor,
      'size': size,
      'condition': condition,
      'trend': trend,
      'change_Product_Name': change_Product_Name,
      'featured_image': {
           uri:image1,
           type: 'image/jpeg',  
           name: 'featured_image.jpg',
         },
      'First_gallery_image': {
           uri:image2,
           type: 'image/jpeg',  
           name: 'First_gallery_image.jpg',
         },
      'Second_gallery_image': {
            uri:image3,
            type: 'image/jpeg',  
            name: 'Second_gallery_image.jpg',
          }      
    }

    console.log('payload :', payload);

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0){
    setIsLoading(true)
    postData('/edit-product-api/v1/editProduct?id='+product_Id,payload)
     .then((res)=>{
      console.log('response',res)
      if (res.status==='error') {
        console.log('error :',res.error_msg);
        setErrors({error:res.error_msg})
        Toast.show(res.error_msg, Toast.LONG);
      } else {
        Toast.show('Product Updated Successfully!', Toast.LONG);
        navigation.navigate('List_Products')
      }
      setIsLoading(false)
        
    })
     .catch((err)=>{ 
      Toast.show(err, Toast.LONG);
      console.log(err)
      setIsLoading(false)
    })
      // console.log('validation')
    }
  }

  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = 'Name is required.';
    }

    if (!desc) {
      errors.desc = 'Desription is required.';
    } 

    if (!productColor) {
      errors.productColor = 'Product Color is required.';
    }

    if (!size) {
      errors.size = 'Size is required.';
    }
    if (!condition) {
      errors.condition = 'Condition is required.';
    }
    if (!trend) {
      errors.trend = 'Trend is required.';
    }
    if (!change_Product_Name) {
      errors.change_Product_Name = 'Change Product Name is required.';
    }
    if (!image1) {
      errors.image1 = 'Featured image is required.';
    }
    // if (!image2) {
    //   errors.image2 = 'Gallery image is required.';
    // }
    // if (!image3) {
    //   errors.image3 = 'Gallery image is required.';
    // }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    return errors
  };
    useEffect(()=>{
      const data= route.params
      console.log("productDetails",data);
      setProduct_Id(data.post_id)
      setName(data.post_title);
      setDesc(data.content);
      setTrend(data.trend)
      setProductColor(data.color);
      setCondition(data.condition);
      setSize(data.size);
      setChange_Product_Name(data.change_Product_Name);
      setImage1(data.featured_img);
      setImage2(data.gallery_img_one);
      setImage3(data.gallery_img_two);
    },[])
  
    return (
      <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />
      {/* <View style={styles.container}> */}
        <MainHeader route={navigation} />
        <View style={styles.titlerow}>
          <Text style={styles.title}>Edit Product</Text>
        </View>
        <ScrollView bounces={false} scrollEnabled={true} contentContainerStyle={styles.wrapper}>
        <InputCard
          title={'Name'}
          value={name}
          handleInput={setName}
          placeholder={'Hoodies'}
          error={errors?.name}
        />
        <InputCard
          title={'Product Description'}
          value={desc}
          handleInput={setDesc}
          multiline={true}
          placeholder={'Description'}
          error={errors?.desc}
        />
        <InputCard
          title={'Trend'}
          value={trend}
          handleInput={setTrend}
          placeholder={'Cloth'}
          error={errors?.trend}
        />
        <Pickercard
          title={'Color'}
          handleInput={setProductColor}
          selected={productColor}
          items={productColors}
          error={errors?.productColor}
        />
        <Pickercard
          title={'Condition'}
          handleInput={setCondition}
          selected={condition}
          items={condition_list}
          error={errors?.condition}
        />
        <Pickercard
          title={'Size'}
          handleInput={setSize}
          selected={size}
          items={size_list}
          error={errors?.size}
        />
        <Pickercard
          title={'What they are looking for in return ?'}
          handleInput={setChange_Product_Name}
          selected={change_Product_Name}
          items={change_product_list}
          error={errors?.change_Product_Name}
        />
        <View style={styles.uploadsection}>
          <Text
            style={{
              color: colors.black,
              fontSize: 17,
              fontFamily: 'Poppins-Medium',
            }}>
            Upload images
          </Text>
          {image1 ? (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 'auto',
                borderColor: colors.grey,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: '20',
              }}
              onPress={() => RemoveImage(image1, setImage1)}>
              <Image
                source={{uri: image1}}
                style={{
                  height: 200,
                  width: 160,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => Gallery(setImage1)}
                style={styles.selectimage}>
                <Icon name={'attachment'} size={20} color={colors.black} />
                <Text style={styles.uploadtext}>Upload image</Text>
              </TouchableOpacity>
              {errors?.image1 && (<Text style={styles.error}>{errors?.image1} </Text> )} 
            </>
          )}
          {image2 ? (
            <TouchableOpacity
              style={{
                width: '100%',
                borderColor: colors.grey,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: '20',
              }}
              onPress={() => RemoveImage(image2, setImage2)}>
              <Image
                source={{uri: image2}}
                style={{
                  height: 200,
                  width: 160,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => Gallery(setImage2)}
                style={styles.selectimage}>
                <Icon name={'attachment'} size={20} color={colors.black} />
                <Text style={styles.uploadtext}>Upload image</Text>
              </TouchableOpacity>
              {errors?.image2 && (<Text style={styles.error}>{errors?.image2} </Text> )}
            </>
          )}
          {image3 ? (
            <TouchableOpacity
              style={{
                width: '100%',
                borderColor: colors.grey,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: '20',
              }}
              onPress={() => RemoveImage(image3, setImage3)}>
              <Image
                source={{uri: image3}}
                style={{
                  height: 200,
                  width: 160,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => Gallery(setImage3)}
                style={styles.selectimage}>
                <Icon name={'attachment'} size={20} color={colors.black} />
                <Text style={styles.uploadtext}>Upload image</Text>
              </TouchableOpacity>
              {errors?.image3 && (<Text style={styles.error}>{errors?.image3} </Text> )}
            </>
          )}
          </View>
          {errors?.error && (<Text style={styles.error}>{errors?.error} </Text> )}
          <LoginButton handlePress={handlePress} title={'Submit'} />
        </ScrollView>
      {/* </View> */}
      </SafeAreaView>
      <ChooseOption modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {isLoading&&<Loading/>}
      </>
    );
  };

export default EditProductScreen

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
      uploadsection: {
        width: '100%',
        gap: 15,
      },
      selectimage: {
        flexDirection: 'row',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderCurve: 'circular',
        height: verticalScale(30),
        borderColor: colors.grey,
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 15,
      },
      uploadtext: {
        fontFamily: 'Poppins-Regular',
        fontSize: 11,
        color: colors.black,
      },
      inputBox: {
        height: verticalScale(53),
        width: '100%',
        borderWidth: 1,
        borderColor: colors.grey,
        paddingHorizontal: horizontalScale(18),
      },
      inputtitle: {
        color: colors.black,
        fontSize: 17,
        fontFamily: 'Poppins-Medium',
      },
      error: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        alignSelf:'center'
      },
      
  modalview: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    marginHorizontal:horizontalScale(30),
    top:horizontalScale(300),
    gap:20
  },
  
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.black,
    textAlign:'center'
  },
  btnrow: {
    flexDirection: 'row',
    gap: 15,
    marginTop:verticalScale(25)
  },
  btn:{
    height:verticalScale(40),
    backgroundColor:colors.AppDefaultColor,
    paddingHorizontal:horizontalScale(30),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4,
    width:'100%'
  },
  btntext:{
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: colors.white,
    textAlign:'center'
  }
})