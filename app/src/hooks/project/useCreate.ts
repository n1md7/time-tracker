import {useState} from "react";
import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import {JoyErrorItem} from '../../types';

type Project = {
  name: string;
  description: string;
};

export default function useCreate(): [(payload: Project) => void, boolean, string, number, boolean, string[]] {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorFields, setErrorFields] = useState<Array<string>>([]);
  const [counter, setCounter] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const createProjectHandler = async (payload: Project) => {
    setSubmitted(true);
    await httpClient
      .put<AxiosResponse, AxiosResponse<string | JoyErrorItem[]>>('v1/projects/new', payload)
      .then((response) => {
        if (response.status === 201) {
          setIsOk(true);
          setErrorFields([]);
          setError("");
        } else {
          if (response.data instanceof Array) {
            const joyErrorItem = response.data as JoyErrorItem[];
            setErrorFields(joyErrorItem.map(({context: {key}}) => key));
            setIsOk(false);
            setError('');
          } else {
            setError(response.data as string);
            setErrorFields([]);
            setIsOk(false);
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

  return [createProjectHandler, isOk, error, counter, submitted, errorFields];
};