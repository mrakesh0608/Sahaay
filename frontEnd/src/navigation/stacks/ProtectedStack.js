import { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '#src/context/AuthContext';

import UserStack from '#src/navigation/stacks/UserStack';
import HomeTabs from '#src/navigation/tabs/HomeTabs';

import PrescriptionDigit from '#src/screens/protected/models/PrescriptionDigit';
import SkinInfectionDet from '#src/screens/protected/models/SkinInfectionDet';
import KidneyStoneDet from '#src/screens/protected/models/KidneyStoneDet';
import BrainTumorDet from '#src/screens/protected/models/BrainTumorDet';
import ModelRes from '#src/screens/protected/models/ModelRes';

import AppInfoScreen from '#src/screens/protected/AppInfoScreen';

const Stack = createStackNavigator();

export default function ProtectedStack() {

    const navigation = useNavigation();
    const { isNewUser } = useAuthContext();

    useEffect(() => {
        if (isNewUser) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'UserStack' }],
            });
        }

    }, [isNewUser])

    return (
        <Stack.Navigator initialRouteName={isNewUser ? 'UserStack' : 'HomeTabs'}>

            <Stack.Screen name='HomeTabs' component={HomeTabs} options={{
                headerShown: false
            }} />

            <Stack.Screen name='UserStack' component={UserStack} options={{
                headerShown: false
            }} />

            <Stack.Screen name='PrescriptionDigit' component={PrescriptionDigit} options={{
                title: 'Prescription Digitization'
            }} />
            <Stack.Screen name='BrainTumorDet' component={BrainTumorDet} options={{
                title: 'Brain Tumor Detection'
            }} />
            <Stack.Screen name='KidneyStoneDet' component={KidneyStoneDet} options={{
                title: 'Kidney Stone Detection'
            }} />
            <Stack.Screen name='SkinInfectionDet' component={SkinInfectionDet} options={{
                title: 'Skin Infection Detection'
            }} />

            <Stack.Screen name='ModelRes' component={ModelRes} options={{
                title: 'Report',
            }} />

            <Stack.Screen name='App info' component={AppInfoScreen} />
        </Stack.Navigator>
    );
}