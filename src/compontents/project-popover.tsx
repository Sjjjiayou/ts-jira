import React from "react";
import { Popover, Typography, List, Divider } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "compontents/lib";
import { useProject } from "utils/project";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding type={"link"} onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
