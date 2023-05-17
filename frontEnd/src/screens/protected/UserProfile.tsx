import React, { useEffect } from "react";
import { View } from 'react-native';
import { FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { capitalize, getAge, serverAPI, timeDiff, windowWidth } from "#src/utils";
import { useThemeContext } from "#src/context/ThemeContext";
import { useFetch } from "#src/hooks";

import { CenterView, ErrorText, ImgViewer, LoadingComp, Text } from "#src/elements";
import { DefaultScreen, EmailVerifComp, MenuCard, UserEdit } from "#src/components";
import { useAuthContext } from "#src/context/AuthContext";

export function UserProfileCard({ Icon, IconName, onPress, title, desc, TitleRightComp }: {
    Icon?: any,
    IconName?: string,
    onPress?: any,
    title?: string,
    desc?: string,
    TitleRightComp?: any
}) {
    return (
        <MenuCard
            title={title ? title : '-'}
            desc={desc}
            onPress={onPress}
            Icon={({ color, size }) =>
                <Icon name={IconName} size={size} color={color} />
            }

            TitleRightComp={TitleRightComp}
        />
    );
}

export default function UserProfile({ route }) {

    const { colors } = useThemeContext();
    const { user } = useAuthContext();
    const { uid: myuid } = user;

    const { uid } = route.params;
    const { fetchData, isPending, error, data } = useFetch();

    useEffect(() => {
        fetchData({
            path: `${serverAPI}/getUser?uid=${uid}`,
            method: 'GET',
        });
    }, [uid])

    // console.log(JSON.stringify(data, null, 4));

    if (isPending) return <LoadingComp />

    if (error || !data) return (
        <CenterView>
            <ErrorText>{error}</ErrorText>
        </CenterView>
    );

    return (
        <DefaultScreen>
            {uid === myuid && <UserEdit />}
            <View style={{ alignItems: 'center' }}>
                <ImgViewer source={{ uri: data.photoURL }} style={{
                    width: windowWidth * 0.6,
                    height: windowWidth * 0.6,
                    borderRadius: 1000,
                    borderWidth: 1,
                    borderColor: colors.text
                }} />
                <Text style={{
                    fontSize: 30,
                    marginTop: 10
                }}>{data['displayName']}</Text>
                <Text style={{ color: 'gray', fontSize: 12, marginBottom: 10 }}>Joined {timeDiff(data.createdAt)}</Text>
            </View>
            <UserProfileCard
                title={data['bloodgroup']}
                IconName={'blood-drop'}
                Icon={Fontisto}
            />
            {data['gender'] &&
                <UserProfileCard
                    title={capitalize(data['gender'])}
                    Icon={MaterialCommunityIcons}
                    IconName={`gender-${data['gender']}`}
                />
            }
            <UserProfileCard
                title={data['dob'] && new Date(data['dob']).toDateString()}
                Icon={MaterialIcons}
                IconName={'cake'}

                desc={data['dob'] && `${getAge(data['dob'])} years old`}
            />
            <UserProfileCard
                title={data['email']}
                Icon={MaterialIcons}
                IconName={'email'}

                TitleRightComp={() => <EmailVerifComp isVerified={data.emailVerified} isMine={uid === myuid} />}
            />
            <UserProfileCard
                title={data['phoneNumber']}
                IconName="phone"
                Icon={FontAwesome}
            />
        </DefaultScreen>
    );
}