import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { colors } from '../../utils/Colors';
import MainHeader from '../../components/Header/MainHeader';

const SwapScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <MainHeader route={navigation} />
      <View style={styles.titlerow}>
        <Text style={styles.title}>Swap</Text>
      </View>
    </View>
  );
};

export default SwapScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white,
  },
  titlerow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    color: colors.black,
    alignSelf: 'center',
  },
});
