import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';

const SectionHeader = ({route,title}) => {
  return (
    <View style={styles.titlerow}>
      <Text style={styles.title}>{title}</Text>
       
        <Text onPress={route} style={styles.linktext}>
          View all{' '}
          <Image
            source={require('../../assets/images/uparrow.png')}
            style={{
              width: horizontalScale(15),
              height: verticalScale(15),
              resizeMode: 'contain',
            }}
          />
        </Text>
     </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
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
  },
  linktext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: colors.black,
  },
});
