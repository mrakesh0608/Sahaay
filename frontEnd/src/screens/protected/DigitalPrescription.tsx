import React from 'react';

import { CenterView, Text } from '#src/elements';

import gStyles from '#src/styles/gStyles';

export default function DigitalPrescription() {

    return (
        <CenterView>
            <Text
                style={{
                    padding: 20,
                    textAlign: 'justify'
                }}
            >{"\t\t\t\tWith Digital Prescription, doctors can now write prescriptions in a more convenient and modern way. They simply need to scan the patient's QR code using any QR code scanner, and the prescription will be generated digitally. This eliminates the need for traditional paper prescriptions and makes the process faster, reliable & efficient."}</Text>
            <Text style={[gStyles.h2, { marginBottom: 26 }]}>{`Under Development :)`}</Text>
        </CenterView>
    )
}