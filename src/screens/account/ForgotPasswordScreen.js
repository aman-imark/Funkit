import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../utils/Colors';
import InputCard from '../../components/cards/InputCard';
import LoginButton from '../../components/buttons/LoginButton';
import AccHeader from '../../components/Header/AccHeader';
import { postData } from '../../apis/services';
import Loading from '../../utils/Loading';
import Toast from 'react-native-simple-toast';


const ForgotPasswordScreen = () => {
    
  const [email, setEmail] = useState(''); 
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false); 
    const [isLoading, setIsLoading] = useState(false); 
    
  
    const validateForm = () => {
      let errors = {};

      // Validate email field
      if (!email) {
        errors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is invalid.';
      }
      setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
      return errors
    };
  
  
  
    const handlePress = () => {
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0){
      if (isFormValid) {
        setIsLoading(true)
        postData('/forgot-password-api/v1/forgot_password_api', email).then( (res) => { 
          console.log('forgot res: ', res)
          if(res.status === 'error'){            
            setIsLoading(false);
            setErrors({error: res.error_msg});
            Toast.show(res.error_msg, Toast.LONG);
          }else if(res.status === 'success'){
            setIsLoading(false);
            Toast.show(res.status, Toast.LONG);
          }        
        }).catch((err) => {
          // console.log('error :',err)
          Toast.show(err, Toast.LONG);
          setIsLoading(false);
        })
      }  
    }
  }


  return (
    <View style={styles.container}>
    <SafeAreaView style={{backgroundColor: colors.AppDefaultColor}}/>
    <AccHeader/>

    <View  style={styles.mainCard}>
      <Text style={styles.logintext}>Forgot Password</Text>
      <View style={{gap: 17}}>
        <InputCard
          title={'Email'}
          value={email}
          handleInput={setEmail}
          placeholder={'Email...'}
        /> 
        {errors?.email && <Text style={styles.error}>{errors?.email} </Text>}

        <LoginButton handlePress={handlePress}  title={'Reset Password'} />
      </View>
    </View> 

    {isLoading &&<Loading/>}
    </View>
  )

}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white}, 
  mainCard: {
    width: '100%',
    paddingHorizontal: 28,
  },
  logintext: {
    fontSize: 34,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
    // marginTop: 28,
  },
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    // marginTop: -5,
  },
});

