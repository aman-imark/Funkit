import { ScrollView, StyleSheet, Text, View,SafeAreaView,StatusBar } from 'react-native'
import React,{useEffect, useState} from 'react'
import MainHeader from '../../components/Header/MainHeader'
import InputCard from '../../components/cards/InputCard'
import { horizontalScale } from '../../utils/Metrics'
import { colors } from '../../utils/Colors'
import LoginButton from '../../components/buttons/LoginButton'
import Loading from '../../utils/Loading'
import { getData, postData } from '../../apis/services'

const BillingaddressScreen = ({navigation}) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [comapany_Name, setCompany_Name] = useState('');
    const [country, setCountry] = useState('');
    const [street_Add, setStreet_Add] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip_code, setZip_code] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); 
  const [isLoading,setIsLoading] = useState(false)


  const getBillingAddress=()=>{
    setIsLoading(true)
    getData('/get-billing-address/v1/GetBillingAddress').then((response)=>{
      console.log('res:',response);
      if (response.status==='success') {
        setFirstname(response.data.billing_first_name);
        setLastname(response.data.billing_last_name);
        setCompany_Name(response.data.billing_company);
        setCountry(response.data.billing_country);
        setStreet_Add(response.data.billing_address);
        setCity(response.data.billing_city);
        setState(response.data.billing_state);
        setZip_code(response.data.billing_postcode)
        setPhone(response.data.billing_phone);
        setEmail(response.data.billing_email);
      }else{
        Toast.show('Something went wrong', Toast.LONG);
      }
      setIsLoading(false)
    }).catch((err)=>{
      setIsLoading(false)
      console.log('error',err);
    })
  }
  useEffect(()=>{
    getBillingAddress()

  },[])

    const validateForm = () => {
      let errors = {};
  
       if (!firstname) {
        errors.firstname = 'First name is required.';
      }
  
      if (!comapany_Name) {
        errors.comapany_Name = 'Company name is required.';
      }
  
      if (!country) {
        errors.country = 'Country is required.';
      }
      if (!street_Add) {
        errors.street_Add = 'Street Address is required.';
      }
      if (!city) {
        errors.city = 'City is required.';
      }
      if (!state) {
        errors.state = 'State Name is required.';
      }
      if (!zip_code) {
        errors.zip_code = 'Zip code  is required.';
      }
      if (!phone) {
        errors.phone = 'Phone number is required.';
      }
      if (!email) {
        errors.email = 'Email is required.';
      }
  
      // Set the errors and update form validity
      setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
      return errors
    };

    function handlePress() {
      validateForm(); 
      const payload={
        'first_name': firstname,
        'last_name': lastname,
        'company': comapany_Name,
        'country': country,
        'street_address': street_Add,
        'city': city,
        'state': state,
        'zipcode':zip_code,
        'phone':phone,
        'email':email,
      }

      console.log('payload :', payload);
      const formErrors = validateForm();
      if (Object.keys(formErrors).length === 0){
      setIsLoading(true)
      postData('/add-billing-address/v1/BillingAddress',payload)
       .then((res)=>{
        console.log('response',res)
        if (res.status==='error' ) {
          console.log('error : ',res.error_msg);
          setErrors({error:res.error_msg})
          Toast.show(res.error_msg, Toast.LONG);
        }else{
          Toast.show('Billing Address saved Successfully!', Toast.LONG);
          navigation.navigate('Addresses')
        }
        setIsLoading(false)
      })
       .catch((err)=>{ 
        Toast.show(err, Toast.LONG);
        console.log(err)
        setIsLoading(false)
      })
      }
    }
  

  return (
    <>
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />
    {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>{'Billing Address'}</Text>
      </View>
      
      <ScrollView bounces={false} scrollEnabled={true} contentContainerStyle={styles.wrapper}>
        <InputCard
          title={'First name'}
          value={firstname}
          handleInput={setFirstname}
          placeholder={'First name'}
          error={errors?.firstname}
        />
        <InputCard
          title={'Last Name'}
          value={lastname}
          handleInput={setLastname}
          multiline={true}
          placeholder={'Last Name'}
        />
        <InputCard
          title={'Company name'}
          value={comapany_Name}
          handleInput={setCompany_Name}
          placeholder={'Company name'}
          error={errors?.comapany_Name}
        />
        <InputCard
          title={'Country / Region'}
          value={country}
          handleInput={setCountry}
          placeholder={'Country'}
          error={errors?.country}
        />
        <InputCard
          title={'Street address'}
          value={street_Add}
          handleInput={setStreet_Add}
          placeholder={'Street address'}
          error={errors?.street_Add}
        />
        <InputCard
          title={'Town / City'}
          value={city}
          handleInput={setCity}
          placeholder={'City'}
          error={errors?.city}
        />
        <InputCard
          title={'State'}
          value={state}
          handleInput={setState}
          placeholder={'State'}
          error={errors?.state}
        />
        <InputCard
          title={'ZIP Code'}
          value={zip_code}
          handleInput={setZip_code}
          placeholder={'ZIP Code'}
          error={errors?.zip_code}
        />
        <InputCard
          title={'Phone'}
          value={phone}
          handleInput={setPhone}
          placeholder={'Phone'}
          error={errors?.phone}
        />
        <InputCard
          title={'Email address'}
          value={email}
          handleInput={setEmail}
          placeholder={'Email address'}
          error={errors?.email}
        />
        {errors?.error && (<Text style={styles.error}>{errors?.error} </Text> )} 
        <LoginButton handlePress={handlePress} title={'Save address'} />
    
    </ScrollView>
    {/* </View> */}
    </SafeAreaView>
    {isLoading&&<Loading/>}
    </>
  )
}

export default BillingaddressScreen

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
      error: {
        color: 'red',
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        alignSelf:'center'
      },
})