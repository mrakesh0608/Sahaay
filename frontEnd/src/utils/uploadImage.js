import * as ImagePicker from 'expo-image-picker';

export async function uploadImage(type) {

    if (!['launchImageLibraryAsync', 'launchCameraAsync'].includes(type)) type = 'launchImageLibraryAsync'

    if (!type) return { canceled: true };

    const result = await ImagePicker[type]({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    // console.log(result);

    return {
        canceled: result.canceled,
        assets: result.assets
    };
}