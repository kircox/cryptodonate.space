import React from "react";
import { signOut } from "firebase/auth";
import { Button } from "@nextui-org/react";
import { useStore } from "../../../../stores/appStore.js";

export function SignOutButton() {
  const { auth } = useStore((state) => state);
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
        variant="cta"
        onPress={() => [signOut(auth), window.location.reload(false)]}
      >
        Sign Out
      </Button>
    </>
  );
}
