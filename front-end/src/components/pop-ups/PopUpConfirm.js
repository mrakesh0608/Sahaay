import { Text, View } from 'react-native';

import PopUpContainer from '@components/pop-ups/PopUpContainer';

export default function PopUpConfirm({ CallerContent, title, Yes, No }) {
    return (
        <PopUpContainer
            CallerContent={CallerContent}

            PopUpContent={({ hideModel, mStyles, PopUpBtn }) =>
                <>
                    <Text style={mStyles.modalText}>{title}</Text>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-around' }}
                    >
                        <PopUpBtn
                            title={(No?.title) ? No.title : 'No'}
                            style={No?.style}
                            onPress={(e) => {
                                if (typeof No?.onPress === 'function') No.onPress();
                                hideModel()
                            }}
                        />
                        <PopUpBtn
                            title={(Yes?.title) ? Yes.title : 'Yes'}
                            style={Yes?.style}
                            onPress={(e) => {
                                if (typeof Yes?.onPress === 'function') Yes.onPress();
                                hideModel()
                            }}
                        />
                    </View>
                </>
            }
        />
    );
}