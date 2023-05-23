import * as ImagePicker from 'expo-image-picker';

export async function ImgPicker({
    type, freeSizeImg = false
}: {
    type: 'launchImageLibraryAsync' | 'launchCameraAsync',
    freeSizeImg?: boolean
}) {
    try {
        console.log(freeSizeImg);

        if (!['launchImageLibraryAsync', 'launchCameraAsync'].includes(type)) type = 'launchImageLibraryAsync'

        if (!type) throw Error('Invalid type')

        const options = {
            allowsEditing: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        }

        if (!freeSizeImg) options['aspect'] = [1, 1]

        const result = await ImagePicker[type](options);
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