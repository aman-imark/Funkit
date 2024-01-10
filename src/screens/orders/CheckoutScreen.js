import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import Payment_Screen from '../StripePayment/Payment_Screen'
import LoginButton from '../../components/buttons/LoginButton'


const CheckoutScreen = () => {
  // const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`https://www.funkitswap.com/wp-json/stripe-api/v1/stripe_payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey, 
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    // const { error } = await initPaymentSheet({
    //   merchantDisplayName: "Example, Inc.",
    //   customerId: customer,
    //   customerEphemeralKeySecret: ephemeralKey,
    //   paymentIntentClientSecret: paymentIntent,
    //   // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
    //   //methods that complete payment after a delay, like SEPA Debit and Sofort.
    //   allowsDelayedPaymentMethods: true,
    //   defaultBillingDetails: {
    //     name: 'Jane Doe',
    //   }
    // });
    // if (!error) {
    //   setLoading(true);
    // }
  };

  const openPaymentSheet = async () => {
    // see below
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    } 
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  return (
    <View>
     {/* <StripeProvider
      publishableKey={'pk_test_51NLO6kSCFwycYe5HHmJWd2mAJwRcJwpWFLK0yGZc6K8sb5FIIuA24uGnr5rr8q7RDQRJh6rLr9tAt3UpVAMSRr2300DdqcuISa'}
      // merchantIdentifier="merchant.identifier"  
      // urlScheme="your-url-scheme"  
    > */}

        {/* <Payment_Screen/> */}
      {/* <LoginButton title={'Pay'} handlePress={openPaymentSheet} /> */}
    {/* </StripeProvider> */}
    </View>
  )
}

export default CheckoutScreen

const styles = StyleSheet.create({})