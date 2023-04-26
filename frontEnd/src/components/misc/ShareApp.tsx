import React, { useEffect, useState } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import remoteConfig from '@react-native-firebase/remote-config';
import { MaterialIcons } from '@expo/vector-icons';
import Share from 'react-native-share';

import { MenuCard } from '../cards/MenuCard';

export function ShareApp() {

    const [link, setLink] = useState(null);

    useEffect(() => {
        (async () => {
            const link = await dynamicLinks().buildShortLink({
                domainUriPrefix: 'https://sahaay.page.link',
                link: `https://sahaay.page.link/welcome`,
            });
            setLink(link);
        })();
    }, []);

    function handleShareApp() {
        Share
            .open({
                title: "Sahaay App",
                subject: 'Sahaay App',
                message: `Try out this awesome app !!\n\nOpen App : ${link}\n\nDocs : ${'https://github.com/mrakesh0608/Sahaay'}\n\nDownload Apk : ${remoteConfig().getValue('DOWNLOAD_APK').asString()}`
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <MenuCard
            title='Share App'
            onPress={handleShareApp}
            Icon={({ color }) =>
                <MaterialIcons
                    name='share'
                    size={24} color={color}
                />
            }
        />
    );
}