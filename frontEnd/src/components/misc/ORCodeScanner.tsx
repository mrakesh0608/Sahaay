import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';
import { Camera, FlashMode } from 'expo-camera';

import { openUrl, ImgPicker, windowWidth } from '#src/utils';
import { ZoomBtn, Text, CapsuleBtn } from '#src/elements';

const opacity = 'rgba(0, 0, 0, .5)';
const opacity2 = 'rgba(0, 0, 0, .4)';

function Btn({ Icon, IconName, onPress, color }) {
    return (
        <ZoomBtn
            Icon={
                <Icon
                    name={IconName}
                    size={36}
                    color={color}
                />
            }
            onPress={onPress}
            style={{ backgroundColor: opacity2 }}
        />
    );
}

export function QRCodeScanner() {

    const isFocused = useIsFocused();

    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [flash, setFlash] = useState(FlashMode.off);

    // Camera permissions are still loading
    if (!isFocused || !permission) return <View />;

    // Camera permissions are not granted yet
    if (!permission.granted) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ textAlign: 'center' }}>We need your permission to use the camera</Text>
                <CapsuleBtn onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    function toggleFlash() {
        setFlash(current => (current === FlashMode.torch ? FlashMode.off : FlashMode.torch));
    }

    async function handleBarCodeScanned(e: BarCodeScannerResult) {
        console.log(e);
        openUrl({ url: e.data })
    }

    async function handleLocalCode() {
        const res = await ImgPicker({ type: "launchImageLibraryAsync" })

        if (res.canceled) {
            console.log(res);
            return;
        }
        else {
            const url = res.assets[0]?.uri;
            console.log(url);
            if (!url) return;
            BarCodeScanner
                .scanFromURLAsync(url, [BarCodeScanner.Constants.BarCodeType.qr])
                .then((res) => handleBarCodeScanned(res[0]))
                .catch(err => console.log(err))
        }
    }

    return (
        <Camera
            flashMode={flash}

            barCodeScannerSettings={{
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}

            onBarCodeScanned={handleBarCodeScanned}

            style={[StyleSheet.absoluteFill]}
        >
            <View style={styles.layerTop}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Scan a Sahaay QR Code</Text>
            </View>
            <View style={styles.layerCenter}>
                <View style={styles.layerSides} />
                <View style={styles.focused} />
                <View style={styles.layerSides} />
            </View>
            <View style={styles.layerBottom}>
                <Btn
                    Icon={Ionicons}
                    IconName={"flashlight"}
                    color={flash === FlashMode.torch ? "deepskyblue" : "white"}
                    onPress={toggleFlash}
                />
                <Btn
                    Icon={MaterialIcons}
                    IconName={"photo-library"}
                    color={"white"}
                    onPress={handleLocalCode}
                />
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    layerTop: {
        flexGrow: 1,
        backgroundColor: opacity,
        justifyContent: 'center',
        alignItems: 'center'
    },
    layerCenter: {
        flexShrink: 1,
        flexDirection: 'row',
    },
    layerSides: {
        flexGrow: 1,
        backgroundColor: opacity
    },
    focused: {
        width: windowWidth * 0.65,
        height: windowWidth * 0.65,
        borderWidth: 1,
        borderColor: '#000000AA'
    },
    layerBottom: {
        flexGrow: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',

        backgroundColor: opacity
    },
});