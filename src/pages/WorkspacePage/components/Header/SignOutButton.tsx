/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import React from "react";
import { signOut } from "firebase/auth";
import { Button } from "@nextui-org/react";
import { useAppStore } from "../../../../stores/appStore.js";

export function SignOutButton(): JSX.Element {
  const { auth } = useAppStore((state) => state);
  console.log(auth);

  return (
    <>
      <Button
        css={{
          marginLeft: "$10",
        }}
        flat
        color="error"
        auto
        size={"xs"}
        onPress={() => [signOut(auth), window.location.reload()]}
      >
        Sign Out
      </Button>
    </>
  );
}
