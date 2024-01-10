import {StyleSheet, Text, View, SafeAreaView, StatusBar,
  TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';

import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import { postData } from '../../apis/services';
import { useNavigation } from '@react-navigation/native';
import SimpleHeader from '../../components/Header/SimpleHeader';
import Loading from '../../utils/Loading';



const AuthorsListScreen = () => {

  const navigation = useNavigation();

  // Function to handle the back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [authorsList, setAuthorsList] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleUserSelection = (user) => {
    console.log(user);
    setSelectedAuthor(user);
    // Add your logic for handling the selected user here
    console.log(`Selected user: ${user.user_id}`);
    navigation.navigate('AuthorDetail', { userId: user.user_id });
  };


  const renderUserItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserSelection(item)} style={styleA.userItem}>
      <Image source={{ uri: item.profile_img }} style={styleA.avatar} 
        onError={() => (
          <Image
          source={require('../../assets/images/no_user1.png')} // Provide the path to your static image
          style={styleA.avatar}
          /> )} 
        />
        {/* <Image source={require('../../assets/images/no_user1.png')} style={styleA.avatar}/> */}
      <View>
        <Text style={styleA.userName}>{item.user_name}</Text>
        <Text style={styleA.userDescription}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );


  const getAuthorsList = () => {
    setIsLoading(true);
    postData('/authors-api/v1/authors').then((res) => {
      setIsLoading(false);
        if(res.status === "success"){
          setAuthorsList(res.authors_data)
        }
      }).catch(error => {
        setIsLoading(false);     
      });
  };


  useEffect(() => {
    getAuthorsList();
  }, []);



  // getAuthorsList

  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />

      <SimpleHeader title="Authors" />
      <FlatList
        data={authorsList}
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderUserItem}
        extraData={selectedAuthor}
        style={styles.authorContainer}
      />
    {isLoading && <Loading />}
    </>
  );
};

export default AuthorsListScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  wrapper: {
    width: '100%',
    paddingHorizontal: horizontalScale(20),
    gap: 20,
    paddingBottom: 100,
    paddingTop: verticalScale(20),
  },
  titlerow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
  },
  authorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  }
});

const styleA = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: '500'
  },
  userDescription: {
    marginVertical: 3,
    fontSize: 15,
    fontWeight: '500',
    opacity: 0.6
  }
});

