import { ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet, StatusBar } from 'react-native';

export default function DefaultScreen(props) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.container}>
                {props.children}
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        // paddingTop: StatusBar.currentHeight,
    },
})