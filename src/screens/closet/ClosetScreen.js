import {Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,SafeAreaView,StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import ImagePicker from 'react-native-image-crop-picker';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';
import InputCard from '../../components/cards/InputCard';
import Pickercard from '../../components/cards/Pickercard';
import LoginButton from '../../components/buttons/LoginButton';
import { getData, postData } from '../../apis/services';
import Loading from '../../utils/Loading';

const ClosetScreen = ({route,navigation}) => {
  
  const [profile_Details, setProfile_Details] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [font, setFont] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [backgroundImg, setBackgroundImg] = useState('');
  const [isLoading,setIsLoading] = useState(false)

  const getProfile =()=>{
    setIsLoading(true)
    getData('/user-profile-api/v1/userProfile').then((res)=>{
      console.log('response : ',res)
      if (res.status==='ok') {
        setProfile_Details(res)
        setName(res.user_name)
        setBio(res.bio)
        setFont(res.font)
        setProfileImg(res.profile_image)
        setBackgroundImg(res.background_image)
       }else{
        Toast.show('Something went wrong!', Toast.LONG);
      }
      setIsLoading(false)
    }).catch((error)=>{
      setIsLoading(false)
      Toast.show(error, Toast.LONG);
      console.log('error',error)
    })
  }
  useEffect(()=>{
    getProfile();
  },[])

  const handleUpdate =()=>{
    const payload = {
      name:name,
      bio:bio,
      font:font,
      profile_image: {
        uri:profileImg,
        type: 'image/jpeg',  
        name: 'featured_image.jpg',
      },
      background_image: {
        uri:backgroundImg,
        type: 'image/jpeg',  
        name: 'featured_image.jpg',
      }
    }

    console.log('Payload : ',payload)
    setIsLoading(true)
    postData('/edit-profile-api/v1/editProfile',payload).then((res)=>{
      console.log('edit response : ',res)
        
      if (res.status==='ok') {
        Toast.show(res.success_msg, Toast.LONG);
        navigation.navigate('Profile')
      }
      // console.log('response',res)
      setIsLoading(false)
    }).catch((error)=>{
      setIsLoading(false)
      Toast.show('something went wrong', Toast.LONG);
      console.log('something went wrong', error)
    })
  }

  const fontsitem =[
    {id:1, name:'Poppins'},
    {id:2, name:'Sans Serif'},
    {id:3, name:'Roboto'},
  ]

  {/* Image Picker */}
  const PickImage = (setImage,width,height) => {
    // ImagePicker.openCamera({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // })
    //   .then(image => {
    //     setImage(image.path);
    //     console.log(image);
    //   })
    //   .catch(e => {
    //     Alert.alert('Something went wrong'), console.log(e);
    //   });
    // ImagePicker.openPicker({
    //   width: width,
    //   height: height,
    //   cropping: true
    // }).then(image => {
    //   console.log(image);
    //   setImage(image.path)
    // }).catch(e => {
    //       Alert.alert('Something went wrong'), console.log(e);
    // });
  };
  {/* Image Remove */}
  const RemoveImage = (imagepath, setPath) => {
    // ImagePicker.cleanSingle(imagepath)
    //   .then(() => {
    //     console.log('removed tmp image from tmp directory');
    //     setPath('');
    //   })
    //   .catch(e => {
    //     Alert.alert(e);
    //   });
  };

  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />
      {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <InputCard
          title={'Name'}
          value={name}
          handleInput={setName}
          placeholder={'Hoodies'}
        />
        <InputCard
          title={'Bio'}
          value={bio}
          handleInput={setBio}
          multiline={true}
          placeholder={'Hoodises'}
        />
         <Pickercard
          title={'Font'}
          handleInput={setFont}
          selected={font}
          items={fontsitem}
        />
          
        {/* <View style={styles.card}>
          <Text style={styles.cardtitle}>Upload Profile image</Text>
          {profileImg ? (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 'auto',
                borderColor: colors.grey,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: '20',
              }}
              onPress={() => RemoveImage(profileImg, setProfileImg)}>
              <Image
                source={{uri: profileImg&&profileImg}}
                style={{
                  height: 200,
                  width: 160,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => PickImage(setProfileImg,180,200)}
              style={styles.selectimage}>
              <Icon name={'attachment'} size={20} color={colors.black} />
              <Text style={styles.uploadtext}>Upload image</Text>
            </TouchableOpacity>
          )}
        </View> */}
        {/* <View style={styles.card}>
          <Text style={styles.cardtitle}>Upload Background image</Text>
          {backgroundImg ? (
            <TouchableOpacity
              style={{
                width: '100%',
                height: 'auto',
                borderColor: colors.grey,
                borderWidth: 1,
                borderStyle: 'dashed',
                padding: '20',
              }}
              onPress={() => RemoveImage(backgroundImg, setBackgroundImg)}>
              <Image
                source={{uri: backgroundImg&&backgroundImg}}
                style={{
                  height: 170,
                  width: 365,
                  alignSelf: 'center',
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => PickImage(setBackgroundImg,365,170)}
              style={styles.selectimage}>
              <Icon name={'attachment'} size={20} color={colors.black} />
              <Text style={styles.uploadtext}>Upload image</Text>
            </TouchableOpacity>
          )}
        </View> */}
        {/* <LoginButton handlePress={handleUpdate} title={'Submit'} /> */}
      </ScrollView>
      {/* </View> */}
 
    {isLoading&&<Loading/>}
    </>
  );
};

export default ClosetScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
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
  wrapper: {
    width: '100%',
    paddingTop:verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    gap: 20,
    paddingBottom: 100,
  },
  card:{
    width:'100%',
    gap:8
  },
   cardtitle:{
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.black,
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
});
