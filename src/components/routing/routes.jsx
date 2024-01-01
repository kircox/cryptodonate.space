import { LOGIN_ROUTE, WORKSPACE_ROUTE } from "./utils/consts";
import Login from "./components/Login";
import WorkSpace from "../../pages/WorkspacePage/WorkspacePage";
import React from "react";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: <Login />,
  },
];
export const privateRoutes = [
  {
    path: WORKSPACE_ROUTE,
    Component: <WorkSpace />,
  },
];
