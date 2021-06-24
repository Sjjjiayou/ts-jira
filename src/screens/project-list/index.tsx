import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce } from "utils/index";
import styled from "@emotion/styled";
import { Typography, Button } from "antd";
import { Row } from "compontents/lib";
import { useProject, useUser } from "utils/project";
import { useDocumentTitlt } from "utils";
import { useProjectsSearchParams } from "./util";

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitlt("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProject(
    useDebounce(param, 200)
  );
  const { data: users } = useUser();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
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
