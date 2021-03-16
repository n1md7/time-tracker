import {useState} from "react";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';

type Register = {
    firstName: string;
    lastName: string;
    password: string;
    jobPosition: string;
    personalNumber: string;
    email: string;
    confirmPassword: string;
};
export default function useRegister(): [(payload: Register) => void, boolean, string, number, boolean] {
    const [isOk, setIsOk] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [counter, setCounter] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const registrationHandler = (payload: Register) => {
        setSubmitted(true);
        httpClient
            .post<AxiosResponse, AxiosResponse<string>>('v1/user/new', payload)
            .then((response) => {
                if (response.status === 201) {
                    setIsOk(true);
                    setError("");
                } else {
                    setError(response.data);
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

    return [registrationHandler, isOk, error, counter, submitted];
};