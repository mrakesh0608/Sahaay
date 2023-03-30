import React, { useState, useRef, useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { chatGPT } from '@utils/index';
import CardContainer from '@components/cards/CardContainer';
import { Text } from '@components/elements'
import ChatComp from '@components/ChatComp';
import ChatInput from '@components/ChatInput';

export default function Chat() {

    const flatListRef = useRef(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        chats.forEach(async item => {

            if (item.res.txt || item.res.createdAt) return;

            const resTxt = await chatGPT({ txt: item.req.txt });

            const chatIndex = chats.findIndex(i => i.id === item.id)
            if (chatIndex === -1) return;

            chats[chatIndex].res.txt = resTxt;
            chats[chatIndex].res.createdAt = new Date();

            setChats([...chats]);
        })
    }, [chats])

    async function handleSend({ currentTxt, setCurrentTxt }) {
        if (!currentTxt) return;

        const id = new Date();
        setChats([...chats, {
            "id": id,
            "req": {
                "txt": currentTxt,
                "createdAt": new Date(),
            },
            "res": {
                "txt": null,
                "createdAt": null
            }
        }])
        setCurrentTxt('');
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                justifyContent: 'center',
                backgroundColor: 'gray',
                padding: 8
            }}>
                <Text style={{ alignSelf: 'center' }}>Chat with an assistant</Text>
            </View>
            <View style={{ flex: 0.8, flexGrow: 1 }}>
                <FlatList

                    nestedScrollEnabled={true}
                    data={chats}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                        <ChatComp chat={item} />
                    }
                    ref={flatListRef}
                    onContentSizeChange={() => chats.length && flatListRef?.current?.scrollToEnd()}
                    contentContainerStyle={chats.length ? {
                        // flex: 1,
                        // flexGrow: 1,
                        paddingVertical: 5,
                        paddingHorizontal: 20,
                    } : {
                        flex: 1,
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}

                    ListEmptyComponent={
                        <CardContainer>
                            <Text>Chats that you send appear here</Text>
                        </CardContainer>
                    }
                />
            </View>
            <ChatInput handleSend={handleSend} />
        </View>
    )
}