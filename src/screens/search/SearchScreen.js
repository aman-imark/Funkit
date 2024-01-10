import {SafeAreaView, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View,StatusBar } from 'react-native'
import React,{useState,useEffect,useRef} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../utils/Colors';
import { horizontalScale, verticalScale, width } from '../../utils/Metrics';
import { postData } from '../../apis/services';
import ProductCard from '../../components/cards/ProductCard';
import Loading from '../../utils/Loading';
 

const SearchScreen = ({navigation}) => {
  const [searchText,setSearchText]=useState('');
  const [searchResult,setSearchResult]=useState(null);
  const [message,setMessage]=useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const [isfocused,setIsFocused] = useState(false)
  const focusRef = useRef(null)

  useEffect(()=>{
    focusOnInput()
  })

  const focusOnInput=()=>{
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }
  
  const handleSearch=()=>{
    if (searchText){
      const payload={search_text:searchText}
      console.log('inside search :', payload);  
    setIsLoading(true)
    postData('/search-product/v1/searchProduct', payload).then((res)=>{
      if (res.status==='success') {
        setSearchResult(res.data)
      } else {
        setMessage(res.error_msg)
        console.log('something went wrong!');
      }
      setIsLoading(false)
      console.log('search res', res);
    }).catch((error)=>{
      setIsLoading(false)
      console.log('error',error);
    })
  }else{
    focusOnInput()
  }
  }

  return (
    <>
      <SafeAreaView />
      <StatusBar barStyle={'dark-content'} />

      {/* <View style={styles.container}> */}
      <View style={styles.header}>
        <View style={styles.left}> 
            <TouchableOpacity onPress={()=>navigation.goBack()} >
              <Icon name={'west'} size={22} color={colors.black} />
            </TouchableOpacity>
        </View>
        <View style={styles.bar}>
          <TextInput ref={focusRef}  onSubmitEditing={()=>{handleSearch()}} style={{width:'90%',height:'100%'}} onChangeText={(text)=>setSearchText(text)} value={searchText} />
          <TouchableOpacity onPress={()=>handleSearch()} >
            <Image
              source={require('../../assets/images/search.png')}
              style={{height: 20, width: 20, resizeMode: 'contain'}}
            />
          </TouchableOpacity> 
        </View>
      </View>
      <View style={styles.wrapper}>
      {searchResult?
      <>
        <View style={{}}>
        <Text style={styles.searched_text}>Results of "{searchText}"</Text>
          </View>
        <FlatList
              numColumns={3}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              data={searchResult}
              renderItem={({item}) => (
                <TouchableOpacity onPress={()=>navigation.navigate('Details',item)}>
                  <ProductCard
                    title={item?.post_title}
                    imgurl={item?.product_image}
                    type={'product'}
                    text_color={colors.black}
                  />
                </TouchableOpacity>
              )}
              columnWrapperStyle={{justifyContent: 'space-between',paddingBottom:verticalScale(15)}}
              keyExtractor={(item,i) => i}
              ListFooterComponent={<View style={{height:verticalScale(40),width:'100%'}} />}
            />
        </>:
          <Text style={styles.searched_text}>{message&&message}</Text>
       }
      </View>
      {/* </View> */}
  
    {isLoading&&<Loading/>}
    </>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white
  },
  header: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(60),
    paddingHorizontal: horizontalScale(15),
   },
  right: {
    flexDirection: 'row',
    gap: 20,
  },
  wrapper:{
    padding:horizontalScale(15),
    gap:horizontalScale(20)
  },
  bar:{
    height:verticalScale(50),
    width:'85%',
    marginLeft:20,
    borderWidth:1,
    borderColor:colors.grey,
    borderRadius:4,
    flexDirection:'row',
    alignItems:'center',
    // justifyContent:'center',
    paddingHorizontal:horizontalScale(12)
  },
  searched_text:{
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    alignSelf:'center',
    
  }
})