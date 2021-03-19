import React, {useState} from 'react';

export default function useInputChange(defaultValue = ''): [string, (e: React.FormEvent<HTMLInputElement>) => void] {
    const [value, setValue] = useState<string>(defaultValue);

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }

    return [value, onChange];
}