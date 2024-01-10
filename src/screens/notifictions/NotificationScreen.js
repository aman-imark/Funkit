import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import MainHeader from '../../components/Header/MainHeader';
import {colors} from '../../utils/Colors';
import { width } from '../../utils/Metrics';

const NotificationScreen = ({navigation}) => {
  //   const [notification,setNotifications] = useState()
  //   useEffect(()=>{
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //    .then(res=>res.json())
  //    .then(json=>{setNotifications(json),console.log('notification',json)})
  //  },[])
  const notification = [
    {
      id: 1,
      title: 'quas fugiat ut perspiciatis vero provident',
      body: 'eum non blanditiis soluta porro quibusdam voluptas vel voluptatem qui placeat dolores qui velit aut',
    },
    {
      id: 2,
      title: 'useCallback React Hook',
      body: 'useCallback is a React Hook that lets you cache a function definition between re-renders. ',
    },
    {
      id: 3,
      title: 'useCallback React Hook',
      body: 'useCallback is a React Hook that lets you cache a function definition between re-renders. ',
    },
    {
      id: 4,
      title: 'useCallback React Hook',
      body: 'useCallback is a React Hook that lets you cache a function definition between re-renders. ',
    },
    {
      id: 5,
      title: 'useCallback React Hook',
      body: 'useCallback is a React Hook that lets you cache a function definition between re-renders. ',
    },
    {
      id: 6,
      title: 'useCallback React Hook',
      body: 'useCallback is a React Hook that lets you cache a function definition between re-renders. ',
    },

  ];
  return (
    <View style={styles.container}>
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <FlatList
         showsVerticalScrollIndicator={false}
        data={notification}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}  >
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text numberOfLines={1} style={styles.itemtitle}>{item.title}</Text>
            <Text style={{fontSize:11,fontFamily:'Poppins-Regular'}}>{'20 mins ago'}</Text>
            </View>
            <Text style={styles.itembody}>{item.body}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        // ListFooterComponent={<View style={{height:verticalScale(60),width:'100%',}} />}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  titlerow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal:15
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
  },
  item:{
    width:width,
    paddingHorizontal:15,
    paddingVertical:20,
     justifyContent:'center',
     borderBottomWidth:1,
     gap:10,
    borderColor:colors.lightygrey
  },
  itemtitle:{
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    width:'80%'
  },
  itembody:{
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  }
});
