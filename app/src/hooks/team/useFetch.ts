import {httpClient} from '../../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from "../../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../../redux/reducers";
import {updateTeams} from "../../redux/actions";
import {Team} from "../../types";

export default function useFetch(): [() => void, Team[]] {
    const dispatch = useDispatch();
    const projects = useSelector<RootReducer, Team[]>(({teams}) => teams.all);

    const fetchTeams = () => {
        httpClient
            .get<AxiosResponse, AxiosResponse<Team[] | string>>('v1/teams')
            .then((response) => {
                if (response.status === 200) {
                    const projects = response.data as Team[];
                    projects.sort().reverse();
                    dispatch(updateTeams({all: projects}));
                } else {
                    Alert(response.data as string, AlertType.ERROR);
                }
            })
            .catch(({message}) => {
                Alert(message, AlertType.ERROR);
            });
    }

    return [fetchTeams, projects];
};