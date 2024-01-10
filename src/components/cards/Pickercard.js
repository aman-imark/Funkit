import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {Picker} from '@react-native-picker/picker';


import {horizontalScale, verticalScale} from '../../utils/Metrics';
import {colors} from '../../utils/Colors';
// import { Dropdown } from 'react-native-material-dropdown';
import { Dropdown } from 'react-native-material-dropdown-v2';


const Pickercard = ({handleInput, title, lebel, selected, items, error}) => {

  const [selectedd, setSelectedd] = React.useState("");
  console.log(items);

  // Add default status dynamically
  const defaultStatus = {"id": 0, "name": "Select"};
  const modifiedItems = [defaultStatus, ...items];

  // Transforming "name" into "value"
  const transformedItems = modifiedItems.map(item => ({
    id: item.id,
    value: item.name
  }));

  

  return (
    <>
      {/* <Text style={styles.title}>{title}</Text> */}
      
      <View style={styles.inputBox}>
        {/* <Picker
          style={styles.pickerMain}
          selectedValue={selected&&selected}
          onValueChange={(itemValue, itemIndex) =>
            handleInput&&handleInput(itemValue)
          }>
            <Picker.Item style={styles.item} label={'Select'} value={'None'}  />
           
          {items&&items.map((item) => {
            return <Picker.Item style={styles.item} label={item.name} value={item.name} key={item.id} />;
          })}
        </Picker> */}

        <Dropdown
         label={title}
         labelFontSize={17}
         data={transformedItems}
         fontSize={16}
         rippleOpacity={0.5}
         rippleInsets={{ top: 0, bottom: - 10 }}
        //  containerStyle={{borderWidth: 1, borderColor: 'red', borderBottom: 0}}
         pickerStyle={{width: '90%', marginHorizontal: 15}}
        />

      </View>
        {error && (<Text style={styles.error}>{error} </Text> )} 
      </>
  );
};

export default Pickercard;

const styles = StyleSheet.create({
  container: {flex: 1, gap: 8},
  inputBox: {
    height: 57,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.grey,

    // position: 'relative',
    // paddingHorizontal: horizontalScale(18),
    // alignItems:'center',
    // justifyContent:'center'

    // width:'100%',
    // height:verticalScale(55),
    // borderWidth:1,
    // borderColor:colors.grey,
    // paddingHorizontal:horizontalScale(18),
    // paddingVertical: 10,
    // alignItems:'center'
  },
  pickerMain: {
  //  position: 'absolute',
  //  top: 0,
  },
  title: {
    color: colors.black,
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
  },
  item:{
    color: colors.txtgrey,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
});
