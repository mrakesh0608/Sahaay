import React, { useEffect } from "react";
import { View } from 'react-native';
import { FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { capitalize, getAge, serverAPI, timeDiff, windowWidth } from "#src/utils";
import { useThemeContext } from "#src/context/ThemeContext";
import { useFetch } from "#src/hooks";

import { CapsuleBtn, CenterView, ErrorText, ImgViewer, LoadingComp, Text } from "#src/elements";
import { DefaultScreen, DeleteMyAccount, EmailVerifComp, MenuCard, UserEdit } from "#src/components";
import { useAuthContext } from "#src/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

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

    const { navigate } = useNavigation();
    const { colors } = useThemeContext();
    const { user, role } = useAuthContext();
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
            {role === 'doctor' && myuid === uid ?
                <UserProfileCard
                    title={'I am a Doctor'}
                    IconName="doctor"
                    Icon={Fontisto}
                />
                : null}
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
            {role === 'doctor' && myuid !== uid &&
                <CapsuleBtn
                    title="Write Prescription"
                    TextLeftComp={() => <MaterialCommunityIcons name="prescription" size={24} color={colors.text} />}
                    onPress={() => navigate('Digital Prescription Form' as never, { data: { ...data } } as never)}
                />
            }
            {myuid === uid ? < DeleteMyAccount /> : null}
        </DefaultScreen>
    );
}