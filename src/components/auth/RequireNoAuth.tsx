import React, { type ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppStore } from "../../stores/appStore.js";
import { type RequireAuthProps } from "./types";

export const RequireNoAuth = ({ children }: RequireAuthProps): ReactElement => {
  const location = useLocation();
  const { user } = useAppStore((state) => state);
  console.log("проверка отсуствия авторизации");
  if (user !== undefined) {
    console.log(user);
    console.log("Пользователь  авторизован, переадрессация на WorkSpace");
    return <Navigate to={"/workspace"} state={location} />;
  }
  return children;
};
