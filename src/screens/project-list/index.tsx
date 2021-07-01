import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils/index";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { ButtonNoPadding, Row } from "compontents/lib";
import { useProject, useUser } from "utils/project";
import { useDocumentTitlt } from "utils";
import { useProjectModal, useProjectsSearchParams } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitlt("项目列表", false);
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProject(
    useDebounce(param, 200)
  );
  const { data: users } = useUser();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
