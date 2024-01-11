import React, { useState } from 'react'
import { View, Text, StyleSheet,Pressable } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { colors } from '../../utils/colors'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import { useDispatch } from 'react-redux'
import { loginWithEmailPassword, loginWithFaceID } from '../../reduxKit/auth/authThunk'
import { setImagePicker } from '../../components/SetImagePicker'


export default function Login({ navigation }) {
    
    const dispatch = useDispatch();
    const [imageUrl, setImage] = useState(null);

    const [form, setForm] = useState({
        email: { value: '', placeholder: 'example@gmail.com', type: 'email-address' },
        password: { value: '', placeholder: 'your password', secure: true, }
    });

    
    const pickImage = async () => {
       try{
        let res = await setImagePicker();
        setImage(res);
       }catch(ex){
        console.error('Error picking an image', error);
       }
     };

    const handleLoginWithPassword = () => {
        let obj = { email: form.email.value, password: form.password.value }
        dispatch(loginWithEmailPassword(obj))
    }
  
    const handleLoginWithFaceId = () => {
        let obj = { email: form.email.value, faceId:imageUrl}
        dispatch(loginWithFaceID(obj))
    }

    return (
        <View style={styles.container}>
            <View style={styles.secondary_container}>
                <Text style={styles.myText}>SignIn</Text>
            </View>
            <View style={styles.input_container}>
              
            <Pressable onPress={pickImage} style={styles.imageWrapper}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={styles.circularImage} />
                    ) : (
                        <View style={styles.placeholder} />
                    )}
                </Pressable>

                {
                    Object.entries(form).map(([key, item], index) => (
                        <View key={key}>
                            <CustomInput
                                OnChange={setForm}
                                Secure={item.secure}
                                Type={item.type}
                                PlaceHolder={item.placeholder}
                                Field={key}
                            />
                        </View>
                    ))
                }

                <CustomButton
                    children={'Login With Password'}
                    onClick={handleLoginWithPassword}
                />

                 <CustomButton
                    children={'Login With FaceId'}
                    onClick={handleLoginWithFaceId}
                /> 

                <CustomButton
                    children={'Signup'}
                    onClick={() => navigation.navigate('signUp')}
                />

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary_color,
        width: wp('100%')
    },
    secondary_container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('40%'),
        width: wp('100%')
    },
    myText: {
        fontSize: hp('5%'),
        color: colors.primary_dark,

    },
    input_container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('10%'),
        width: wp('100%'),
    },

});