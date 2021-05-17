import React, { useState } from 'react';
import { SearchPanel } from './search-panel';
import { List } from "./list";
import { useDebounce } from 'utils/index';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProject, useUser} from 'utils/project';

export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 200)
    const { isLoading, error, data: list } = useProject(debouncedParam)
    const { data: users } = useUser()


    return <Container>
        <h1>项目列表</h1>
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        {
            error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null
        }
        <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
}

const Container = styled.div`
padding: 3.2rem
`
