import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react'
import HomeTabs from '@navigation/tabs/HomeTabs';
import UserStack from '@navigation/stacks/UserStack';
import About from '@screens/protected/About';

import PrescriptionDigit from '@screens/protected/models/PrescriptionDigit';
import PrescriptionDigitRes from '@screens/protected/models/PrescriptionDigitRes';
import BrainTumorDet from '@screens/protected/models/BrainTumorDet';
import BrainTumorDetRes from '@screens/protected/models/BrainTumorDetRes';
import KidneyStoneDet from '@screens/protected/models/KidneyStoneDet';
import KidneyStoneDetRes from '@screens/protected/models/KidneyStoneDetRes';
import SkinInfectionDet from '@screens/protected/models/SkinInfectionDet';
import SkinInfectionDetRes from '@screens/protected/models/SkinInfectionDetRes';
import useAuthContext from '@hooks/context/useAuthContext';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function ProtectedStack() {

    const { isNewUser } = useAuthContext();
    const navigation = useNavigation();
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

            <Stack.Screen name='PrescriptionDigitRes' component={PrescriptionDigitRes} options={{
                title: 'Prescription Digitization Result'
            }} />
            <Stack.Screen name='BrainTumorDetRes' component={BrainTumorDetRes} options={{
                title: 'Brain Tumor Detection Result'
            }} />
            <Stack.Screen name='KidneyStoneDetRes' component={KidneyStoneDetRes} options={{
                title: 'Kidney Stone Detection Result'
            }} />
            <Stack.Screen name='SkinInfectionDetRes' component={SkinInfectionDetRes} options={{
                title: 'Skin Infection Detection Result'
            }} />

            <Stack.Screen name='About' component={About} />
        </Stack.Navigator>
    );
}