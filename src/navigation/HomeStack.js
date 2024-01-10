 import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/home/HomeScreen'
import ProductScreen from '../screens/product/ProductScreen'
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen'
import BillingaddressScreen from '../screens/address/BillingaddressScreen'
import ShippingaddressScreen from '../screens/address/ShippingaddressScreen'
import EditProductScreen from '../screens/product/EditProductScreen'
import Cart_Screen from '../screens/cart/Cart_Screen'
import CategoryProducts from '../screens/product/CategoryProducts'
import SearchScreen from '../screens/search/SearchScreen'
import Payment_Screen from '../screens/StripePayment/Payment_Screen'
import CheckoutScreen from '../screens/orders/CheckoutScreen'
import AuthorDetailScreen from '../screens/account/AuthorDetailScreen'

const HomeStack = () => {
    const HomeStack = createNativeStackNavigator()

  return (
    <HomeStack.Navigator screenOptions={{headerShown:false, animation:'default' }}>
        <HomeStack.Screen  name='Home' component={HomeScreen} />
        <HomeStack.Screen  name='Products' component={ProductScreen} />
        <HomeStack.Screen  name='Details' component={ProductDetailsScreen} />
        <HomeStack.Screen  name='Billing' component={BillingaddressScreen} />
        <HomeStack.Screen  name='Shipping' component={ShippingaddressScreen} />
        <HomeStack.Screen  name='EditProduct' component={EditProductScreen} />
        <HomeStack.Screen  name='Cart' component={Cart_Screen} />
        <HomeStack.Screen  name='Cat_Products' component={CategoryProducts} />
        <HomeStack.Screen  name='Search' component={SearchScreen} />
        <HomeStack.Screen  name='Payment' component={Payment_Screen} />
        <HomeStack.Screen  name='Checkout' component={CheckoutScreen} />
        <HomeStack.Screen  name='AuthorDetail' component={AuthorDetailScreen} />
    </HomeStack.Navigator>
   )
}

export default HomeStack

 