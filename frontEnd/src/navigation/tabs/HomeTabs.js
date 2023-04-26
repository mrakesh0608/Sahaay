import React, { useEffect, useRef } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';

import * as Icons from '#src/icons';

import HomeScreen from '#src/screens/protected/tabs/HomeScreen';
import ChatScreen from '#src/screens/protected/tabs/ChatScreen';
import RecordsScreen from '#src/screens/protected/tabs/RecordsScreen';
import UserScreen from '#src/screens/protected/tabs/UserScreen';
import { useThemeContext } from '#src/context/ThemeContext';

const Tab = createBottomTabNavigator();

const TabButton = ({ Icon, activeIcon, inActiveIcon, onPress, accessibilityState }) => {

    const { colors } = useThemeContext();

    const focused = accessibilityState.selected;
    const viewRef = useRef(null);

    useEffect(() => {
        if (focused) viewRef.current.animate({
            0: { scale: 0.8, color: colors.inactiveTint },
            1: { scale: 1.2, color: colors.activeTint }
        });
        else viewRef.current.animate({
            0: { scale: 1.2, color: colors.activeTint },
            1: { scale: 1, color: colors.inactiveTint }
        });
    }, [focused])

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={280}
                style={styles.container}>
                <Icon Icon={Icon} size={24} name={focused ? activeIcon : inActiveIcon} color={focused ? colors.activeTint : colors.inactiveTint} />
            </Animatable.View>
        </TouchableWithoutFeedback>
    )
}

export default function HomeTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Tab.Screen
                name={'Home'} component={HomeScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            {...props}
                            Icon={Icons.Ionicons}
                            activeIcon='ios-home' inActiveIcon='ios-home-outline'
                        />
                }}
            />
            <Tab.Screen
                name={'Chat'} component={ChatScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            {...props}
                            Icon={Icons.CustomIcons}
                            activeIcon='chat-o' inActiveIcon='chat'
                        />,
                    tabBarHideOnKeyboard: true
                }}
            />
            <Tab.Screen
                name={'Records'} component={RecordsScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            {...props}
                            Icon={Icons.CustomIcons}
                            activeIcon='lab-profile-o' inActiveIcon='lab-profile'
                        />
                }}
            />
            <Tab.Screen
                name={'User'} component={UserScreen}
                options={{
                    tabBarButton: (props) =>
                        <TabButton
                            {...props}
                            Icon={Icons.FontAwesome}
                            activeIcon='user' inActiveIcon='user-o'
                        />
                }}
            />
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