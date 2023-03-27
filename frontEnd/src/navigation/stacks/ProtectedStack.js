import { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import useAuthContext from '@hooks/context/useAuthContext';

import UserStack from '@navigation/stacks/UserStack';
import HomeTabs from '@navigation/tabs/HomeTabs';
import AppInfo from '@screens/protected/AppInfo';

import PrescriptionDigit from '@screens/protected/models/PrescriptionDigit';
import SkinInfectionDet from '@screens/protected/models/SkinInfectionDet';
import KidneyStoneDet from '@screens/protected/models/KidneyStoneDet';
import BrainTumorDet from '@screens/protected/models/BrainTumorDet';
import ModelRes from '@screens/protected/models/ModelRes';

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

            <Stack.Screen name='App info' component={AppInfo} />
        </Stack.Navigator>
    );
}