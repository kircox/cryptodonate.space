/* eslint-disable camelcase */
import React, { useState, useEffect } from "react";

import { useUpdateProfile } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { Provider, darkTheme, Grid } from "@adobe/react-spectrum";
import { Donations } from "./components/Donations";
import { NextUIProvider } from "@nextui-org/react";
import { useStore } from "../../store";
import { WorkSpaceTabs } from "./components/Tabs/WorkspaceTabs";
import { WorkspaceHeader } from "./components/WorkspaceHeader/WorkspaceHeader";

import { darkThemeNext } from "../../utils/utils";

export default function WorkSpace() {
  const [BTCWallet] = useState();
  const { auth, user, tickets_value } = useStore((state) => state);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const [updateProfile] = useUpdateProfile(auth);

  useEffect(async () => {
    await updateProfile({});
    // console.log("update profile");
    // console.log(user);
  }, []);

  const [setValid] = useState(false);
  useEffect(() => {
    if (BTCWallet === "") {
      setValid(true);
    }
  }, []);

  if (user) {
    if (tickets_value) {
      // tickets_value.docs.map((doc) => console.log(doc.data()));
    }

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
