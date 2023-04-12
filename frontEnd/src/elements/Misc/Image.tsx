import {
    Image as RNImage,
    ImageProps,
    ActivityIndicator
} from 'react-native'
import React, { useState } from 'react'

import { useThemeContext } from '#src/context/ThemeContext';

export function Image({
    source, style,
    onLoadStart, onLoadEnd,
    ...rest
}: React.PropsWithChildren<ImageProps>) {

    const { colors } = useThemeContext();
    const [isImgLoading, setIsImgLoading] = useState(false);

    return (
        <>
            <RNImage
                source={source}
                style={[style, isImgLoading && { display: 'none' }]}
                onLoadStart={() => !isImgLoading && setIsImgLoading(true)}
                onLoadEnd={() => isImgLoading && setIsImgLoading(false)}

                {...rest}
            />
            {isImgLoading &&
                <ActivityIndicator size='large' color={colors.text} style={style} />
            }
        </>
    )
}

