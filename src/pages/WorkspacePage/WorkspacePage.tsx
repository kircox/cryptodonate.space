/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { useEffect } from "react";

// import { useUpdateProfile } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { Provider, darkTheme, Grid } from "@adobe/react-spectrum";
import { Donations } from "./components/Donations";
import { NextUIProvider } from "@nextui-org/react";
import { useAppStore } from "../../stores/appStore.js";
import { WorkSpaceTabs } from "./components/Tabs/Tabs";
import { WorkspaceHeader } from "./components/Header/WorkspaceHeader";

import { darkThemeNext } from "../../utils/utils";

export default function WorkSpace(): JSX.Element {
  // const [BTCWallet] = useState();
  const { user } = useAppStore((state) => state);
  useEffect(() => {
    console.log(user);
  }, [user]);

  // useEffect(async () => {
  //   await updateProfile(user);
  //   // console.log("update profile");
  //   // console.log(user);
  // }, []);

  if (user !== undefined) {
    return (
      <>
        <Provider theme={darkTheme}>
          <Grid
            areas={{
              base: ["headermini", "content", "toc"],
              S: ["headermini headermini", "content    content", "toc toc"],
              L: ["header header  header", "content    content toc"],
            }}
            columns={{
              base: ["1fr"],
              S: ["1fr", "1fr", "1fr"],
              L: ["1fr", "1fr", "1fr"],
            }}
          >
            <WorkspaceHeader />
            <WorkSpaceTabs />
            <Donations />
            <NextUIProvider theme={darkThemeNext}></NextUIProvider>
          </Grid>
        </Provider>
      </>
    );
  } else {
    return <Navigate to={"/"} />;
  }
}
