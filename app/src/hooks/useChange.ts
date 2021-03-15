import React, {useState} from 'react';

export default function useInputChange(defaultValue = '') {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return [value, onChange];
}