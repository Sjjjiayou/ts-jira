import React from 'react';
import { SearchPanel } from './search-panel';
import { List } from "./list";
import { useDebounce } from 'utils/index';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject, useUser} from 'utils/project';
import { useDocumentTitlt } from "utils";
import { useProjectsSearchParams } from './util';

export const ProjectListScreen = () => {
    useDocumentTitlt("项目列表", false);

    const [param,setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list } = useProject(useDebounce(param, 200))
    const { data: users } = useUser()

    return <Container>
        <h1></h1>
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        {
            error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
        }
        <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
}

ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
padding: 3.2rem
`
