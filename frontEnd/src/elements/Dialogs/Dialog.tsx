import React, { useState } from 'react';
import {
    StyleProp, ViewStyle,
    View, Modal,
    Pressable, TouchableOpacity, TouchableWithoutFeedback, Animated, ScrollView
} from 'react-native';

export interface DialogProps {
    animationType?: 'fade' | 'none' | 'slide',
    CallerContent: any,
    DialogContent: any,
    dialogPosition?: 'top' | 'center' | 'bottom',
    dialogContainerStyle?: StyleProp<ViewStyle>,
    dialogContainerAniStyle?: Animated.AnimatedProps<StyleProp<ViewStyle>>
    onCloseDialog?: any,
    onShowDialog?: any
}

export function Dialog({
    animationType = 'fade',
    CallerContent,
    DialogContent,
    dialogPosition,
    dialogContainerStyle, dialogContainerAniStyle,
    onCloseDialog,
    onShowDialog
}: React.PropsWithChildren<DialogProps>) {

    const [dialogVisible, setDialogVisible] = useState(false);

    function closeDialog() {
        if (typeof onShowDialog === 'function') onCloseDialog(() => setDialogVisible(false))
        else setDialogVisible(false)
    }
    function showDialog(e) {
        e.preventDefault();
        setDialogVisible(true);
        if (typeof onShowDialog === 'function') onShowDialog();
    }

    const animatedCardStyle: Animated.Animated = dialogContainerAniStyle;

    return (
        <View>
            <Modal
                transparent={true}
                visible={dialogVisible}
                animationType={animationType}
                onRequestClose={closeDialog}
                pointerEvents='none'
            >
                <Pressable
                    onPress={closeDialog}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        justifyContent: (dialogPosition === 'top' ?
                            'flex-start' :
                            (dialogPosition === 'bottom' ? 'flex-end' : 'center')
                        )
                    }}
                >
                    <TouchableWithoutFeedback>
                        <Animated.View style={[dialogContainerStyle, animatedCardStyle]}>
                            <ScrollView>
                                <DialogContent closeDialog={closeDialog} />
                            </ScrollView>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Pressable>
            </Modal>
            <TouchableOpacity onPress={showDialog}>
                <CallerContent showDialog={showDialog} />
            </TouchableOpacity>
        </View>
    );
};