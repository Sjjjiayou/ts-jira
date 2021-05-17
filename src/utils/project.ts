import { useEffect } from 'react';
import { cleanObject } from 'utils/index';
import { Project } from "screens/project-list/list";
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/use-async';
import {User} from 'screens/project-list/search-panel'

export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects', { data: cleanObject(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}

export const useUser = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<User[]>()

    useEffect(() => {
        run(client('users'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])

    return result
}