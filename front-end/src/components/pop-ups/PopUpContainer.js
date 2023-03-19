import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

import useThemeContext from '@hooks/context/useThemeContext';

export default function PopUpContainer({ PopUpContent, CallerContent }) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const [modalVisible, setModalVisible] = useState(false);

    function PopUpBtn({ title, onPress, style }) {
        return (
            <Pressable
                hitSlop={2}
                onPress={onPress}

                style={({ pressed }) => [
                    {
                        transform: [{
                            scale: pressed ? 1.1 : 1
                        }]
                    },
                    styles.button, styles.buttonClose, style
                ]}
            >
                <Text style={styles.textStyle}>{title}</Text>
            </Pressable>
        )
    }

    return (
        <View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <PopUpContent
                            setModalVisible={setModalVisible}
                            hideModel={() => setModalVisible(false)}
                            mStyles={{ ...styles }}
                            PopUpBtn={PopUpBtn}
                        />
                    </View>
                </View>
            </Modal>
            <Pressable hitSlop={2} onPress={() => setModalVisible(true)} style={({ pressed }) => [
                pressed && { opacity: 0.4 }
            ]}>
                <CallerContent />
            </Pressable>
        </View>
    );
};

const makeStyles = (colors) => StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalView: {
        margin: 20,
        backgroundColor: colors.card,
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: colors.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    button: {
        borderRadius: 20,
        padding: 12,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        color: colors.text,
        marginBottom: 15,
        textAlign: 'center',
    },
});