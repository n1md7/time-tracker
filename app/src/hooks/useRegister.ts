import {useState} from "react";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {JoyErrorItem} from './useAuthenticate';

type Register = {
    firstName: string;
    lastName: string;
    password: string;
    jobPosition: string;
    personalNumber: string;
    email: string;
    confirmPassword: string;
};
export default function useRegister(): [(payload: Register) => void, boolean, string, number, boolean, string[]] {
    const [isOk, setIsOk] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [errorFields, setErrorFields] = useState<Array<string>>([]);
    const [counter, setCounter] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const registrationHandler = (payload: Register) => {
        setSubmitted(true);
        httpClient
            .post<AxiosResponse, AxiosResponse<string | JoyErrorItem[]>>('v1/user/new', payload)
            .then((response) => {
                if (response.status === 201) {
                    setIsOk(true);
                    setError("");
                } else {
                    if (response.data instanceof Array) {
                        const joyErrorItem = response.data as JoyErrorItem[];
                        setErrorFields(joyErrorItem.map(({context: {key}}) => key));
                    } else {
                        setError(response.data as string);
                        setErrorFields([]);
                    }
                }
            })
            .catch(({message}) => {
                setIsOk(false);
                setError(message);
            })
            .finally(() => {
                setCounter(counter + 1);
                setSubmitted(false);
            });
    }

    return [registrationHandler, isOk, error, counter, submitted, errorFields];
};