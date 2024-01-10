import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from './src/navigation/RootStackNavigator';
import { ToggleProvider } from './src/context/ToggleContext';
import 'react-native-gesture-handler';


const App = () => {
  return (
    <NavigationContainer>
         <ToggleProvider>
         <RootStackNavigator />
         </ToggleProvider>
     </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
