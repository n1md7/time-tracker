import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from "../../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../redux/reducers";
import {updateProjects} from "../../redux/actions";
import {Project} from "../../types";
import {useState} from 'react';

export default function useFetchProjects(): [() => void, Project[], boolean] {
  const dispatch = useDispatch();
  const projects = useSelector<RootReducer, Project[]>(({projects}) => projects.all);
  const [fetching, setFetching] = useState<boolean>(true);

  const fetchProjects = () => {
    httpClient
      .get<AxiosResponse, AxiosResponse<Project[] | string>>('v1/projects')
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateProjects({all: response.data as Project[]}));
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

  return [fetchProjects, projects, fetching];
};