import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import { windowWidth } from '#src/utils';

import { useThemeContext } from '#src/context/ThemeContext';
import { useAuthContext } from '#src/context/AuthContext';

import { LoadingComp, ShareBtn, Text, TransparentBtn } from '#src/elements';
import { SpringView } from '#src/elements/Misc/SpringView';

export function QRCodeGenerator({
    shareTxt
}: {
    shareTxt?: string
}) {

    const { colors } = useThemeContext();
    const { user } = useAuthContext();
    const { uid, photoURL } = user;

    const [link, setLink] = useState(null);
    const [code, setCode] = useState(null);
    const [ShareOptions, setShareOptions] = useState(null);

    async function generateQRCode() {
        const link = await dynamicLinks().buildShortLink({
            domainUriPrefix: 'https://sahaay.page.link',
            link: `https://sahaay.page.link/code?uid=${uid}`
        });
        setLink(link);
    }

    useEffect(() => {
        generateQRCode();
    }, [uid]);

    useEffect(() => {
        code?.toDataURL((data: any) => {
            // console.log(data);
            setShareOptions({
                title: "Sahaay QR Code",
                subject: 'Sahaay QR Code',
                url: `data:image/png;base64,${data}`,
                message: `Hey, this is my Sahaay QR code\n${link}`
            });
        });
    }, [code])

    if (!link) return <LoadingComp title='Generating your QR Code' />

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <SpringView style={{
                alignSelf: 'center', backgroundColor: 'white', shadowColor: colors.text, padding: 8, borderRadius: 20, elevation: 8
            }}>
                <QRCode
                    getRef={(ref?) => setCode(ref)}

                    value={link}
                    size={windowWidth * 0.6}
                    quietZone={20}

                    logo={{ uri: photoURL }}
                    logoBackgroundColor={'white'}
                    logoBorderRadius={25}
                />
            </SpringView>
            <Text style={{ textAlign: 'center', marginVertical: 40 }}>{shareTxt ? shareTxt : `Share your code with someone, they can\nscan it with their Sahaay or any QR code scanner\nto see your profile in Sahaay app.`}</Text>
            <ShareBtn ShareOptions={ShareOptions} />
            <TransparentBtn
                title='Reset QR Code'
                onPress={generateQRCode}
            />
        </View >
    );
}