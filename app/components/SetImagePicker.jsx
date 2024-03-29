import * as ImagePicker from 'expo-image-picker';


export const setImagePicker = async () => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
    });

    if (!result.canceled) {
         return result.assets[0].uri;
    }
};