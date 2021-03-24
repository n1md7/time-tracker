import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from "../../components/Alert";
import {Project} from "../../types";
import {useState} from 'react';

type FetchType = {
  name: string;
  description: string;
  projectId: number;
  projects: Project[]
}

export default function useFetchTeamById(): [(id: string) => void, FetchType | null, boolean] {
  const [data, setData] = useState<FetchType | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);

  const fetch = (id: string) => {
    httpClient
      .get<AxiosResponse, AxiosResponse<FetchType | string>>(`v1/team/info/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data as FetchType);
        } else {
          Alert(response.data as string, AlertType.ERROR);
        }
      })
      .catch(({message}) => {
        Alert(message, AlertType.ERROR);
      }).finally(() => {
      setFetching(false);
    });
  }

  return [fetch, data, fetching];
};
