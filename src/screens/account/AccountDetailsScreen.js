import {StyleSheet, Text, View,SafeAreaView,StatusBar} from 'react-native';
import React, {useState} from 'react';
import InputCard from '../../components/cards/InputCard';
import {ScrollView} from 'react-native-gesture-handler';
import MainHeader from '../../components/Header/MainHeader';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import LoginButton from '../../components/buttons/LoginButton';
import { postData } from '../../apis/services';

const AccountDetailsScreen = ({navigation}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [current_Password, setCurrent_Password] = useState('');
  const [new_Password, setNew_Password] = useState('');
  const [confirm_New, setConfirm_New] = useState('');

  const handlePress = ()=>{
    const payload={
      'first_name':firstname,
      'last_name':lastname,
      'password':current_Password,
      'new_password':new_Password,
      'confim_password':confirm_New
    }
    postData('/account-details-api/v1/accountDetails',payload).then((res)=>{
      console.log('res',res);
    }).catch((err)=>{
      console.log('error',err);
    })
  }

  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />
      {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Account details</Text>
      </View>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <InputCard
          title={'First name'}
          value={firstname}
          handleInput={setFirstname}
          placeholder={'First name'}
        />
        <InputCard
          title={'Last name'}
          value={lastname}
          handleInput={setLastname}
          multiline={true}
          placeholder={'Last name'}
        />
        <InputCard
          title={'Display name'}
          value={displayName}
          handleInput={setDisplayName}
          multiline={true}
          placeholder={'Display name'}
        />
        {/* <InputCard
          title={'Email address'}
          value={email}
          handleInput={setEmail}
          multiline={true}
          placeholder={'raj.mansoori@gmail.com'}
        /> */}
        <Text style={[{fontSize: 23, marginTop:verticalScale(40)}, styles.title]}>Password change</Text>
        <InputCard
          title={'Current password '}
          value={current_Password}
          handleInput={setCurrent_Password}
          multiline={true}
          placeholder={'Enter Current Password'}
        />
        <InputCard
          title={'New password '}
          value={new_Password}
          handleInput={setNew_Password}
          multiline={true}
          placeholder={'Enter New password '}
        />
        <InputCard
          title={'Confirm new password'}
          value={confirm_New}
          handleInput={setConfirm_New}
          multiline={true}
          placeholder={'Confirm New Password'}
        />
        <LoginButton title={'Save changes'} />
      </ScrollView>
      {/* </View> */}
      
    </>
  );
};

export default AccountDetailsScreen;

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
});
