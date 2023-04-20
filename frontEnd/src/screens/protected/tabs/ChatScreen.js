import { useState, useRef, useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { chatGPT } from '#src/utils';

import { CardContainer, ChatMsg, ChatInput } from '#src/components';
import { Text } from '#src/elements'
import { useThemeContext } from '#src/context/ThemeContext';

export default function ChatScreen() {

    const flatListRef = useRef(null);
    const [chats, setChats] = useState([]);

    const { colors } = useThemeContext();

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
                "txt": currentTxt.trim(),
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
                backgroundColor: colors.card,
                padding: 10
            }}>
                <Text style={{ alignSelf: 'center', color: colors.text }}>Chat with an assistant</Text>
            </View>
            <Text style={{ alignSelf: 'center', marginVertical: 6, padding: 4, color: 'coral' }}>This chat history will be cleared when you close the app.</Text>
            <View style={{ flex: 0.8, flexGrow: 1 }}>
                <FlatList

                    nestedScrollEnabled={true}
                    data={chats}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                        <ChatMsg chat={item} />
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