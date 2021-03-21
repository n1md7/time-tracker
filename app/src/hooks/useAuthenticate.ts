import {useState} from "react";
import store, {actionUpdate} from "../services/TokenStore";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {JoyErrorItem, Token} from '../types';

type Auth = {
  email: string;
  password: string;
};

export default function useAuthenticate(): [(payload: Auth) => void, boolean, string, number, boolean, string[]] {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorFields, setErrorFields] = useState<Array<string>>([]);
  const [counter, setCounter] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const authenticationHandler = (payload: Auth) => {
    setSubmitted(true);
    httpClient
      .post<AxiosResponse, AxiosResponse<string | JoyErrorItem[]>>('v1/user/auth', payload)
      .then((response) => {
        if (response.status === 200) {
          const token = response.data as string;
          setIsAuth(true);
          // Dispatch to redux-store to update headers of httpClient
          store.dispatch(actionUpdate({token}));
          // Save in localStorage
          localStorage.setItem(Token.name, token);
          setError("");
        } else if (response.status === 400) {
          if (response.data instanceof Array) {
            const joyErrorItem = response.data as JoyErrorItem[];
            setErrorFields(joyErrorItem.map(({context: {key}}) => key));
          } else {
            setError(response.data as string);
            setErrorFields([]);
          }
        } else {
          setErrorFields([]);
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

  return [authenticationHandler, isAuth, error, counter, submitted, errorFields];
};