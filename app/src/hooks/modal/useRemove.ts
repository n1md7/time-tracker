import {useState} from "react";
import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import {JoyErrorItem} from '../../types';

export default function useRemove(): [(url: string) => void, boolean, string, number, boolean] {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  const removeRequestHandler = async (url: string) => {
    setSubmitted(true);
    await httpClient
      .delete<AxiosResponse, AxiosResponse<string | JoyErrorItem[]>>(url)
      .then((response) => {
        // Accepted
        if (response.status === 202) {
          setIsOk(true);
          setError("");
        } else {
          if (response.data instanceof Array) {
            const joyErrorItem = response.data as JoyErrorItem[];
            const messages = joyErrorItem.map(({message}) => message).join();
            setIsOk(false);
            setError(messages);
          } else {
            setError(response.data as string);
            setIsOk(false);
          }
        }
      })
      .catch(({message}) => {
        setIsOk(false);
        setError(message);
      })
      .finally(() => {
        setSubmitted(false);
        setCounter(counter + 1);
      });
  }

  return [removeRequestHandler, isOk, error, counter, submitted];
};