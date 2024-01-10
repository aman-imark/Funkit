import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../../utils/Colors';
import {horizontalScale, verticalScale} from '../../utils/Metrics';
import { postData } from '../../apis/services';

const DeleteModal = ({modalVisible, setModalVisible,deleteProduct}) => {
  
  const confirm_Delete =()=>{
    setModalVisible(false);
    deleteProduct();
  } 

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container}>
        <View style={styles.modalview}>
          <Text style={styles.title}>Are you sure?</Text>
          <Text style={styles.desc}>
            Once deleted, you will not be able to recover this product!
          </Text>
          <View style={styles.btnrow}>
            <TouchableOpacity style={styles.btn} onPress={() => {setModalVisible(false)}}>
              <Text style={styles.btntext}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={confirm_Delete}>
              <Text style={styles.btntext}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000aa',
    paddingHorizontal: horizontalScale(35),
    // position:'absolute'
  },
  modalview: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: colors.black,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.black,
    textAlign:'center'
  },
  btnrow: {
    flexDirection: 'row',
    gap: 15,
    marginTop:verticalScale(25)
  },
  btn:{
    height:verticalScale(40),
    backgroundColor:colors.black,
    paddingHorizontal:horizontalScale(30),
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4

  },
  btntext:{
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: colors.white,
    textAlign:'center'
  }
});
