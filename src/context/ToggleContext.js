// ToggleContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getData } from '../apis/services';
import { Alert } from 'react-native';
import Loading from '../utils/Loading';

const ToggleContext = createContext();

export const ToggleProvider = ({ children }) => {

  const [isPublic, setIsPublic] = useState(false);
  const [isLoading,setIsLoading] = useState(false);

  const toggleVisibility = () => {
    if (isPublic === false) {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to Public your Profile?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // setIsPublic(true);
              updateProfileStatus('public');
            },
          },
        ],
        { cancelable: false }
      )
    };
    if (isPublic === true) {
      Alert.alert(
        'Confirmation',
        'Are you sure you want to Private your Profile?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // setIsPublic(false);
              updateProfileStatus('private');
            },
          },
        ],
        { cancelable: false }
      )
    };
    // setIsPublic((prevIsPublic) => !prevIsPublic);
  };




  const getProfileStatus = () => { 
      getData('/user-profile-api/v1/userProfile').then((res) => {
        // console.log("Toggle Custom: ", res);
        if (res.status === 'ok') {  
          if(res.profile_status === 'private'){
            setIsPublic(false);
          }else if(res.profile_status === 'public'){
            setIsPublic(true);
          }else{
            setIsPublic(false);
          }
        }
      }).catch((err)=>{
        Toast.show('Something went wrong!'+err, Toast.LONG);
        console.log(err)
      })
  }


  const updateProfileStatus = (publicPrivateValue) => {
    setIsLoading(true);
    console.log('publicPrivateValue: ', publicPrivateValue)
    getData(`/public-private-profile-api/v1/profile_public_private?public_private=${publicPrivateValue}`).then((res) => {
      console.log(res);
      setIsLoading(false);
      if(res.status === 'success' && res.status === 'success'){
        if(res.profile_status === 'private'){
          setIsPublic(true);
        }else if(res.profile_status === 'public'){
          setIsPublic(false);
        }
        getProfileStatus()
      }
    }).catch((err)=>{
      console.log(err);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getProfileStatus();
  }, []);




  return (
    <>
    <ToggleContext.Provider value={{ isPublic, toggleVisibility }}>
      {children}
    </ToggleContext.Provider>
    {isLoading&&<Loading/>}
    </>
  );
};

export const useToggle = () => {
  return useContext(ToggleContext);
};
