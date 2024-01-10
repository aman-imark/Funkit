import {StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground,
  TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
  
import React, {useEffect, useState} from 'react';

import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import { getData, postData } from '../../apis/services';
import { useNavigation } from '@react-navigation/native';
import SimpleHeader from '../../components/Header/SimpleHeader';
import Loading from '../../utils/Loading';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const AuthorDetailScreen = ({ route }) => {

  const navigation = useNavigation();
  // Function to handle the back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [isLoading, setIsLoading] = useState(false);
  const [authorData, setAuthorData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);



  useEffect(() => {
    // Access the user ID from the navigation parameters
    const { userId } = route.params;
    // console.log(`User ID: ${userId}`);
    getAuthorDetails(userId);

    // Add your logic for fetching user details or any other actions
  }, []);



  const getAuthorDetails = (userId) => {
    setIsLoading(true);
    getData(`/current_author_api/v1/current_author?user_id=${userId}`).then((res) => {
      console.log(res);
      setIsLoading(false);
      if(res.status === 'ok'){
         setAuthorData(res);
      }
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
  }

  const handleProductSelection = (product) => {
    // console.log(product);
   
    // console.log(`Selected product: ${product.post_id}`);
    // // navigation.navigate('Details', { product: product.post_id });
    // navigation.navigate('Details', product);
  };


  const renderSwapProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductSelection(item)} style={styleA.userItem}>
      <Image source={{ uri: item.featured_img }} style={styleA.avatar} 
        onError={() => (
          <Image
          source={require('../../assets/images/no_user1.png')} // Provide the path to your static image
          style={styleA.avatar}
          /> )}
        />
        {/* <Image source={require('../../assets/images/no_user1.png')} style={styleA.avatar}/> */}
      <View>
        <Text style={styleA.userName}>{item.post_title} </Text>
        {/* <Icon name={'arrow-top-right'} size={20} /> */}
        <Text style={styleA.userDescription}>{item.cat_name}</Text>
      </View>
    </TouchableOpacity>
  );




  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />
      <SimpleHeader title="Author Profile" />

    <View style={styles.container}>
      {/* <ImageBackground source={require('../../assets/images/shutterstock.png')} resizeMode="cover" style={styles.backImage}> */}
      <ImageBackground source={{ uri: authorData.background_image }} resizeMode="cover" style={styles.backImage}>
      <View style={styles.header}>
        <Image source={{ uri: authorData.profile_image }} style={styles.avatar} 
          onError={() => (
            <Image
            source={require('../../assets/images/no_user1.png')} // Provide the path to your static image
            style={styleA.avatar}
            /> )} />
        <Text style={styles.userName}>{authorData.user_name}</Text>
      </View>
      </ImageBackground>


      <View style={styles.subContainer}>
      <Text style={styles.bio}>{authorData.bio}</Text>
      {/* <Text style={styles.bio}>weguy gweyu hfw euihfewuiofhwefy weugwefyughwefyu ghwefyu gweyufweghfyuwe gf yuwe</Text> */}
      {/* User Products */}
      <Text style={styles.productsHeader}>Swap Products:</Text>
      <FlatList
        data={authorData.products_data}
        keyExtractor={(product) => product.post_id.toString()}
        renderItem={renderSwapProductItem}
        extraData={selectedProduct}
        style={styles.authorContainer}
      />

    </View>
    </View>

    {isLoading && <Loading />}
    </>
  );
};

export default AuthorDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10
  },
  backImage: {
    height: 200,
    backgroundColor: '#d3d3d3',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  bio: {
    marginVertical: 10,
    fontSize: 16,
  },
  productsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
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
    backgroundColor: '#ccc',
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