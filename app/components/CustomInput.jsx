import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../utils/colors'


export default function CustomInput({PlaceHolder, Type, OnChange, Secure ,Value,Field}) {
   
    const handleOnChange = (text) => {
        
    }

    return (
        <TextInput
            style={styles.input}
            placeholder={PlaceHolder}
            keyboardType={Type}
            textAlign="left" secureTextEntry={Secure}
            onChangeText={text=>handleOnChange(text)}
            value={Value}
            />
    )
}

const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'),
        height: hp('6%'),
        marginBottom: 10,
        marginTop: 10,
        borderRadius:50,
        color:colors.white_color ,
        borderColor:colors.secondary_light,
        paddingLeft: 20,
      },
})