import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableWithoutFeedback} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon, { Icons } from './Icons';

import HomeScreen from '@screens/protected/tabs/HomeScreen';
import RecordsScreen from '@screens/protected/tabs/RecordsScreen';
import UserScreen from '@screens/protected/tabs/UserScreen';
import ChatScreen from '@screens/protected/Chat';

const TabArr = [
    {
        route: 'Home', label: 'Home',
        type: Icons.Ionicons, activeIcon: 'ios-home', inActiveIcon: 'ios-home-outline',
        component: HomeScreen
    },
    {
        route: 'Chat', label: 'Chat',
        type: Icons.CustomIcons, activeIcon: 'chat-o', inActiveIcon: 'chat',
        component: ChatScreen
    },
    {
        route: 'Records', label: 'Records',
        type: Icons.CustomIcons, activeIcon: 'lab-profile-o', inActiveIcon: 'lab-profile',
        component: RecordsScreen
    },
    {
        route: 'User', label: 'User',
        type: Icons.FontAwesome, activeIcon: 'user', inActiveIcon: 'user-o',
        component: UserScreen
    },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate({ 0: { scale: 0.8, color: 'gray' }, 1: { scale: 1.2, color: 'tomato' } });
        } else {
            viewRef.current.animate({ 0: { scale: 1.2, color: 'tomato' }, 1: { scale: 1, color: 'gray' } });
        }
    }, [focused])

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={400}
                style={styles.container}>
                <Icon type={item.type} name={focused ? item.activeIcon : item.inActiveIcon} color={focused ? 'tomato' : 'gray'} />
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
}

export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 50,
                }
            }}
        >
            {TabArr.map((item, index) => {
                return (
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )
            })}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})