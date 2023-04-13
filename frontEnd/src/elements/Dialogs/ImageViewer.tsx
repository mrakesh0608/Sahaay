import { ImageProps, View } from 'react-native'
import React from 'react'

import { MaterialIcons } from '@expo/vector-icons';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

import { useThemeContext } from '#src/context/ThemeContext';
import { Image } from '../Misc';
import { DialogCenter } from './DialogCenter';

import ImageV from 'react-native-image-zoom-viewer';

const { config, fs } = RNFetchBlob;
const PictureDir = fs.dirs.PictureDir;

function downloadFile(url: string) {

    if (!(url.startsWith('https://') || url.startsWith('http://'))) {
        alert(`The image is already stored locally.\n\nSo, image cannot be downloaded`);
        return;
    }

    const options = {
        fileCache: true,
        addAndroidDownloads: {
            //Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
                PictureDir +
                '/image_' +
                Math.floor(new Date().getTime() + new Date().getSeconds() / 2) + '.' + url.split('.').pop(),
            description: 'Image',
        },
    };
    config(options)
        .fetch('GET', url)
        .then(res => {
            //Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));
        }).catch(err => {
            console.log(err);
        })
}


export function ImageViewer({
    ...rest
}: React.PropsWithChildren<ImageProps>) {

    const { colors } = useThemeContext();

    const uri = rest.source.uri;

    return (
        <DialogCenter
            CallerContent={() =>
                <Image {...rest} />
            }

            noDefaultDialogContainerStyle={true}
            dialogContainerStyle={{
                flex: 1,
                backgroundColor: colors.background
            }}
            DialogContent={({ closeDialog }) =>
                <>
                    <View style={{
                        padding: 16,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: colors.card
                    }}>
                        <View>
                            <MaterialIcons name="arrow-back" size={24} color={colors.text} onPress={closeDialog} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons
                                name='file-download' size={24} color={colors.text}
                                style={{ marginHorizontal: 20 }}
                                onPress={() => downloadFile(uri)}
                            />
                            <MaterialIcons name='share' size={24} color={colors.text} onPress={() => {
                                Share.open({
                                    title: "Image",
                                    message: "Model Image",
                                    url: uri,
                                    subject: "Image",
                                }).catch(err => {
                                    console.log(err);
                                })
                            }} />
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ImageV imageUrls={[{ url: uri }]} />
                    </View>
                </>
            }
        />
    )
}