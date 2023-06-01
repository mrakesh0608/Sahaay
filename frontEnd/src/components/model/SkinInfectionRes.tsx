import React from 'react';
import { View } from 'react-native';

import json from './skin-disease.json';
import { openUrl } from '#src/utils';

import { Text } from '#src/elements';

export function SkinInfectionRes({ type }: {
    type: string
}) {
    const data = json[type];
    // console.log(data, type);

    if (typeof data === 'object')
        return (
            <>
                {Object.keys(data).map((item, index) =>
                    typeof data[item] === 'string' ?
                        <View key={index}>
                            <Text
                                style={{
                                    textAlign: 'justify',
                                    fontSize: 16,
                                    textTransform: 'capitalize',
                                    // paddingVertical: 10,
                                }}>{item?.trim()} : </Text >
                            <Text
                                style={[{
                                    textAlign: 'justify',
                                    fontSize: 16,
                                    paddingVertical: 10
                                }, [
                                    "treatement-1", "treatement-2"
                                ].includes(item) && { color: 'blue' }
                                ]}
                                onPress={() => {
                                    if (["treatement-1", "treatement-2"].includes(item)) openUrl({ url: data[item] })
                                }}
                            >{data[item]?.trim()}</Text>
                        </View>
                        : null
                )}
            </>
        );
}