import React, { useEffect, useState } from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import { useThemeContext } from '#src/context/ThemeContext';

import { useDeleteReportById } from '#src/firebase';
import { BtnContainer, DialogCenter, ShareBtn, ZoomBtn } from '#src/elements';

export function MoreOptions({ id, report_uid }) {

    const { colors } = useThemeContext();

    const { navigate } = useNavigation();

    const [link, setLink] = useState(null);

    const { deleteReportById, data, isPending, error } = useDeleteReportById();

    useEffect(() => {
        if (data?.status === 200) navigate('HomeTabs' as never);
    }, [data])

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
                        <BtnContainer>
                            <ZoomBtn
                                title='Delete Report'
                                Icon={<MaterialCommunityIcons
                                    name="trash-can-outline"
                                    size={24} color={'white'}
                                />}
                                style={{ backgroundColor: 'red' }}
                                onPress={() => {
                                    deleteReportById({ id });
                                    closeDialog();
                                }}
                            />
                        </BtnContainer>
                    }
                    <BtnContainer>
                        <ShareBtn
                            title='Share'
                            ShareOptions={{
                                title: "Report",
                                subject: 'Sahaay Report',
                                message: `Hey, check my report\n${link}`
                            }}
                        />
                    </BtnContainer>
                </>
            }
        />
    )
}