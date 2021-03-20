import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from "../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {RootReducer} from "../redux/reducers";
import {updateProjects} from "../redux/actions";
import {Project} from "../types";

export default function useFetchProjects(): [() => void, Project[]] {
    const dispatch = useDispatch();
    const projects = useSelector<RootReducer, Project[]>(({projects}) => projects.all);

    const fetchProjects = () => {
        httpClient
            .get<AxiosResponse, AxiosResponse<Project[] | string>>('v1/projects')
            .then((response) => {
                if (response.status === 200) {
                    const projects = response.data as Project[];
                    projects.sort().reverse();
                    dispatch(updateProjects({all: projects}));
                } else {
                    Alert(response.data as string, AlertType.ERROR);
                }
            })
            .catch(({message}) => {
                Alert(message, AlertType.ERROR);
            });
    }

    return [fetchProjects, projects];
};