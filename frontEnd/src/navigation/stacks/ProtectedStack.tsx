import React from 'react'
import { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { useAuthContext } from '#src/context/AuthContext';

import UserStack from '#src/navigation/stacks/UserStack';
import HomeTabs from '#src/navigation/tabs/HomeTabs';

import PrescriptionDigit from '#src/screens/protected/models/PrescriptionDigit';
import KidneyStoneDet from '#src/screens/protected/models/KidneyStoneDet';
import BrainTumorDet from '#src/screens/protected/models/BrainTumorDet';
import SkinDiseaseDet from '#src/screens/protected/models/SkinDiseaseDet';
import CaloriesEstimation from '#src/screens/protected/models/CaloriesEstimation';

import DigitalPrescription from '#src/screens/protected/DigitalPrescription';
import SearchMedicine from '#src/screens/protected/SearchMedicine';
import AppInfoScreen from '#src/screens/protected/AppInfoScreen';
import QRCodeScreen from '#src/screens/protected/QRCodeScreen';
import SearchMedicineRes from '#src/screens/protected/SearchMedicineRes';
import DigitalPrescriptionForm from '#src/screens/protected/DigitalPrescriptionForm';
import ReportScreen from '#src/screens/protected/ReportScreen';

const Stack = createStackNavigator();

export default function ProtectedStack() {

    const navigation = useNavigation();
    const { isNewUser } = useAuthContext();

    useEffect(() => {
        if (isNewUser) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'UserStack' }],
            } as never);
        }

    }, [isNewUser])

    return (
        <Stack.Navigator initialRouteName={isNewUser ? 'UserStack' : 'HomeTabs'}>

            <Stack.Screen name='HomeTabs' component={HomeTabs}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='UserStack' component={UserStack}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen name='Prescription Digitization' component={PrescriptionDigit} />
            <Stack.Screen name='Brain Tumor Detection' component={BrainTumorDet} />
            <Stack.Screen name='Kidney Stone Detection' component={KidneyStoneDet} />
            <Stack.Screen name='Skin Disease Detection' component={SkinDiseaseDet} />
            <Stack.Screen name='Calories Estimation' component={CaloriesEstimation} />

            <Stack.Screen name='Digital Prescription' component={DigitalPrescription} />
            <Stack.Screen name='Search Medicine' component={SearchMedicine} />

            <Stack.Screen name='Digital Prescription Form' component={DigitalPrescriptionForm} />
            <Stack.Screen name='Search Medicine Result' component={SearchMedicineRes} />

            <Stack.Screen name='Report' component={ReportScreen} />

            <Stack.Screen name='QR Code' component={QRCodeScreen}
                options={{
                    headerStyle: {
                        shadowColor: 'transparent',
                    },
                }}
            />

            <Stack.Screen name='App Info' component={AppInfoScreen} />
        </Stack.Navigator>
    );
}