import { ScrollView, TouchableOpacity, View } from 'react-native';

import { useAuthContext } from '#src/context/AuthContext';

import { ModelList, UserImg } from '#src/components';
import { Text } from '#src/elements';
import { useThemeContext } from '#src/context/ThemeContext';

function Greet() {
    const hrs = new Date().getHours();

    if (hrs < 12)
        return 'Good Morning.';
    else if (hrs >= 12 && hrs <= 17)
        return 'Good Afternoon.';
    else if (hrs >= 17 && hrs <= 24)
        return 'Good Evening.';
}


export default function HomeScreen({ navigation }) {

    const { user } = useAuthContext();
    const { colors } = useThemeContext();

    return (
        <ScrollView contentContainerStyle={{
            padding: 20
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ color: 'gray' }}>{Greet()}</Text>
                    <Text style={{ fontSize: 20 }}>{user.displayName}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('User')}
                    style={{ borderRadius: 25, backgroundColor: colors.text, padding: 1 }}
                >
                    <UserImg width={38} height={38} borderRadius={25} />
                </TouchableOpacity>
            </View>
            <ModelList />
        </ScrollView>
    );
}