import { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as util from '@utils/index';

import useThemeContext from '@hooks/context/useThemeContext';

import BtnWithImg from '@components/elements/btn/BtnWithImg';

export default function useUploadImg(props) {

    const { colors } = useThemeContext();
    const styles = makeStyles(colors);

    const old = props ? props.old : null;
    const [uploadImg, setUploadImg] = useState(old);

    async function uploadImage() {

        const res = await util.uploadImage();

        if (!res.canceled) setUploadImg(res.assets[0]);
        else {
            setUploadImg(old);
            // alert('Uploading an Image cancelled')
        }
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
            <BtnWithImg
                title={uploadImg ? 'Replace this image' : 'Upload an image'}
                Image={({ color }) => uploadImg ?
                    <MaterialCommunityIcons name="file-replace-outline" size={24} color={color} /> :
                    <MaterialIcons name="upload-file" size={24} color={color} />}
                onPress={uploadImage}
            />
        </View>
    );
    return ({ uploadImg, UploadImgComp });
}

const makeStyles = (colors) => StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20
    },
    uploadImgPreview: {
        resizeMode: 'contain',
        width: util.windowWidth * 0.75,
        height: util.windowWidth * 0.75,
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 4
    }
})