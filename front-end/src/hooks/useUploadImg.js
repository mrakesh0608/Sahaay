import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';

import * as util from '@utils/index';
import useThemeContext from '@hooks/context/useThemeContext';

import DialogTitleCloseDesc from '@components/dialogs/DialogTitleCloseDesc';
import { CapsuleBtn, BorderBtn } from '@components/elements';

export default function useUploadImg(props) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const old = props ? props.old : null;
    const [uploadImg, setUploadImg] = useState(old);

    async function uploadImage(type) {

        const res = await util.uploadImage(type);

        if (!res.canceled) setUploadImg(res.assets[0]);
        else setUploadImg(old)
    };

    const UploadImgComp = () => (
        <View style={styles.container}>
            {uploadImg &&
                <Image
                    source={{ uri: uploadImg.uri }}
                    style={styles.uploadImgPreview}
                    resizeMode='contain'
                />
            }
            <DialogTitleCloseDesc
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
    return ({ uploadImg, UploadImgComp });
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 14
    },
    uploadImgPreview: {
        width: util.windowWidth * 0.60,
        height: util.windowWidth * 0.60,
        borderWidth: 0.4,
        borderColor: colors.text,
        borderRadius: 4,
    }
})