import React from "react";
import { MyBtn, MyBtnProps } from "./MyBtn";

export function TransparentBtn({
    containerStyle, textStyle, ...rest
}: React.PropsWithChildren<MyBtnProps>) {
    return (
        <MyBtn
            containerStyle={[{
                alignSelf: 'center',
                marginVertical: 20
            },
                containerStyle
            ]}

            textStyle={[{
                fontWeight: 'bold',
                letterSpacing: 1
            },
                textStyle
            ]}
            {...rest}
        />
    );
}
