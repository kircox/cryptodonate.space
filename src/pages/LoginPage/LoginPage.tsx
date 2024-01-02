import React from "react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
// import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "./components/Login";

const darkThemeNext = createTheme({
  type: "dark",
  theme: {
    colors: {}, // optional
  },
});
export default function LoginPage(): JSX.Element {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const fromPage = location.state?.from?.pathname || "/";

  return (
    <>
      <NextUIProvider theme={darkThemeNext} />
      <LoginForm />
    </>
  );
}
