import React from "react";

import { MyBtn, MyBtnProps } from "./MyBtn";
import { ErrorText } from "../Text";

interface optinalProps {
    errTxt: String,
}

export interface SubmitBtnProps extends MyBtnProps, Partial<optinalProps> { }

export function SubmitBtn({
    errTxt, containerStyle, textStyle, ...rest
}: React.PropsWithChildren<SubmitBtnProps>) {
    return (
        <>
            <MyBtn
                ActivityIndicatorColor={'white'}

                containerStyle={[{
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 14,
                    marginVertical: 10,

                    alignSelf: 'center',
                    backgroundColor: '#1e90ff',
                }, containerStyle
                ]}

                textStyle={[{
                    color: 'white',
                    fontWeight: 'bold',
                    letterSpacing: 1.2,
                }, textStyle
                ]}
                {...rest}
            />
            {!rest.isPending && errTxt && <ErrorText>{errTxt}</ErrorText>}
        </>
    );
}