import React from "react";
import { Link } from "react-router-dom";
import {Route, Routes, Navigate} from 'react-router'
import {KanbanScreen} from 'screens/Kanban'
import {EpicScreen} from 'screens/epic'

export const ProjectScreen = () => {
    console.log("win",window)
  return (
    <div>
      <h1>ProjectScreen </h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
          <Route path={'/kanban'} element={<KanbanScreen />} />
          <Route path={'/epic'} element={<EpicScreen />} />
          <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  );
};
