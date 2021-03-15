import {useEffect, useState} from "react";
import store, {actionUpdate} from "../services/TokenStore";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {useHistory} from 'react-router';
import {Token} from '../types';

export default function useTokenUpdate(): [boolean, boolean, string] {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [tokenExpireInSec, setTokenExpiration] = useState<number>(-1);
    const history = useHistory();

    const updateToken = (): void => {
        httpClient
            .get<AxiosResponse, AxiosResponse<string>>('v1/user/token/refresh')
            .then((response) => {
                store.dispatch(actionUpdate({token: response.data}));
                setIsAuth(true);
                // Currently new session is valid for 20 minutes
                setTokenExpiration(20 * 60);
            })
            .catch(({message}) => {
                setError(message);
                setIsAuth(false);
                setTokenExpiration(-1);
            });
    };

    const checkExpiration = (): void => {
        httpClient
            .get<AxiosResponse>('v1/user/status')
            .then((response) => {
                setIsAuth(Boolean(response.status === 200));
                setTokenExpiration(Number(response.data));
            })
            .catch(({message}) => setError(message));
    };

    useEffect(() => {
        const token = localStorage.getItem(Token.name);
        // No token = no authenticated
        if (!token) {
            return history.push('/sign-in');
        }
        // Update httpClient header with Token
        store.dispatch(actionUpdate({token}));
        // Send request and check whether or not the token is still valid
        httpClient
            .get<AxiosResponse, AxiosResponse<string>>('v1/user/status')
            .then((response) => {
                if (response.status !== 200) {
                    // Not valid
                    throw new Error(response.data);
                }
                setIsAuth(true);
                setTokenExpiration(Number(response.data));
            })
            .catch(({message}) => setError(message))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        // Check expiration every minute
        const timer = setInterval(checkExpiration, 60 * 100);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Expires in less then 2 minutes
        // Sending request to get new token
        if (tokenExpireInSec <= 120 && tokenExpireInSec >= 0) {
            updateToken();
        }
    }, [tokenExpireInSec]);

    return [isAuth, loading, error];
};