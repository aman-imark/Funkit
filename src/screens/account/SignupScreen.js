import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../utils/Colors';
import InputCard from '../../components/cards/InputCard';
import LoginButton from '../../components/buttons/LoginButton';
import AccHeader from '../../components/Header/AccHeader';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {register} from '../../apis/services';
import { storeAuthToken, getAuthToken } from '../../apis/AuthService';
import TrendingSection from '../../components/TrendingSection';
import Loading from '../../utils/Loading';
import Toast from 'react-native-simple-toast';



const SignupScreen = ({navigation}) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 


  const validateForm = () => {
    let errors = {};

    // Validate name field
    if (!name) {
      errors.name = 'Name is required.';
    }

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
    if (!zip) {
      errors.zip = 'Zip is required.';
    }

    // Set the errors and update form validity
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
    return errors
  };

  const handlePress = () => {
    validateForm();
    const payload = {
      email: email,
      name: name,
      zip_code: zip,
      password: password,
    };
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0){
      setIsLoading(true)
      console.log('inside!');
      register(payload).then( (res) => {
          console.log(res);

          if(res.status === 'error') {
            Toast.show(re.errormsg, Toast.LONG);
            setErrors({errormsg:res.errormsg})
            console.log('error');
          } else if(res.status === 'ok'){


            // storeAuthToken(res.user_id).then((res)=>{
            //   if (res === true) {
            //     Toast.show('Account Created Succesfully!', Toast.LONG);
            //   }
            // })
            // navigation.replace('BottomTab')
            storeAuthToken(res.token);
            getAuthToken().then((res) => {
              if(res){
                setIsLoading(false);
                navigation.replace('BottomTab');
                Toast.show('Account Created Succesfully!', Toast.LONG);
              }
            }).catch((err) => {
               setIsLoading(false);
               console.log(err);
            });

          }
          setIsLoading(false)
        })
        .catch(errors => {
          setIsLoading(false)
          console.log(errors)
        });
     }
  };

  return (
    <View style={styles.container}>
    <SafeAreaView style={{backgroundColor: colors.AppDefaultColor}}/>
    <AccHeader/>

    <ScrollView>
      <View >
        <View aria-busy style={styles.mainCard}>
          <Text style={styles.logintext}>Sign Up</Text>
          <View style={{gap:12}}>
          {errors?.errormsg && (<Text style={styles.error}>{errors?.errormsg} </Text>)}
            <View>
              <InputCard
                title={'Name'}
                value={name}
                handleInput={setName}
                placeholder={'Peter'}
                error={errors?.name}
              />
             
            </View>
            <View>
              <InputCard
                title={'Email'}
                value={email}
                handleInput={setEmail}
                placeholder={'peter@info...'}
                error={errors?.email}
              />
            </View>
            <View>
              <InputCard
                title={'Zip code'}
                value={zip}
                handleInput={setZip}
                placeholder={'60000'}
                error={errors?.zip}
              />
             </View>
            <View>
              <InputCard
                title={'Password'}
                value={password}
                handleInput={setPassword}
                placeholder={'Password...'}
                error={errors?.password}
                secureText={true}
                />
              
            </View>
            <LoginButton handlePress={handlePress} title={'Sign Up'} />
           </View>
        </View>
      </View>

    
      <View style={{flex: 4, flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={[styles.signupText, {color: colors.AppDefaultColor, marginVertical: 10}]}>Log In</Text>
      </View>

    </ScrollView>
    {isLoading&&<Loading />}

   </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {display: 'flex', flex: 1, backgroundColor: colors.white},
  mainCard: {
    width: '100%',
    marginTop: verticalScale(24),
    paddingHorizontal: horizontalScale(24),
  },
  logintext: {
    fontSize: 34,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    alignSelf: 'center',
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
