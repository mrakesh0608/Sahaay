import * as React from "react";
import {
    NativeSyntheticEvent,
    StyleSheet,
    TextInput,
    TextInputFocusEventData,
    TextInputProps
} from "react-native";

interface State {
    isFocused: boolean;
}

const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";




class MyTextInput extends React.Component<TextInputProps, State> {
    state = {
        isFocused: false
    };

    handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        this.setState({ isFocused: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };

    handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        this.setState({ isFocused: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };

    render() {
        const { isFocused } = this.state;
        const { onFocus, onBlur, style, ...otherProps } = this.props;
        return (
            <TextInput
                selectionColor={BLUE}
                underlineColorAndroid={isFocused ? BLUE : LIGHT_GRAY}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                style={[styles.textInput, this.props.style]}
                {...otherProps}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        paddingLeft: 6,
        // padding: 60,
        color: 'green',
    }
});

export default MyTextInput;