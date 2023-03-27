import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import useThemeContext from '@hooks/context/useThemeContext';

import { Dialog, DialogProps } from '@components/dialogs/Dialog';
import { Text } from '@components/elements';

interface optinalProps {
    DialogTitle: String,
    DialogDesc: String,
}

export interface DialogTitleCloseDesc extends DialogProps, Partial<optinalProps> { }

export default function DialogTitleCloseDesc({
    DialogTitle, DialogDesc, DialogContent, ...rest
}: React.PropsWithChildren<DialogTitleCloseDesc>) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    return (
        <Dialog
            animationType='slide'
            dialogPosition='bottom'

            DialogContent={({ closeDialog }) =>
                <View>
                    <View style={styles.titleComp}>
                        <Text style={styles.title}>{DialogTitle}</Text>
                        <TouchableOpacity onPress={closeDialog}>
                            <AntDesign name="close" style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container}>
                        {DialogDesc && <Text style={styles.desc}>{DialogDesc}</Text>}
                        <DialogContent closeDialog={closeDialog} />
                    </View>
                </View>
            }
            {...rest}
        />
    );
};

const makeStyles = (colors) => StyleSheet.create({
    titleComp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 1,

        padding: 16,  // ## same
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: colors.nearBackground,
    },
    title: {
        flexGrow: 1,
        fontWeight: 'bold',
        fontSize: 16,
    },
    desc: {
        paddingLeft: 16, // ## same
        paddingVertical: 10,
    },
    iconStyle: {
        fontSize: 14, //works as icon size
        padding: 4,
        borderRadius: 25,
        color: colors.text,
        backgroundColor: colors.background,
    },
    container: {
        paddingBottom: 16, // ## same
        backgroundColor: colors.background,
    }
});