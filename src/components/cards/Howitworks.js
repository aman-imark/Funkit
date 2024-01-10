import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
// import Swiper from 'react-native-swiper';
import { colors } from '../../utils/Colors';

const Howitworks = () => {
  return (
    <View>
      <Text>How It Works</Text> 
      {/* <Swiper
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        activeDotStyle={[{backgroundColor: colors.AppDefaultColor}, styles.dot]}
         
        paginationStyle={{gap: 10, bottom: 15}}>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../assets/images/hoddie2.jpg')}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text>
            Register
          </Text>
          <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting.
          </Text>
        </View>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../assets/images/Mask6.png')}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text>
            Register
          </Text>
          <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting.
          </Text>
        </View>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../assets/images/Mask7.png')}
            resizeMethod="resize"
            resizeMode="contain"
          />
          <Text>
            Register
          </Text>
          <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting.
          </Text>
        </View>
      </Swiper> */}
    </View>
  );
};

export default Howitworks;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
    fontWeight: '600',
    alignSelf: 'center',
  },
  dot: {
    height: 11,
    width: 11,
    borderRadius: 20,
    backgroundColor: colors.grey,
  },
  activeDot: {
    height: 11,
    width: 11,
    borderRadius: 20,
    backgroundColor: colors.AppDefaultColor,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  img: {
    height: verticalScale(380),
    width: horizontalScale(340),
    position: 'absolute',
  },
});
