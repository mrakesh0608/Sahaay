import * as ImagePicker from 'expo-image-picker';

export async function uploadImage(type) {
    try {
        if (!['launchImageLibraryAsync', 'launchCameraAsync'].includes(type)) type = 'launchImageLibraryAsync'

        if (!type) throw Error('Invalid type')

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
    } catch (error) {
        console.log(error);
        return { canceled: true };
    }
}