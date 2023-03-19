import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export async function uploadImage() {

    const AsyncAlert = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(`Upload Image`, '', [
                {
                    text: 'Choose From Gallery',
                    onPress: () => { resolve('launchImageLibraryAsync') }
                },
                {
                    text: 'Take a Photo',
                    onPress: () => { resolve('launchCameraAsync') }
                },
            ],
                {
                    cancelable: true,
                    onDismiss: () => { resolve(null) }
                }
            );
        })
    }

    const type = await AsyncAlert();
    // console.log(type);

    if (!type) return { canceled: true };

    const result = await ImagePicker[type]({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });

    return {
        canceled: result.canceled,
        assets: result.assets
    };
}