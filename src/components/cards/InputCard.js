import { StyleSheet, Text, TextInput, View,Dimensions } from 'react-native'
import React from 'react'
import { colors } from '../../utils/Colors'
import { horizontalScale, verticalScale } from '../../utils/Metrics'
 

const InputCard = ({title,value,handleInput,placeholder,multiline,secureText,error}) => {
  const Dimension = Dimensions.get('screen')
    return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputBox}>
        <TextInput secureTextEntry={secureText} multiline={multiline?multiline:false}  value={value&&value} 
        autoCapitalize="none" onChangeText={(text)=>{handleInput&&handleInput(text)}} placeholder={placeholder} style={styles.input}/>
      </View>
      {error && (<Text style={styles.error}>{error} </Text> )} 
    </View>
  )
}

export default InputCard

const styles = StyleSheet.create({
    container:{ width:'100%', gap:8 },
    inputBox:{
        width:'100%',
        height: verticalScale(50),
        borderWidth:1,
        borderColor:colors.grey,
        paddingHorizontal:horizontalScale(18),
        paddingVertical: 0,
        alignItems:'center'
    },
    title:{
        color:colors.black,
        fontSize: 17,
        fontFamily:'Poppins-Medium',
    },
    input:{
        width:'100%',
        color:colors.txtgrey,
        flex: 1,
        alignItems: 'center',
        textTransform: 'none'
    },
    error: {
      color: 'red',
      fontSize: 12,
      fontFamily: 'Poppins-Medium',
    },
})