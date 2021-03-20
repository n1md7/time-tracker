import React, {useState} from 'react';

export default function useInputChange(defaultValue = ''): [
    string,
    (e: React.FormEvent<HTMLInputElement>) => void,
    ($defaultValue?: string) => void,
] {
    const [value, setValue] = useState<string>(defaultValue);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    const resetValue = ($defaultValue: string = defaultValue) => {
        setValue($defaultValue);
    }

    return [value, onChange, resetValue];
}