import React, { useEffect, useState } from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import {
    CapsuleBtn, DialogCenter, ErrorText, ShareBtn
} from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';
import { useDeleteReportById } from '#src/firebase';

export function MoreOptions({ id, report_uid }) {

    const { colors } = useThemeContext();

    const { navigate } = useNavigation();

    const [link, setLink] = useState(null);

    const { deleteReportById, isPending, error } = useDeleteReportById();

    function handleDelete({ cb }) {
        deleteReportById(id, (err, data) => {
            if (data?.status === 200) {
                cb();
                navigate('HomeTabs' as never);
            }
        })
    }

    useEffect(() => {
        (async () => {
            const link = await dynamicLinks().buildShortLink({
                domainUriPrefix: 'https://sahaay.page.link',
                link: `https://sahaay.page.link/report?id=${id}`
            });
            setLink(link);
        })();
    }, []);

    return (
        <DialogCenter
            CallerContent={() =>
                <Feather
                    name="more-vertical" size={24}
                    color={colors.text}
                    style={{ marginRight: 16 }}
                />
            }
            DialogContent={({ closeDialog }) =>
                <>
                    {auth().currentUser.uid === report_uid &&
                        <>
                            <CapsuleBtn
                                title='Delete Report'
                                TextLeftComp={() =>
                                    <MaterialCommunityIcons
                                        name="trash-can-outline"
                                        size={24} color={'white'}
                                    />
                                }
                                isPending={isPending}
                                containerStyle={{ backgroundColor: 'red' }}
                                textStyle={{ color: 'white' }}
                                ActivityIndicatorColor={'white'}
                                onPress={() => {
                                    handleDelete({
                                        cb: closeDialog
                                    })
                                }}

                            />
                            <ErrorText>{error}</ErrorText>
                        </>
                    }
                    <ShareBtn
                        title='Share'
                        ShareOptions={{
                            title: "Report",
                            subject: 'Sahaay Report',
                            message: `Hey, check my report\n${link}`
                        }}
                    />
                </>
            }
        />
    )
}