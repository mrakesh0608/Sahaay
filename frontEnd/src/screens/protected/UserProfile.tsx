import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View } from 'react-native';

import { FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useThemeContext } from "#src/context/ThemeContext";
import { getUserFieldsById } from "#src/firebase";
import { timeDiff, windowWidth } from "#src/utils";
import { usePED } from "#src/hooks";

import { ErrorText, ImageViewer, LoadingComp, Text } from "#src/elements";

import { CardContainer, EmailVerifComp, MenuCard, UserEdit } from "#src/components";

function UPI({ Icon, IconName, text }) {

    const { colors } = useThemeContext();

    return (
        <TouchableOpacity style={{
            flexGrow: 1,
            flexShrink: 1,
            marginHorizontal: 20
        }}>
            <CardContainer>
                <Icon name={IconName} size={24} color={colors.text} />
                <Text style={{
                    fontSize: 24,
                    alignSelf: 'flex-end'
                }}>{text ? text : '-'}</Text>
            </CardContainer>
        </TouchableOpacity>
    );
}

export default function UserProfile({ route }) {

    const { colors } = useThemeContext();
    const { uid } = route.params;
    const { isPending, setIsPending, error, setError, data, setData } = usePED();

    useEffect(() => {
        setIsPending(true);
        getUserFieldsById(uid, (err: any, data: any) => {
            if (err) setError(err);
            else setData(data);
            setIsPending(false);
        })
    }, [uid])

    if (isPending) return <LoadingComp />
    if (error || !data) return <ErrorText>{error}</ErrorText>

    const { photoURL, Theme, ...rest } = data;
    rest["User ID"] = uid;
    console.log(data);

    const list = [
        <UPI
            text={data['bloodgroup']}
            Icon={Fontisto}
            IconName={'blood-drop'}
        />,
        <UPI
            text={data['height']}
            Icon={MaterialCommunityIcons}
            IconName={'human-male-height-variant'}
        />
    ]

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <UserEdit />
                    <View style={{ alignItems: 'center' }}>
                        <ImageViewer source={{ uri: photoURL }} style={{
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
                        <Text style={{ color: 'gray', fontSize: 12, marginBottom: 10 }}>Joined {123}</Text>
                    </View>
                </>
            }
            data={list}
            renderItem={({ item }) => item}
            numColumns={3}
            contentContainerStyle={{
                paddingVertical: 20
            }}
            ListFooterComponent={
                <>
                    <MenuCard
                        title={data['gender'] ? data['gender'] : '-'}
                        onPress={() => { }}
                        containerStyle={{ margin: 20 }}
                        Icon={() =>
                            <MaterialCommunityIcons name={'gender-male' || 'gender-female' || 'gender-transgender'} size={24} color={colors.text} />
                        }
                    />
                    <MenuCard
                        title={data['bod'] ? data['bod'] : '-'}
                        desc={data['age'] ? `${data['age']} years old` : '-'}
                        onPress={() => { }}
                        containerStyle={{ margin: 20 }}
                        Icon={() =>
                            <MaterialIcons name='cake' size={24} color={colors.text} />
                        }
                    />
                    <MenuCard
                        title={data['email'] ? data['email'] : '-'}
                        TitleRightComp={EmailVerifComp}
                        onPress={() => { }}
                        containerStyle={{ margin: 20 }}
                        Icon={() =>
                            <MaterialIcons name="email" size={24} color={colors.text} />
                        }
                    />
                    <MenuCard
                        title={data['phoneNumber'] ? data['phoneNumber'] : '-'}
                        onPress={() => { }}
                        containerStyle={{ margin: 20 }}
                        Icon={() =>
                            <FontAwesome name="phone" size={24} color={colors.text} />
                        }
                    />
                </>
            }
        />
    );
}