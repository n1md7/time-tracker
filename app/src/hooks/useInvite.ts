import {useState} from "react";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import {JoyErrorItem} from "../types";

export default function useInvite(): [(key: string) => void, boolean, string, boolean, string, number] {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);


  const fetchEmailByInviteKey = (key: string) => {
    httpClient
      .get<AxiosResponse, AxiosResponse<string | JoyErrorItem[]>>(`v1/member/email/${key}`)
      .then((response) => {
        if (response.status === 200) {
          setIsOk(true);
          setEmail(response.data as string);
          setError("");
        } else {
          if (response.data instanceof Array) {
            setError(response.data[0].message)
          } else {
            setError(response.data as string);
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

  return [fetchEmailByInviteKey, isOk, error, submitted, email, counter];
};