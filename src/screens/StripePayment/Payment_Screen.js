import React, { useState } from "react";
// import { CardField, CardFieldInput, useStripe } from '@stripe/stripe-react-native';
import { StyleSheet, View } from "react-native";
 
 
const Payment_Screen = () => {
  // const [ card, setCard ] = useState(CardFieldInput.Details | null);
  const { confirmPayment, handleCardAction } = useStripe();

  return(
      <View style={{display:'flex',flex:1}}>

        {/* <CardField
          postalCodeEnabled={true}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={(cardDetails) => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={(focusedField) => {
            console.log('focusField', focusedField);
          }}
        /> */}
      </View>
   )
}

export default Payment_Screen

const styles = StyleSheet.create({})