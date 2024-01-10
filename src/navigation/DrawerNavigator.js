import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {colors} from '../utils/Colors';
import CustomDrawerContent from './CustomDrawerContent';
import AddProductScreen from '../screens/product/AddProductScreen';
import OrdersScreen from '../screens/orders/OrdersScreen';
import AddressesScreen from '../screens/address/AddressesScreen';
import PaymentScreen from '../screens/payment/PaymentScreen';
import FAQScreen from '../screens/notifictions/FAQScreen';
import ClosetScreen from '../screens/closet/ClosetScreen';
import AccountDetailsScreen from '../screens/account/AccountDetailsScreen';
import ProductListScreen from '../screens/product/ProductListScreen';
import HomeStack from './HomeStack';
import AuthorsListScreen from '../screens/account/AuthorsListScreen';

const DrawerNavigator = ({navigation}) => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props}  drawer={()=>navigation.closeDrawer()} />}
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
          color: colors.black,
          marginLeft: -20,
        },
      }}
      initialRouteName="HomeStack">
      <Drawer.Screen
        options={{
          drawerLabel:'Home',
          drawerContentContainerStyle: {},
          drawerItemStyle: {backgroundColor: colors.white}, 
          drawerIcon: () => (
            <Image
              source={require('../assets/images/home.png')}
              style={{height: 16, width: 16, resizeMode: 'contain'}}
            />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Drawer.Screen
        options={{
          drawerContentContainerStyle: {},
          drawerItemStyle: {backgroundColor: colors.white}, 
          drawerIcon: () => (
            <Image
              source={require('../assets/images/allproducts.png')}
              style={{height: 16, width: 16, resizeMode: 'contain'}}
            />
          ),
          title:'List Products'
        }}
        name="List_Products"
        component={ProductListScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/add.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'Add Product'
        }}
        name="Add_Product"
        component={AddProductScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/orders.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'Orders'
        }}
        name="Orders"
        component={OrdersScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/address.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'Addresses'
        }}
        name="Addresses"
        component={AddressesScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/payment.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'Payment Methods'
        }}
        name="Payment_Methods"
        component={PaymentScreen}
      />
      <Drawer.Screen options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/settings.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'Account Details'
        }} name="Account_Details" component={AccountDetailsScreen} />
      <Drawer.Screen options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/settings.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'Authors',
          headerLeft: () => <AuthorsListScreen />, // Add this line for the back button
        }} name="Authors" component={AuthorsListScreen} />
      <Drawer.Screen options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/hanger.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
          title:'My Profile'
        }} name="My_Closet" component={ClosetScreen} />
      {/* <Drawer.Screen options={{
          drawerIcon: () => (
            <Image
              source={require('../assets/images/help.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          ),
        }} name="FAQs" component={FAQScreen} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
