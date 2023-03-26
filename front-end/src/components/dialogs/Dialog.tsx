import React, { useState } from 'react';
import {
    StyleProp, ViewStyle,
    View, Modal,
    Pressable, TouchableOpacity, TouchableWithoutFeedback,
} from 'react-native';

export interface DialogProps {
    animationType: 'fade' | 'none' | 'slide',
    CallerContent: any,
    DialogContent: any,
    dialogPosition: 'top' | 'center' | 'bottom',
    dialogContainerStyle: StyleProp<ViewStyle>,
}

export function Dialog({
    animationType = 'fade',
    CallerContent,
    DialogContent,
    dialogPosition, dialogContainerStyle,
}: React.PropsWithChildren<DialogProps>) {

    const [dialogVisible, setDialogVisible] = useState(false);

    function closeDialog() { setDialogVisible(false) }
    function showDialog() { setDialogVisible(true) }

    return (
        <View>
            <Modal
                transparent={true}
                visible={dialogVisible}
                animationType={animationType}
                onRequestClose={closeDialog}
            >
                <Pressable
                    onPress={closeDialog}
                    style={{
                        flex: 1,
                        justifyContent: (dialogPosition === 'top' ?
                            'flex-start' :
                            (dialogPosition === 'bottom' ? 'flex-end' : 'center')
                        ),
                        backgroundColor: 'rgba(0,0,0,0.6)',
                    }}
                >
                    <TouchableWithoutFeedback>
                        <View style={dialogContainerStyle}>
                            <DialogContent closeDialog={closeDialog} />
                        </View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>
            <TouchableOpacity onPress={showDialog}>
                <CallerContent showDialog={showDialog} />
            </TouchableOpacity>
        </View>
    );
};