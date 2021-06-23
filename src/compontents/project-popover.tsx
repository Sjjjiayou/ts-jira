import React from 'react'
import {Popover, Typography, List, Divider, Button} from "antd"
import {ButtonNoPadding} from "compontents/lib"
import styled from "@emotion/styled";
import { useProject } from 'utils/project'

export const ProjectPopover = (props: {setProjectModalOpen:(isOpen: boolean) => void}) => {
    const {data: projects, isLoading} = useProject()
    const pinnedProjects = projects?.filter(project => project.pin)
    const content = <ContentContainer>
        <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name} />
                </List.Item>)
            }
        </List>
        <Divider />
        <ButtonNoPadding type={"link"} onClick={() => props.setProjectModalOpen(true)} >创建项目</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}>
        <span>项目</span>
    </Popover>
}

const ContentContainer = styled.div`
min-width: 30rem
`