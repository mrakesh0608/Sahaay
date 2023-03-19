import { Alert } from 'react-native';

export async function alert({ title, Yes, No, }) {

    const AsyncAlert = () => {
        return new Promise((resolve, reject) => {
            Alert.alert(`Information`, title, [
                {
                    text: No,
                    onPress: () => { resolve(false) }
                },
                {
                    text: Yes,
                    onPress: () => { resolve(true) }
                },
            ],
                {
                    cancelable: true,
                    onDismiss: () => { resolve(true) }
                }
            );
        })
    }

    const type = await AsyncAlert();
    // console.log(type);
    return type;
}