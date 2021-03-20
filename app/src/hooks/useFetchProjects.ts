import {useState} from "react";
import {httpClient} from '../services/HttpClient';
import {AxiosResponse} from 'axios';
import Alert, {AlertType} from "../components/Alert";

type Project = {
    name: string;
    description: string;
};

export default function useFetchProjects(): [() => void, Project[]] {
    const [data, setData] = useState<Project[]>([]);

    const fetchProjects = () => {
        httpClient
            .get<AxiosResponse, AxiosResponse<Project[] | string>>('v1/projects')
            .then((response) => {
                if (response.status === 200) {
                    const projects = response.data as Project[];
                    projects.sort().reverse();
                    setData(projects);
                } else {
                    Alert(response.data as string, AlertType.ERROR);
                }
            })
            .catch(({message}) => {
                Alert(message, AlertType.ERROR);
            });
    }

    return [fetchProjects, data];
};