import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useStore } from "../../../store.js";
// eslint-disable-next-line react/prop-types
export const RequireNoAuth = ({ children }) => {
  const location = useLocation();
  // const { auth } = useContext(Context);
  // const [user] = useAuthState(auth);
  const { user } = useStore((state) => state);
  console.log("проверка отсуствия авторизации");
  if (user) {
    console.log(user);
    console.log("Пользователь  авторизован, переадрессация на WorkSpace");
    return <Navigate to={"/workspace"} state={location} />;
  }
  return children;
};
