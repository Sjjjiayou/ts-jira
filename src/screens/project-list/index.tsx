import React from 'react';
import { SearchPanel } from './search-panel';
import { List } from "./list";
import { useDebounce } from 'utils/index';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject, useUser} from 'utils/project';
import { useDocumentTitlt } from "utils";
import { useUrlQueryParam } from 'utils/url';

export const ProjectListScreen = () => {
    const [param, setParam]= useUrlQueryParam(['name', 'personId'])
    console.log("param",param)
    const debouncedParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProject(debouncedParam)
    const { data: users } = useUser()
    useDocumentTitlt("项目列表", false);


    return <Container>
        <h1></h1>
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        {
            error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
        }
        <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
padding: 3.2rem
`
