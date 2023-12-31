/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useStore } from "../../../store";
export const RequireAuth = ({ children }) => {
  const location = useLocation();
  // const { auth } = useContext(Context);

  const { auth, user } = useStore((state) => state);

  console.log("проверка авторизации");
  useEffect(() => {
    console.log(user);
  }, [user, auth]);

  if (!user) {
    console.log(user);
    console.log("Пользователь не авторизован, переадрессация на Login");

    return <Navigate to={"/"} state={location} />;
  }

  return children;
};
