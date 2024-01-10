import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {horizontalScale, verticalScale} from '../utils/Metrics';
import {colors} from '../utils/Colors';
import ProfileSreen from '../screens/account/ProfileSreen';
import SearchScreen from '../screens/search/SearchScreen';
import AddProductScreen from '../screens/product/AddProductScreen';
import DrawerNavigator from './DrawerNavigator';
import OrdersScreen from '../screens/orders/OrdersScreen';

const BottomNavigator = ({navigation,route}) => {
  const Tab = createBottomTabNavigator();
  
  const handleTabPress = () => {
    // Reset the stack navigator to the initial route
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    })
  };


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: -10,
          right: 15,
          left: 15,
          elevation: 5,
          backgroundColor: colors.white,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          height: verticalScale(70),
          
          // flex: 1,
          // alignItems: 'center',
          // flexDirection: 'row',
         
          shadowOffset: {width: 0, height: 10},
          shadowColor: colors.black,
          shadowOpacity: 0.5,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/home.png')}
                style={{
                  height: verticalScale(20),
                  width: horizontalScale(20),
                  resizeMode: 'contain',
                  tintColor: focused ? colors.AppDefaultColor : colors.black,
                }}
              />
            </View>
          ),
        }}
        listeners={{tabPress: () => handleTabPress(),}}
        name="Drawer"
        component={DrawerNavigator}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/mglass.png')}
                style={{
                  height: verticalScale(20),
                  width: horizontalScale(20),
                  resizeMode: 'contain',
                  tintColor: focused ? colors.AppDefaultColor : colors.black,
                }}
              />
            </View>
          ),
        }}
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                elevation: 5,
                justifyContent: 'center',
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: focused?colors.white:colors.AppDefaultColor,
                position: 'absolute',
                top: verticalScale(-25),
                shadowOffset: {width: 0, height: 10},
                shadowColor: colors.black,
                shadowOpacity: 0.5,
              }}>
              <Icon
                name={'plus'}
                size={28}
                color={focused ? colors.AppDefaultColor : colors.white}
              />
            </View>
          ),
        }}
        name="Addproduct"
        component={AddProductScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/orders.png')}
                style={{
                  height: verticalScale(20),
                  width: horizontalScale(20),
                  resizeMode: 'contain',
                  tintColor: focused ? colors.AppDefaultColor : colors.black,
                }}
              />
            </View>
          ),
        }}
        name="Order"
        component={OrdersScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/images/user.png')}
                style={{
                  height: verticalScale(20),
                  width: horizontalScale(20),
                  resizeMode: 'contain',
                  tintColor: focused ? colors.AppDefaultColor : colors.black,
                }}
              />
            </View>
          ),
        }}
        name="Profile"
        component={ProfileSreen}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
