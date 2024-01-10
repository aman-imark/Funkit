import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar
} from 'react-native';
import React, {useState} from 'react';
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
import ImagePicker from 'react-native-image-crop-picker';
import BASE_URL, { change_product_list, condition_list, productColors, size_list } from '../../utils/Constants';
import Loading from '../../utils/Loading';


const AddProductScreen = ({navigation}) => {
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


  const PickImage = (setImage,width,height) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImage(image.path);
        console.log(image);
      })
      .catch(e => {
        Alert.alert('Something went wrong'), console.log(e);
      });
    ImagePicker.openPicker({
      width: width,
      height: height,
      cropping: true
    }).then(image => {
      console.log(image);
      setImage(image.path)
    }).catch(e => {
          Alert.alert('Something went wrong'), console.log(e);
    });
  };
  const RemoveImage = (imagepath, setPath) => {
    ImagePicker.cleanSingle(imagepath)
      .then(() => {
        console.log('removed tmp image from tmp directory');
        setPath('');
      })
      .catch(e => {
        Alert.alert(e);
      });
  };

  function handlePress() {
    validateForm();
    const payload= new FormData()
    payload.append('product_Name', name);
    payload.append('Product_Desciption', desc);
    payload.append('color', productColor);
    payload.append('size', size);
    payload.append('condition', condition);
    payload.append('trend', trend);
    payload.append('change_Product_Name', change_Product_Name);
    payload.append('featured_image', {
      uri:image1,
      type: 'image/jpeg',  
      name: 'featured_image.jpg',
    })
    payload.append('First_gallery_image', {
      uri:image2,
      type: 'image/jpeg',  
      name: 'First_gallery_image.jpg',
    })
    payload.append('Second_gallery_image', {
      uri:image3,
      type: 'image/jpeg',  
      name: 'Second_gallery_image.jpg',
    })
    console.log('payload :', payload);
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0){
    setIsLoading(true)
    fetch(BASE_URL+'/add-Product-api/v1/addProduct',{method:'POST',headers:{
        'Content-Type': 'multipart/form-data', 
         'Access-Control-Allow-Origin': '*',
         'mode': 'no-cors'},body:payload})
     .then((res)=>{
      console.log('response',res)
      Toast.show('Product Added Successfully!', Toast.LONG);
      navigation.navigate('List_Products')
      setIsLoading(false)
    })
     .catch((err)=>{ 
      Toast.show(err, Toast.LONG);
      console.log(err)
      setIsLoading(false)
    })
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
    if (!image2) {
      errors.image2 = 'Gallery image is required.';
    }
    if (!image3) {
      errors.image3 = 'Gallery image is required.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    return errors
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />
    <View style={styles.container}>
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>{'Add Product'}</Text>
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
                onPress={() => PickImage(setImage1,230,300)}
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
                onPress={() => PickImage(setImage2,230,300)}
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
                onPress={() => PickImage(setImage3,230,300)}
                style={styles.selectimage}>
                <Icon name={'attachment'} size={20} color={colors.black} />
                <Text style={styles.uploadtext}>Upload image</Text>
              </TouchableOpacity>
              {errors?.image3 && (<Text style={styles.error}>{errors?.image3} </Text> )}
            </>
          )}
        </View>
        <LoginButton handlePress={handlePress} title={'Submit'} />
      </ScrollView>
    </View>
    </SafeAreaView>
    {isLoading &&<Loading/>}
    </>
  );
};

export default AddProductScreen;

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
    height: verticalScale(50),
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
  },
});
