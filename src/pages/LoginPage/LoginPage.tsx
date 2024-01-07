import React from "react";
import { NextUIProvider, createTheme } from "@nextui-org/react";
// import { useLocation, useNavigate } from "react-router-dom";
import { AuthForm } from "./components/AuthForm";

const darkThemeNext = createTheme({
  type: "dark",
  theme: {
    colors: {},
  },
});
export function LoginPage(): JSX.Element {
  return (
    <>
      <NextUIProvider theme={darkThemeNext} />
      <AuthForm />
    </>
  );
}
