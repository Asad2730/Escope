import React from 'react';
import { Pressable, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../utils/colors'


export default function ({ children, onClick }) {

    return (
        <Pressable
            onPress={onClick}
            style={styles.container}>
            <Text>{children}</Text>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'),
        height: hp('6%'),
        backgroundColor: colors.secondary_color,
        borderRadius: 50,
        marginBottom: 10,
        marginTop: 10,
    },

});