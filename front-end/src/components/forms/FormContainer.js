import { ScrollView, StyleSheet, Image } from 'react-native';

export default function FormContainer(props) {
    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps='handled'
        >
            <Image
                source={require('@assets/icon.png')}
                style={{ alignSelf: 'center' }}
            />
            {props.children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',

        paddingVertical: 40,
        paddingHorizontal: 20,
    },
})