import axios from 'axios';
import BASE_URL from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login-api/v1/userLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        mode: 'no-cors',
      },
      body: JSON.stringify({email, password}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('authToken');
    console.log('Logged Out!')
   } catch (error) {
    throw error;
  }
};

// Store the user's authentication token
export const storeAuthToken = async token => {
  try {
    await AsyncStorage.setItem('authToken', JSON.stringify(token));
  } catch (error) {
    throw error;
  }
};

// Retrieve the user's authentication token
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    //   throw error;
    console.log('error');
  }
};
