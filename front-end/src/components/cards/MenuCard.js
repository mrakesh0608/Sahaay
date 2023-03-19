import { View, TouchableOpacity } from 'react-native';

import Text from "@components/elements/Text";

export default function MenuCard({ Icon, title, desc, onPress }) {

    function K() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 20 }}>
                    <Icon />
                </View>
                <View>
                    <Text style={{ fontSize: 16 }}>{title}</Text>
                    {desc && <Text style={{ color: 'gray' }}>{desc}</Text>}
                </View>
            </View>
        )
    }

    if (typeof onPress === 'function') {
        return (
            <TouchableOpacity onPress={onPress}>
                <K />
            </TouchableOpacity>
        )
    }
    return <K />;
}