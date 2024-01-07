import React, { type ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppStore } from "../../stores/appStore.js";
import { type RequireAuthProps } from "./types";

export const RequireAuth = ({ children }: RequireAuthProps): ReactElement => {
  const location = useLocation();
  const { user } = useAppStore((state) => state);
  console.log(user);
  if (user === undefined) {
    console.log(user);
    console.log("Пользователь не авторизован, переадрессация на Login");
    return <Navigate to={"/"} state={location} />;
  }
  return children;
};
