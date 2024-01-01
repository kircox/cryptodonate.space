import React, { type ReactElement } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useStore } from "../../store";
import { type RequireAuthProps } from "./types";

export const RequireAuth = ({ children }: RequireAuthProps): ReactElement => {
  const location = useLocation();
  // const { auth } = useContext(Context);
  const { user } = useStore((state) => state);
  if (user === undefined) {
    console.log(user);
    console.log("Пользователь не авторизован, переадрессация на Login");
    return <Navigate to={"/"} state={location} />;
  }
  return children;
};
