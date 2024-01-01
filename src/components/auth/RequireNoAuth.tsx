import React, { type ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useStore } from "../../store";
import { type RequireAuthProps } from "./types";

// eslint-disable-next-line react/prop-types
export const RequireNoAuth = ({ children }: RequireAuthProps): ReactElement => {
  const location = useLocation();
  const { user } = useStore((state) => state);
  console.log("проверка отсуствия авторизации");
  if (user !== undefined) {
    console.log(user);
    console.log("Пользователь  авторизован, переадрессация на WorkSpace");
    return <Navigate to={"/workspace"} state={location} />;
  }
  return children;
};
