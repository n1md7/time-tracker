import {useEffect, useState} from "react";
import store, {actionUpdate} from "../services/TokenStore";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {Token} from '../types';

type Auth = {
    email: string;
    password: string;
};
export default function useAuthenticate(): [(payload: Auth) => void, boolean, string, number, boolean] {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [counter, setCounter] = useState<number>(0);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const authenticationHandler = (payload: Auth) => {
        setSubmitted(true);
        httpClient
            .post<AxiosResponse, AxiosResponse<string>>('v1/user/auth', payload)
            .then((response) => {
                if (response.status === 200) {
                    setIsAuth(true);
                    // Dispatch to redux-store to update headers of httpClient
                    store.dispatch(actionUpdate({token: response.data}));
                    // Save in localStorage
                    localStorage.setItem(Token.name, response.data);
                    setError("");
                } else if (response.status === 400) {
                    setError(response.data);
                } else {
                    setError("Incorrect username or password");
                }
            })
            .catch(({message}) => {
                setIsAuth(false);
                setError(message);
            })
            .finally(() => {
                setCounter(counter + 1);
                setSubmitted(false);
            });
    }

    return [authenticationHandler, isAuth, error, counter, submitted];
};