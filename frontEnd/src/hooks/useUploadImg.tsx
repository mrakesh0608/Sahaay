import React, { useState } from 'react';
import { View, StyleSheet, StyleProp, ImageStyle, ImageURISource } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import { useThemeContext } from '#src/context/ThemeContext';
import { ImgPicker, windowWidth } from '#src/utils';

import { CapsuleBtn, BorderBtn, ImgViewer, DialogBottom } from '#src/elements';

export function useUploadImg({
    initialImg = null,
    freeSizeImg = false
}: {
    initialImg?: ImageURISource,
    freeSizeImg?: boolean
}) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const [uploadImg, setUploadImg] = useState(initialImg);

    async function uploadImage(type: any) {

        const res = await ImgPicker({ type, freeSizeImg });

        if (!res.canceled) setUploadImg(res.assets[0]);
        else setUploadImg(initialImg)
    };

    function UploadImgComp({
        imgStyle
    }: {
        imgStyle?: StyleProp<ImageStyle>
    }) {
        return (
            <View style={styles.container}>
                {uploadImg &&
                    <>
                        <ImgViewer
                            source={{ uri: uploadImg.uri }}
                            style={[styles.imgStyle, imgStyle]}
                        />
                    </>
                }
                <DialogBottom
                    CallerContent={({ showDialog }) =>
                        <CapsuleBtn
                            title={uploadImg ? 'Replace image' : 'Upload image'}
                            TextLeftComp={() => uploadImg ?
                                <MaterialCommunityIcons name="file-replace-outline" size={24} color={colors.text} /> :
                                <MaterialIcons name="upload-file" size={24} color={colors.text} />}
                            onPress={showDialog}
                        />
                    }

                    DialogTitle='Upload Image'
                    DialogDesc='Choose an option to upload image'

                    DialogContent={() =>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <BorderBtn
                                title={'Camera'}
                                onPress={() => uploadImage('launchCameraAsync')}
                                TextLeftComp={() =>
                                    <Entypo
                                        name="camera" size={24} color={colors.text}
                                        style={{ marginBottom: 10 }}
                                    />
                                }
                            />
                            <BorderBtn
                                title={'Gallery'}
                                onPress={() => uploadImage('launchImageLibraryAsync')}
                                TextLeftComp={() =>
                                    <FontAwesome
                                        name='picture-o' size={22} color={colors.text}
                                        style={{ marginBottom: 10 }}
                                    />
                                }
                            />
                        </View>
                    }
                />
            </View>
        );
    }

    return ({ uploadImg, setUploadImg, UploadImgComp });
}

const makeStyles = (colors: any) => StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 14
    },
    imgStyle: {
        width: windowWidth * 0.60,
        height: windowWidth * 0.60,
        borderColor: colors.text,
        borderWidth: 0.4,
        borderRadius: 4,
    }
})