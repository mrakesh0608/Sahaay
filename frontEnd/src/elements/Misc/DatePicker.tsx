import React, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

import { DummyTextInput } from "./DummyTextInput";

export function DatePicker({
    placeholder = 'Date',
    value = '',
    errTxt = '',
    onChange = () => { }
}: {
    placeholder?: string,
    value?: string,
    onChange?: any,
    errTxt?: string
}
) {

    const [val, setVal] = useState('');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const handleChange = (event, selectedDate) => {
        setShow(false);
        setDate(selectedDate);
        setVal(selectedDate.toDateString())
        onChange(selectedDate);
    };

    useEffect(() => {
        if (value) {
            setVal(new Date(value).toDateString());
            setDate(value);
        }
    }, [value])

    return (
        <>
            <DummyTextInput
                onPress={() => setShow(true)}
                placeholder={placeholder}
                value={val}
                errTxt={errTxt}
            />
            {show && (
                <DateTimePicker
                    value={date}
                    onChange={handleChange}
                    maximumDate={new Date()} //today date
                />
            )}
        </>
    );
};