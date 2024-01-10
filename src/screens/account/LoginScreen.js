import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


import React, {useState} from 'react';
import {colors} from '../../utils/Colors';
import InputCard from '../../components/cards/InputCard';
import LoginButton from '../../components/buttons/LoginButton';
import AccHeader from '../../components/Header/AccHeader';
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import { login, storeAuthToken, getAuthToken } from '../../apis/AuthService';
import Loading from '../../utils/Loading';
import Toast from 'react-native-simple-toast';
 

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

    // Validate password field
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    } 
    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    return errors
  };



  const handlePress = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0){
    // if (isFormValid) {
      setIsLoading(true)
      // console.log('valid',email)
      login(email,password).then( (res) => { 
        console.log('login res: ',res)
        if(res.status === 'error'){
          setErrors({error:res.errormsg});
        }else if(res.status === 'success'){
            storeAuthToken(res.token);
            getAuthToken().then((res) => {
              if(res){
                setIsLoading(false);
                navigation.replace('BottomTab');
                Toast.show('You successfully logged in!', Toast.LONG);
              }
            }).catch((err) => {
               setIsLoading(false);
               console.log(err);
            });
        }
        setIsLoading(false);
      }).catch((err) => {
        setIsLoading(false);
        console.log('error :',err)
        Toast.show(err, Toast.LONG);
      })
    }  
  }



  return (
    <View style={styles.container}>
    <SafeAreaView style={{backgroundColor: colors.AppDefaultColor}}/>
    <AccHeader/>
      
      <View style={styles.mainCard}>
        <Text style={styles.logintext}>Login</Text>
        <View style={{gap: 17}}>
          <>
          <InputCard
            title={'Email'}
            value={email}
            handleInput={setEmail}
            placeholder={'Email...'}
            />
          {errors?.email && <Text style={styles.error}>{errors?.email} </Text>}
          </>
          <>
          <InputCard
            title={'Password'}
            value={password}
            secureText={true}
            handleInput={setPassword}
            placeholder={'Password...'}
          />
          {errors?.password && <Text style={styles.error}>{errors?.password} </Text>}
          </>
          {errors?.error && <Text style={styles.error}>{errors?.error} </Text>}
          
          <LoginButton handlePress={handlePress}  title={'Login'} />
        </View>
      </View>
      <View  style={{flex: 3, justifyContent: 'space-between', paddingVertical: 35}}>
        <Text onPress={() => navigation.navigate('Forgotpassword')} style={styles.forgotText}>Forgot Password?</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
            <Text style={[styles.signupText,{color: colors.AppDefaultColor}]}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
 
    {isLoading &&<Loading/>}
    </View>
  );
};

export default LoginScreen;

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
  forgotText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    alignSelf: 'center',
    textDecorationLine: 'underline',
   },
  signupText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    
  }, 
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});
