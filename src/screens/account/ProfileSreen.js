import {StyleSheet, Text, View, Image, TouchableOpacity,StatusBar,SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {colors} from '../../utils/Colors';
import {horizontalScale, verticalScale, width} from '../../utils/Metrics';
import { getData } from '../../apis/services';
import Loading from '../../utils/Loading';

const ProfileSreen = ({navigation}) => {

  const [isLoading,setIsLoading] = useState(false)
  const [profile, setProfile] =useState(null)
  const getProfile =()=>{
    setIsLoading(true)
    getData('/user-profile-api/v1/userProfile').then((res)=>{
      console.log('response : ',res)
      if (res.status==='ok') {
        setProfile(res)
      }else{
        Toast.show(res.success_msg, Toast.LONG);
      }
      setIsLoading(false)
    }).catch((error)=>{
      setIsLoading(false)
      Toast.show('Something went wrong!'+error, Toast.LONG);
      console.log('error',error)
    })
  }
  useEffect(()=>{
    getProfile();
  },[])
  return (
    <>
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />

    <View style={styles.container}>
      <MainHeader route={navigation} />
      {/* <View style={styles.titlerow}> */}
        <Text style={styles.title}>{profile?.user_name} </Text>
      {/* </View> */}
      <View style={styles.details}>
      <View style={styles.post}>
        {profile?.background_image&&<Image
          source={ {uri:profile?.background_image}}
          style={{height: '100%', width: '100%', resizeMode: 'cover',objectFit:'fill',backfaceVisibility:'visible'}}
        />}
      </View>
        <View style={styles.detailsheader}>
          <View style={styles.left}>
            <View style={styles.profileimg}>
              <Image
                source={profile?.profile_image?{uri:profile?.profile_image}:require('../../assets/images/profileuser.png')}
                style={{height: '100%', width: '100%', resizeMode: 'stretch'}}
              />
            </View>
            <Text style={styles.name}>{profile?.user_name}</Text>
          </View>
          <TouchableOpacity onPress={()=>{navigation.navigate('My_Closet',profile)}}>
          <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.biosection}>
          <Text style={styles.biotitle}>Profile Bio</Text>
          <Text style={styles.desc}>
            {profile?.bio}
          </Text>
        </View>
      </View>
      <View style={styles.swapsection}>
        <Text style={styles.swaptitle}>Swap items</Text>
        <View style={styles.itemsrow}>
          <Item title={'Hoodie'} image={require('../../assets/images/Mask5.png')} />
          <Item title={'Coat'} image={require('../../assets/images/Mask6.png')} />
          <Item title={'Shirt'} image={require('../../assets/images/Mask7.png')} />
        </View>
      </View>
    </View>
    </SafeAreaView>
    {isLoading&&<Loading/>}
    </>
  );
};
const Item = ({title,image}) => {
  return (
    <View style={styles.swapitem}>
      <Image
        style={styles.itemimg}
        source={image}
      />
      <Text style={styles.itemname}>{title} </Text>
      <TouchableOpacity style={styles.itembtn}>
        <Text style={styles.btntext}>Swap</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProfileSreen;

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
    fontWeight: '600',
    alignSelf:'center'
  },
  post: {
    height: verticalScale(170),
    // width: width,
    borderRadius: 20,
    backgroundColor:colors.grey
  },
  details: {
    width: width,
    paddingHorizontal: horizontalScale(15),
    marginTop: verticalScale(10),
    gap: verticalScale(20),
  },
  detailsheader: {
    height: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profileimg: {
    height: 48,
    width: 48,
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: colors.grey,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: colors.black,
    fontWeight: '600',
  },
  edit: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: colors.black,
    fontWeight: '600',
  },
  biosection: {
    width: width,
    gap: 5,
  },
  biotitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.black,
  },
  swapsection: {
    width: width,
    paddingHorizontal: horizontalScale(15),
    marginTop:verticalScale(20),
    gap:15
  },
  swaptitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
    alignSelf: 'center',
  },
  itemsrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swapitem: {
    // width:horizontalScale(115),
    gap: 13,
    alignItems: 'center',
  },
  itemimg: {
    height: verticalScale(115),
    width: horizontalScale(115),
  },
  itemname: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.black,
    fontWeight: '600',
    alignSelf: 'center',
  },
  itembtn: {
    height: verticalScale(35),
    width: horizontalScale(105),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  btntext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.white,
    fontWeight: '600',
  },
});
