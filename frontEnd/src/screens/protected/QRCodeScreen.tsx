import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { QRCodeGenerator, QRCodeScanner } from '#src/components';

const Tab = createMaterialTopTabNavigator();

export default function QRCodeScreen({ navigation }) {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: 'capitalize'
                }
            }}
        >
            <Tab.Screen name="My code" component={QRCodeGenerator} />
            <Tab.Screen name="Scan code" component={QRCodeScanner} />
        </Tab.Navigator>
    );
}