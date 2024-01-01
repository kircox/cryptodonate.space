import React from "react";
import { View } from "@adobe/react-spectrum";
import { MobileHeader } from "./MobileHeader";
import { DesktopHeader } from "./DesktopHeader";

export function WorkspaceHeader() {
  return (
    <>
      <View
        gridArea="header"
        isHidden={{ base: true, M: true, L: false }}
        margin={"size-100"}
      >
        <DesktopHeader />
      </View>
      <View
        gridArea="headermini"
        isHidden={{ base: false, S: false, L: true }}
        margin={"size-100"}
      >
        <MobileHeader />
      </View>
    </>
  );
}
