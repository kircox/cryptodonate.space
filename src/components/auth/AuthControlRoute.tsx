import React, { type ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppStore } from "../../stores/appStore.js";

export interface AuthControlRouteProps {
  children: ReactElement;
  requireAuth: boolean;
}

export const AuthControlRoute = ({
  children,
  requireAuth = true,
}: AuthControlRouteProps): ReactElement => {
  const location = useLocation();
  const { user } = useAppStore((state) => state);

  if (requireAuth && user === undefined) {
    console.log("Пользователь не авторизован, переадрессация на Login");
    return <Navigate to={"/"} state={location} />;
  } else if (!requireAuth && user !== undefined) {
    console.log("Пользователь авторизован, переадрессация на WorkSpace");
    return <Navigate to={"/workspace"} state={location} />;
  }

  return children;
};
