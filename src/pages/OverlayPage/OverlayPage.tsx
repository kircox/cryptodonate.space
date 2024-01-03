import { useParams } from "react-router-dom";
import React from "react";
import { createTheme, NextUIProvider, Container } from "@nextui-org/react";

import { DonateAlert } from "./components/DonateAlert";
const darkThemeNext = createTheme({
  type: "dark",
  theme: {
    colors: {
      background: "rgba(255, 255, 255, 0)",
    },
  },
});
export function OverlayPage(): JSX.Element {
  const { id } = useParams();

  return (
    <>
      <Container>
        <NextUIProvider theme={darkThemeNext}></NextUIProvider>
        <DonateAlert id={id ?? "user_not_found"} />
      </Container>
    </>
  );
}
