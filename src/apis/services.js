import axios from 'axios';
import BASE_URL from '../utils/Constants'


const register = async (payload)  => {
    let nativeHeaders = {
         'Content-Type': 'application/json', 
         'Access-Control-Allow-Origin': '*',
         'mode': 'no-cors'
    };
    const res = await fetch(BASE_URL + "/signup-api/v1/userRegister", {method:'POST', headers: nativeHeaders, body: JSON.stringify(payload)});
    const finalRes = await res.json();
    return finalRes;
}
const postData=async(route,payload)=>{
    let nativeHeaders = {
        'Content-Type': 'application/json', 
        'Access-Control-Allow-Origin': '*',
        'mode': 'no-cors'
   };
   const res = await fetch(BASE_URL + route, {method:'POST', headers: nativeHeaders, body: JSON.stringify(payload)});
   const finalRes = await res.json();
   return finalRes;
}
const getData = async (route) => {
    let nativeHeaders = {
           'Content-Type': 'application/json', 
           'Access-Control-Allow-Origin': '*', 
        }
    const res = await fetch(BASE_URL + route, {method: 'GET', headers: nativeHeaders});
    const finalRes = await res.json();
    return finalRes;
  }
export {register,postData,getData}