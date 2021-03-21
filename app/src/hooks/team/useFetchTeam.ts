import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from "../../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../redux/reducers";
import {updateTeams} from "../../redux/actions";
import {Team} from "../../types";
import {useState} from 'react';

export default function useFetchTeam(): [() => void, Team[], boolean] {
  const dispatch = useDispatch();
  const teams = useSelector<RootReducer, Team[]>(({teams}) => teams.all);
  const [fetching, setFetching] = useState<boolean>(true);

  const fetchTeams = () => {
    httpClient
      .get<AxiosResponse, AxiosResponse<Team[] | string>>('v1/teams')
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateTeams({all: response.data as Team[]}));
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

  return [fetchTeams, teams, fetching];
};