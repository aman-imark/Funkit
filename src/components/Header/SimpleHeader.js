import { StyleSheet, Text, View,Image, StatusBar, TouchableOpacity, Platform, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../utils/Colors'
import { horizontalScale, verticalScale } from '../../utils/Metrics';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SimpleHeader = ({ title }) => {

  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  }


  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
      <Icon name={'arrow-left'} size={30} color={colors.black} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default SimpleHeader;


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    // backgroundColor: '#3498db', // Customize the background color
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000', // Customize the text color
  },
});
