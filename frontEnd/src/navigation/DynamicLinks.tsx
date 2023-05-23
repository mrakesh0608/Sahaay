import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import { processURL } from '#src/utils';

export function DynamicLinks() {

    const { navigate } = useNavigation()

    const handleDynamicLinks = async (link: any) => {
        if (!link) {
            // console.log('App not opened using dynamic link');
            return;
        }

        // console.log('Dynamic Link Props:', link)

        const processedURL = processURL(link.url)
        // console.log(processedURL);

        if (processedURL.hostname !== 'sahaay.page.link') return;

        const { pathname, params } = processedURL;

        if (pathname === '/code') {
            navigate('UserStack' as never, { screen: 'User Profile', params } as never);
        }
        else if (pathname === '/report') {
            navigate('Report' as never, params as never);
        }
        else console.log('Invalid Dynamic Link');
    }

    //When the app is in the running state
    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLinks)
        return () => unsubscribe()
    }, []);

    //When app is in a background or not in running/opened state 
    useEffect(() => {
        dynamicLinks()
            .getInitialLink()
            .then(handleDynamicLinks);
    }, []);

    return null;
}