import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/SplashScreen';
import LoginScreen from '../screens/account/LoginScreen';
import SignupScreen from '../screens/account/SignupScreen';
import ForgotPasswordScreen from '../screens/account/ForgotPasswordScreen';
import BottomNavigator from './BottomNavigator';
import {getAuthToken} from '../apis/AuthService';

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false) 
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
        animationTypeForReplace: 'pop',
        headerShown: false,
      }}
      initialRouteName="Splash">

        <Stack.Screen name="Splash" component={SplashScreen} />
   
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Forgotpassword" component={ForgotPasswordScreen}  />
        <Stack.Screen name="BottomTab" component={BottomNavigator} />
   
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
