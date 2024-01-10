import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
import InputCard from '../../components/cards/InputCard';
import {ScrollView} from 'react-native-gesture-handler';
import MainHeader from '../../components/Header/MainHeader';
import LoginButton from '../../components/buttons/LoginButton';

const PaymentScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false)


  return (
    <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={'#FFF'}barStyle={'dark-content'} />
    {/* <View style={styles.container}> */}
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Payment Method</Text>
      </View>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.card}>
          <View style={styles.type}>
            {/* <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
            /> */}
            <Text style={styles.cardtitle}>Credit Card (Stripe)</Text>
          </View>
          <Image
            source={require('../../assets/images/payment.png')}
            style={{
              height: verticalScale(20),
              width: horizontalScale(30),
              resizeMode: 'contain',
              tintColor: colors.AppDefaultColor,
            }}
          />
        </View>
        <InputCard
          title={'Card Number'}
          value={cardNumber}
          handleInput={setCardNumber}
          placeholder={'1234 1234 1234 1234'}
        />
        <InputCard
          title={'Expiry Date'}
          value={expiryDate}
          handleInput={setExpiryDate}
          placeholder={'MM/YY'}
        />
        <InputCard
          title={'Card Code (CVC)'}
          value={cardCode}
          handleInput={setCardCode}
          placeholder={'CVC'}
        />
        <LoginButton title={'Add payment method'} />
      </ScrollView>
    {/* </View> */}
    </SafeAreaView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
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
  wrapper: {
    width: '100%',
    paddingTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
    gap: 20,
    paddingBottom: 100,
  },
  card: {
    flexDirection: 'row',
    height: verticalScale(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    paddingHorizontal: horizontalScale(20),
  },
  type: {
    gap: -2,
    width: '80%',
  },
  cardtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 17,
    color: colors.black,
  },
});
