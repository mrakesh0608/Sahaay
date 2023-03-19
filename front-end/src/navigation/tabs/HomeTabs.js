import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, Fontisto } from '@expo/vector-icons';

import HomeScreen from '@screens/protected/tabs/HomeScreen';
import RecordsScreen from '@screens/protected/tabs/RecordsScreen';
import UserScreen from '@screens/protected/tabs/UserScreen';

const Tab = createBottomTabNavigator();

export default function ProtectedTabs() {

    const handleTabBarIcons = ({ focused, color, size, route }) => {
        switch (route.name) {
            case 'Home':
                return <Ionicons
                    name={focused ? 'ios-home' : 'ios-home-outline'}
                    size={size} color={color}
                    style={{ fontWeight: 'bold' }}
                />;
            case 'Records':
                return <Fontisto name="prescription" size={size} color={color}/>
            case 'User':
                return <FontAwesome
                    name={focused ? 'user' : 'user-o'}
                    size={focused ? size : size - 4} color={color}
                />
            default:
                return <FontAwesome name="fonticons" size={size} color={color} />;
        }
    }

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 56 },
                tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
                tabBarIcon: (props) => handleTabBarIcons({ ...props, route }),
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Records" component={RecordsScreen} />
            <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
    );
}