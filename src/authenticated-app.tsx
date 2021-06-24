import React, { useState } from "react";
import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { ProjectScreen } from "screens/project";
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from "compontents/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { ProjectModal } from "screens/project-list/project-modal";
import { resetRoute } from "utils";
import { Navigate, Route, Routes } from "react-router";
import { ProjectPopover } from "compontents/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            type={"link"}
            onClick={() => setProjectModalOpen(true)}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Routes>
          <Route
            path={"/projects"}
            element={
              <ProjectListScreen
                projectButton={
                  <ButtonNoPadding
                    type={"link"}
                    onClick={() => setProjectModalOpen(true)}
                  >
                    创建项目
                  </ButtonNoPadding>
                }
              />
            }
          />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Navigate to={"/projects"} />
        </Routes>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
};

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding
          type={"link"}
          onClick={resetRoute}
          style={{ padding: 0 }}
        >
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;
